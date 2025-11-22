# Backend Structure Guide

## Overview

This document explains the backend folder structure and organization of the Smart City Django project.

## Why `backend/backend/` folder?

When you run `django-admin startproject backend`, Django creates a nested structure:

```
backend/                    # Project root (created by you)
└── backend/               # Project package (created by Django)
    ├── settings.py        # Project settings
    ├── urls.py           # Root URL configuration
    ├── wsgi.py           # WSGI application
    └── asgi.py           # ASGI application
```

This is **standard Django convention**. The outer `backend/` is your project directory, and the inner `backend/` contains the project's Python package.

## Current Structure

```
backend/
├── api/                   # Main application
│   ├── models.py         # Database models
│   ├── views.py          # API views and viewsets
│   ├── views_chat.py     # Chatbot view
│   ├── serializers.py    # DRF serializers
│   ├── admin.py          # Admin configurations
│   ├── urls.py           # API URL routing
│   ├── apps.py            # App configuration
│   └── migrations/       # Database migrations
│
├── backend/              # Django project configuration
│   ├── settings.py       # Django settings
│   ├── urls.py           # Root URL configuration
│   ├── wsgi.py           # WSGI application
│   ├── asgi.py           # ASGI application
│   └── admin_site.py     # Custom admin site (optional)
│
├── common/               # Common utilities app
│   ├── views.py          # Common views
│   └── urls.py           # Common URLs
│
├── templates/            # Django templates
│   └── admin/           # Admin template overrides
│       └── base_site.html
│
├── media/                # User-uploaded files
├── staticfiles/          # Collected static files
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── .gitignore           # Git ignore rules
```

## Key Files Explained

### `manage.py`
Django's command-line utility for administrative tasks.

### `backend/settings.py`
Main Django settings file containing:
- Database configuration
- Installed apps
- Middleware
- Static/media file settings
- CORS configuration
- REST Framework settings

### `backend/urls.py`
Root URL configuration that includes:
- Admin URLs
- API URLs
- Common app URLs
- Media file serving (development)

### `api/models.py`
All database models are defined here:
- Career, Tender, News
- BoardMember, CEO, Staff
- Projects, Events, Media
- Navigation, Pages
- And more...

### `api/views.py`
API viewsets using Django REST Framework:
- ViewSets for CRUD operations
- Custom API views
- Search functionality

### `api/serializers.py`
DRF serializers that convert models to JSON:
- CareerSerializer
- TenderSerializer
- NewsSerializer
- And corresponding serializers for all models

### `api/admin.py`
Django admin configurations:
- ModelAdmin classes
- Inline admins
- Custom admin features

### `api/urls.py`
API endpoint routing using DRF routers:
- Registers all ViewSets
- Custom API endpoints
- Search and chat endpoints

## Application Organization

### `api/` App
The main application containing:
- All business logic
- Database models
- API endpoints
- Admin configurations

### `common/` App
Utility app for:
- Common views
- Shared functionality
- Home page view

## Database Models

Models are organized by functionality:

**Content Models:**
- News, Events, Media
- Projects (Ongoing, Completed)
- Tenders, Careers, Internships

**Organization Models:**
- BoardMember, CEO, Staff
- Official, ContactInfo

**System Models:**
- NavigationItem, PageContent
- Visitor (for analytics)

**Form Models:**
- ContactMessage, Complaint
- PollFeedback

## API Endpoints

All API endpoints are under `/api/`:

- `/api/navigation/` - Navigation items
- `/api/pages/` - Dynamic pages
- `/api/careers/` - Career listings
- `/api/tenders/` - Tender listings
- `/api/news/` - News articles
- `/api/board-members/` - Board members
- `/api/ceos/` - CEO list
- `/api/staff/` - Staff directory
- `/api/search/` - Search endpoint
- `/api/chat/` - Chatbot endpoint

See `api/urls.py` for complete list.

## Admin Panel

The admin panel is customized with:
- Custom styling (see `templates/admin/base_site.html`)
- Organized model groups
- Enhanced UI with colors and styling
- History tracking for models

Access at: `http://127.0.0.1:8000/admin/`

## Environment Configuration

Use `.env` file for configuration:
- Database settings
- Secret key
- Debug mode
- Allowed hosts
- CORS origins

Copy `.env.example` to `.env` and configure.

## Adding New Features

### 1. Add a New Model

```python
# api/models.py
class NewModel(models.Model):
    title = models.CharField(max_length=255)
    # ... fields
    
    def __str__(self):
        return self.title
```

### 2. Create Serializer

```python
# api/serializers.py
class NewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewModel
        fields = '__all__'
```

### 3. Create ViewSet

```python
# api/views.py
class NewModelViewSet(viewsets.ModelViewSet):
    queryset = NewModel.objects.all()
    serializer_class = NewModelSerializer
```

### 4. Register URLs

```python
# api/urls.py
router.register(r'new-models', NewModelViewSet)
```

### 5. Register Admin

```python
# api/admin.py
@admin.register(NewModel)
class NewModelAdmin(admin.ModelAdmin):
    list_display = ['title', ...]
```

### 6. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Best Practices

1. **Models**: Keep related models together
2. **Views**: Use ViewSets for CRUD, APIView for custom logic
3. **Serializers**: Include only necessary fields
4. **Admin**: Customize for better UX
5. **URLs**: Use routers for ViewSets
6. **Settings**: Use environment variables
7. **Migrations**: Review before committing

## Troubleshooting

**Import Errors:**
- Ensure app is in `INSTALLED_APPS`
- Check Python path

**Database Errors:**
- Run migrations: `python manage.py migrate`
- Check database connection in settings

**Admin Not Loading:**
- Check `admin.py` registrations
- Verify model is in `INSTALLED_APPS`

**API Not Working:**
- Check URL routing in `api/urls.py`
- Verify ViewSet is registered
- Check CORS settings

---

For more information, see the main README.md file.

