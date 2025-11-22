# api/views_chat.py
from datetime import datetime
import re
from django.utils import timezone
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import (
    Career, Tender, News, GovernmentOrder, Internship,
    MonthlyProgressReport, EventItem, MediaItem, Document, ContactInfo,
    OngoingProject, CompletedProject, BoardMember, CEO, Staff
)

# ---------------- helpers ----------------
def _fmt_date(dt):
    if not dt:
        return None
    # Works with both date and datetime
    if hasattr(dt, "hour"):
        return timezone.localtime(dt).strftime("%b %d, %Y %I:%M %p")
    return dt.strftime("%b %d, %Y")

def _career_status(c: Career):
    if c.last_date_to_apply:
        tz = timezone.get_current_timezone()
        end = datetime.combine(c.last_date_to_apply, datetime.max.time()).astimezone(tz)
        return "Closed" if timezone.now() > end else "Open"
    return c.status or "Published"

def _detail_url(kind: str, obj_id: int):
    # Adjust for your React routes if different
    mapping = {
        "tender": f"/tenders/{obj_id}/",
        "career": f"/careers/{obj_id}/",
        "news": f"/news/{obj_id}/",
        "event": f"/events/{obj_id}/",
        "media": f"/media-coverage/{obj_id}/",
        "document": f"/downloads/{obj_id}/",
        "mpr": f"/mpr/{obj_id}/",
        "internship": f"/internships/{obj_id}/",
        "project": f"/projects/{obj_id}/",
        "completed_project": f"/projects/completed/{obj_id}/",
        "board_member": f"/about/board/{obj_id}/",
        "ceo": f"/about/ceo/{obj_id}/",
        "staff": f"/about/staff/{obj_id}/",
        "contact": f"/contact/",
    }
    return mapping.get(kind)

def _hit(kind, obj_id, title, snippet=None, **extra):
    data = {
        "kind": kind,
        "id": obj_id,
        "title": (title or "").strip()[:300],
        "snippet": (snippet or "").strip()[:400],
        "url": _detail_url(kind, obj_id),
    }
    data.update(extra)
    return data

def _terms(message: str):
    return [t for t in re.findall(r"[a-zA-Z0-9]+", message.lower()) if t]

def _scope(message: str):
    m = message.lower()
    if any(k in m for k in ["tender", "rfp", "bid", "bids", "eoi", "corrigendum"]): return "tenders"
    if any(k in m for k in ["career", "recruit", "vacancy", "job", "apply"]): return "careers"
    if any(k in m for k in ["intern", "internship"]): return "internships"
    if any(k in m for k in ["news", "press", "update", "latest"]): return "news"
    if any(k in m for k in ["event", "inauguration", "anniversary", "conclave", "akam"]): return "events"
    if any(k in m for k in ["document", "go", "order", "pdf", "download"]): return "documents"
    if any(k in m for k in ["mpr", "progress report", "monthly report"]): return "mpr"
    if any(k in m for k in ["contact", "email", "phone", "address"]): return "contact"
    if any(k in m for k in ["project", "ongoing", "completed", "milestone"]): return "projects"
    if any(k in m for k in ["media coverage", "media"]): return "media"
    if any(k in m for k in ["board", "director"]): return "board"
    if any(k in m for k in ["ceo"]): return "ceo"
    if any(k in m for k in ["staff", "team", "engineer", "technical"]): return "staff"
    return "all"

def _q_any(model, fields, message, limit=10, order_by="-id"):
    q = Q()
    for t in _terms(message):
        for f in fields:
            q |= Q(**{f"{f}__icontains": t})
    try:
        qs = model.objects.filter(q).order_by(order_by)[:limit]
    except Exception:
        qs = model.objects.filter(q)[:limit]
    return qs

# --- generic word filters ---
GENERIC_TENDER_WORDS = {
    "tender","tenders","rfp","bid","bids","eoi","corrigendum",
    "open","closed","latest","this","week","near","upcoming","deadline","deadlines",
}
PROJECT_GENERIC_WORDS = {
    "project","projects","ongoing","completed","status","latest","this","week","month","near","upcoming"
}

def _useful_terms(message: str):
    return [t for t in _terms(message) if t not in GENERIC_TENDER_WORDS]

def _useful_project_terms(message: str):
    return [t for t in _terms(message) if t not in PROJECT_GENERIC_WORDS]

def _contains_any(text: str, words):
    t = text.lower()
    return any(w in t for w in words)

def _has_terms(message: str):
    return bool(_terms(message))

GREETING_WORDS = {"hi","hello","hey","namaste","namaskar","hai","hola","ഹായ്","നമസ്കാരം","നമസ്തേ"}
def _is_greeting(message: str) -> bool:
    m = message.strip().lower()
    return (m in GREETING_WORDS) or any(m.startswith(w + " ") for w in GREETING_WORDS)

