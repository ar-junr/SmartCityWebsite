# Smart City Backend - Django REST API

## Quick Start

```bash
# Setup
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Structure

- `api/` - Main application (models, views, serializers)
- `backend/` - Django project configuration
- `common/` - Common utilities
- `templates/` - Admin templates
- `media/` - User uploads

See [STRUCTURE.md](./STRUCTURE.md) for detailed explanation.

## Admin Panel

Access at: http://127.0.0.1:8000/admin/

Features:
- Modern, custom-styled UI
- Organized content management
- Media file handling
- History tracking

## API Endpoints

All endpoints: `/api/`

- Navigation: `/api/navigation/`
- Pages: `/api/pages/`
- Careers: `/api/careers/`
- Tenders: `/api/tenders/`
- News: `/api/news/`
- Board Members: `/api/board-members/`
- CEOs: `/api/ceos/`
- Staff: `/api/staff/`
- Search: `/api/search/`
- Chat: `/api/chat/`

## Configuration

Edit `.env` file for:
- Database settings
- Secret key
- Debug mode
- CORS origins

## Documentation

- [STRUCTURE.md](./STRUCTURE.md) - Detailed structure guide
- Main [README.md](../README.md) - Full project documentation

