from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CareerViewSet, TenderViewSet, GovernmentOrderViewSet, NewsViewSet,
    ConclaveSpeakerViewSet, ConclaveRecordingViewSet, AnniversaryImageViewSet,
    InaugurationImageViewSet, LatestNewsViewSet, ContactMessageViewSet,
    ComplaintViewSet, PollFeedbackCreateView, MonthlyProgressReportViewSet,
    InternshipViewSet, PhotoAlbumViewSet, VideoViewSet,MediaItemViewSet, EventItemViewSet, ContactInfoViewSet, SearchView, BoardMemberViewSet, CEOViewSet, StaffViewSet, DocumentViewSet, OfficialViewSet, OngoingProjectViewSet, CompletedProjectViewSet,NavigationItemViewSet, PageContentViewSet, visitor_count
)
from .views_chat import ChatView
router = DefaultRouter()
router.register(r'careers', CareerViewSet)
router.register(r'tenders', TenderViewSet)
router.register(r'government-orders', GovernmentOrderViewSet)
router.register(r'news', NewsViewSet)
router.register(r'conclave-speakers', ConclaveSpeakerViewSet)
router.register(r'conclave-recordings', ConclaveRecordingViewSet)
router.register(r'anniversary-images', AnniversaryImageViewSet)
router.register(r'inauguration-images', InaugurationImageViewSet)
router.register(r'latest-news', LatestNewsViewSet, basename='latest-news')
router.register(r'contact-messages', ContactMessageViewSet)
router.register(r'complaints', ComplaintViewSet)
router.register(r'mpr', MonthlyProgressReportViewSet, basename='mpr')
router.register(r'internships', InternshipViewSet, basename='internships')
router.register(r'albums', PhotoAlbumViewSet, basename='photo-album')
router.register(r'videos', VideoViewSet)
router.register(r'media', MediaItemViewSet, basename='media')
router.register(r'events', EventItemViewSet, basename='events')
router.register(r'contact', ContactInfoViewSet, basename='contact')
router.register(r'board-members', BoardMemberViewSet)
router.register(r'ceos', CEOViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'officials', OfficialViewSet)
router.register(r'ongoing-projects', OngoingProjectViewSet, basename='ongoing-projects')
router.register(r'completed-projects', CompletedProjectViewSet, basename='completed-projects')
router.register(r'navigation', NavigationItemViewSet)
router.register(r'pages', PageContentViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('api/poll-feedback/', PollFeedbackCreateView.as_view(), name='poll-feedback'),
    path('search/', SearchView.as_view(), name='search'),
    path('visitors/', visitor_count),
    path('chat/', ChatView.as_view(), name='chat'),
]