def _answer(message, hits):
    if not hits:
        return ("I couldn’t find anything for that. Try asking about **tenders**, **careers**, "
                "**projects**, **news**, **events**, or **documents** (by name, date, or keyword).")

    m = message.lower()
    lines = []

    if any(k in m for k in ["deadline", "last date", "closing", "close", "submit by"]):
        tenders = [h for h in hits if h["kind"] == "tender"]
        careers = [h for h in hits if h["kind"] == "career"]
        if tenders:
            lines.append("**Tender deadlines**")
            for t in tenders[:5]:
                lines.append(f"• {t['title']} — Closes: {t.get('last_date_to_submit','N/A')} (#{t['id']})")
        if careers:
            lines.append("**Career application deadlines**")
            for c in careers[:5]:
                lines.append(f"• {c['title']} — Last date: {c.get('last_date_to_apply','N/A')} [{c.get('career_status','')}] (#{c['id']})")
        lines.append("")

    if not lines:
        lines.append("Here’s what I found:")
        for h in hits[:8]:
            meta = []
            if h.get("status"): meta.append(h["status"])
            if h.get("date"): meta.append(h["date"])
            if h.get("last_date_to_submit"): meta.append(f"closes {h['last_date_to_submit']}")
            if h.get("last_date_to_apply"): meta.append(f"apply by {h['last_date_to_apply']}")
            meta_str = f" — {', '.join(meta)}" if meta else ""
            lines.append(f"• [{h['kind']}] {h['title']}{meta_str}")

    lines.append("\nTap a result below to open details.")
    return "\n".join(lines)
