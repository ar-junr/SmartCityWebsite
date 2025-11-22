from django.http import HttpResponse

def home_view(request):
    html = """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Smart City • Backend</title>
  <style>
    :root { --brand:#184E77; --ink:#0f172a; --muted:#64748b; }
    * { box-sizing:border-box; }
    html, body { height:100%; }
    body {
      margin:0; font:15px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial;
      color:var(--ink); background:#f7fafc;
      display:flex; align-items:center; justify-content:center; padding:24px;
    }
    /* Optional watermark logo: place your logo at /static/smartcity-logo.png */
    .watermark {
      position:fixed; inset:0; display:grid; place-items:center; pointer-events:none;
      opacity:.06; filter:grayscale(100%);
    }
    .wrap {
      width:100%; max-width:560px; background:#fff; border:1px solid #e5e7eb;
      border-radius:14px; padding:24px; box-shadow:0 8px 24px rgba(15,23,42,.06);
    }
    h1 { margin:0 0 .25rem; font-size:1.25rem; }
    .ok { color:#16a34a; font-weight:600; }
    p { margin:.25rem 0 1rem; color:var(--muted); }
    .row { display:flex; gap:10px; flex-wrap:wrap; }
    a.btn {
      display:inline-block; padding:10px 14px; border-radius:10px; text-decoration:none;
      background:var(--brand); color:#fff; font-weight:600;
    }
    a.ghost {
      background:#f1f5f9; color:var(--ink);
    }
    footer { margin-top:14px; color:var(--muted); font-size:.88rem; }
  </style>
</head>
<body>
  <!-- Uncomment to show a faint logo behind the card -->
  <!-- <div class="watermark"><img src="/static/smartcity-logo.png" alt="Smart City" style="max-width:40vw; max-height:40vh;"></div> -->

  <main class="wrap">
    <h1>Backend is running <span class="ok">●</span></h1>
    <p>Welcome to the Smart City backend.</p>

    <div class="row" style="margin-top:8px">
      <a class="btn" href="/admin/">Go to Admin</a>
      <a class="btn ghost" href="/api/">API Index</a>
    </div>

    <footer>Tip: keep this page as a quick health check.</footer>
  </main>
</body>
</html>
"""
    return HttpResponse(html, content_type="text/html; charset=utf-8")