# ---------------- main view ----------------
class ChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        message = (request.data.get("message") or "").strip()
        if not message:
            return Response({"answer": "Ask me about tenders, careers, projects, news, events, or documents.", "sources": []})

        # SIMPLE GREETING → just one line, no sources
        if _is_greeting(message):
            return Response({
                "answer": "Hi! I’m your Smart City Assistant. How can I assist you?",
                "sources": []
            })

        scope = _scope(message)
        hits = []
        # ... (keep the rest of your code unchanged below)



        # TENDERS
        if scope in ("tenders", "all"):
            m = message.lower()
            want_open   = _contains_any(m, ["open", "ongoing", "active"])
            want_closed = _contains_any(m, ["closed", "past", "ended", "expired"])
            want_soon   = _contains_any(m, ["soon", "this week", "near", "upcoming", "deadline", "deadlines"])

            now = timezone.now()
            base_qs = Tender.objects.all()
            if want_open:
                base_qs = base_qs.filter(last_date_to_submit__gte=now)
            elif want_closed:
                base_qs = base_qs.filter(last_date_to_submit__lt=now)

            terms = _useful_terms(message)
            if terms:
                q = Q()
                for t in terms:
                    q |= Q(title__icontains=t)
                qs = base_qs.filter(q).order_by("last_date_to_submit" if (want_open or want_soon) else "-last_date_to_submit")
                if not qs.exists():
                    qs = base_qs.order_by("last_date_to_submit" if (want_open or want_soon) else "-last_date_to_submit")
            else:
                if want_open or want_soon:
                    qs = base_qs.filter(last_date_to_submit__gte=now).order_by("last_date_to_submit")
                    if not qs.exists():
                        qs = Tender.objects.all().order_by("-last_date_to_submit")
                else:
                    qs = Tender.objects.filter(last_date_to_submit__gte=now).order_by("last_date_to_submit")
                    if not qs.exists():
                        qs = Tender.objects.all().order_by("-last_date_to_submit")

            for t in qs[:10]:
                hits.append(_hit("tender", t.id, t.title,
                                 last_date_to_submit=_fmt_date(t.last_date_to_submit),
                                 status=("Closed" if timezone.now() > t.last_date_to_submit else "Open")))

        # CAREERS
        if scope in ("careers", "all"):
            m = message.lower()
            want_open = _contains_any(m, ["open", "apply", "vacancy", "hiring"])
            qs = Career.objects.all()
            if want_open:
                today_end = datetime.combine(timezone.localdate(), datetime.max.time()).astimezone(timezone.get_current_timezone())
                qs = qs.filter(Q(last_date_to_apply__isnull=True) | Q(last_date_to_apply__gte=today_end))

            if _has_terms(message):
                q = Q()
                for t in _terms(message):
                    q |= Q(title__icontains=t) | Q(status__icontains=t) | Q(link__icontains=t)
                kq = qs.filter(q).order_by("-posted_on", "-id")[:10]
                qs = kq if kq.exists() else qs.order_by("-posted_on", "-id")
            else:
                qs = qs.order_by("-posted_on", "-id")

            for c in qs[:10]:
                ch = _hit("career", c.id, c.title,
                          last_date_to_apply=_fmt_date(c.last_date_to_apply),
                          career_status=_career_status(c),
                          posted_on=_fmt_date(c.posted_on))
                # (Optional) include resources if you want:
                # resources = [{"label": r.label, "pdf": (r.pdf.url if r.pdf else None), "link": r.link or None} for r in c.resources.all()[:5]]
                # if resources: ch["resources"] = resources
                hits.append(ch)

        # INTERNSHIPS
        if scope in ("internships", "all"):
            for i in _q_any(Internship, ["post", "title", "status"], message, limit=10):
                hits.append(_hit("internship", i.id, i.post or i.title, snippet=i.title,
                                 status=i.status, date=i.date,
                                 url=(i.external_url or _detail_url("internship", i.id))))

        # NEWS
        if scope in ("news", "all"):
            qs_news = _q_any(News, ["title", "excerpt", "source", "type"], message, limit=8, order_by="-date")
            if not qs_news and _contains_any(message, ["news", "latest", "updates", "press"]):
                qs_news = News.objects.all().order_by("-date")[:8]
            for n in qs_news:
                hits.append(_hit("news", n.id, n.title, snippet=n.excerpt, date=_fmt_date(n.date), source=n.source, link=n.link))

        # EVENTS
        if scope in ("events", "all"):
            qs_events = _q_any(EventItem, ["title", "description"], message, limit=8, order_by="-date")
            if not qs_events and _contains_any(message, ["event", "inauguration", "anniversary", "conclave", "akam"]):
                qs_events = EventItem.objects.all().order_by("-date")[:8]
            for e in qs_events:
                hits.append(_hit("event", e.id, e.title, snippet=e.description, date=_fmt_date(e.date)))

        # MEDIA
        if scope in ("media", "all"):
            for m in _q_any(MediaItem, ["title", "description"], message, limit=6, order_by="-date"):
                hits.append(_hit("media", m.id, m.title, snippet=m.description, date=_fmt_date(m.date)))

        # DOCUMENTS / GOs
        if scope in ("documents", "all"):
            for d in _q_any(Document, ["title"], message, limit=10):
                hits.append(_hit("document", d.id, d.title))
            for g in _q_any(GovernmentOrder, ["title"], message, limit=6, order_by="-date"):
                hits.append(_hit("document", g.id, g.title, date=_fmt_date(g.date)))

        # MPR
        if scope in ("mpr", "all"):
            for mpr in _q_any(MonthlyProgressReport, ["month"], message, limit=12, order_by="-uploaded_at"):
                hits.append(_hit("mpr", mpr.id, f"MPR {mpr.month} {mpr.year}", date=_fmt_date(mpr.uploaded_at)))

        # PROJECTS — robust defaults + keyword filter
        if scope in ("projects", "all"):
            m = message.lower()
            want_ongoing   = _contains_any(m, ["ongoing", "in progress", "current", "active"])
            want_completed = _contains_any(m, ["completed", "finished", "done"])
            terms = _useful_project_terms(message)

            qs_ongoing = OngoingProject.objects.all()
            qs_completed = CompletedProject.objects.all()

            local_hits = []
            if terms:
                q = Q()
                for t in terms:
                    q |= Q(project_id__icontains=t) | Q(project_name__icontains=t)

                if want_completed and not want_ongoing:
                    for cp in qs_completed.filter(q).order_by("-created_at")[:10]:
                        local_hits.append(_hit("completed_project", cp.id, cp.project_name,
                                               snippet=f"Completed on {_fmt_date(cp.created_at)}"))
                elif want_ongoing and not want_completed:
                    for p in qs_ongoing.filter(q).order_by("target_completion")[:10]:
                        local_hits.append(_hit("project", p.id, f"{p.project_id} — {p.project_name}",
                                               snippet=f"Target completion: {_fmt_date(p.target_completion)}"))
                else:
                    for p in qs_ongoing.filter(q).order_by("target_completion")[:6]:
                        local_hits.append(_hit("project", p.id, f"{p.project_id} — {p.project_name}",
                                               snippet=f"Target completion: {_fmt_date(p.target_completion)}"))
                    for cp in qs_completed.filter(q).order_by("-created_at")[:6]:
                        local_hits.append(_hit("completed_project", cp.id, cp.project_name,
                                               snippet=f"Completed on {_fmt_date(cp.created_at)}"))

            if not local_hits:
                if want_completed and not want_ongoing:
                    for cp in qs_completed.order_by("-created_at")[:10]:
                        local_hits.append(_hit("completed_project", cp.id, cp.project_name,
                                               snippet=f"Completed on {_fmt_date(cp.created_at)}"))
                elif want_ongoing and not want_completed:
                    for p in qs_ongoing.order_by("target_completion")[:10]:
                        local_hits.append(_hit("project", p.id, f"{p.project_id} — {p.project_name}",
                                               snippet=f"Target completion: {_fmt_date(p.target_completion)}"))
                else:
                    ongoing_list = list(qs_ongoing.order_by("target_completion")[:8])
                    if ongoing_list:
                        for p in ongoing_list:
                            local_hits.append(_hit("project", p.id, f"{p.project_id} — {p.project_name}",
                                                   snippet=f"Target completion: {_fmt_date(p.target_completion)}"))
                    for cp in qs_completed.order_by("-created_at")[:6 if ongoing_list else 10]:
                        local_hits.append(_hit("completed_project", cp.id, cp.project_name,
                                               snippet=f"Completed on {_fmt_date(cp.created_at)}"))

            hits.extend(local_hits)

        answer = _answer(message, hits)
        return Response({"answer": answer, "sources": hits[:20]})
