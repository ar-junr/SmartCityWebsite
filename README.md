# Smart City Thiruvananthapuram - Web Portal

A comprehensive web portal for Smart City Thiruvananthapuram (SCTL) featuring a modern React frontend and Django REST API backend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Backend Structure](#backend-structure)
- [Frontend Structure](#frontend-structure)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

This project is a full-stack web application for Smart City Thiruvananthapuram, providing:
- Public-facing website with information about projects, tenders, events, and more
- Administrative panel for content management
- RESTful API for data access
- AI-powered chatbot for user assistance

## 📁 Project Structure

```
Smart-City/
├── backend/                 # Django REST API Backend
│   ├── api/                # Main API application
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views and viewsets
│   │   ├── serializers.py  # DRF serializers
│   │   ├── admin.py        # Admin configurations
│   │   └── urls.py         # API URL routing
│   ├── backend/            # Django project configuration
│   │   ├── settings.py     # Django settings
│   │   ├── urls.py         # Root URL configuration
│   │   ├── wsgi.py         # WSGI configuration
│   │   └── asgi.py         # ASGI configuration
│   ├── common/             # Common utilities app
│   ├── templates/          # Django templates (admin customization)
│   ├── media/              # User-uploaded media files
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
│
├── frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   │   └── api.js      # API endpoint configuration
│   │   ├── assets/         # Static assets
│   │   ├── locales/        # i18n translation files
│   │   └── App.jsx         # Main App component
│   ├── public/             # Public static files
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

## ✨ Features

### Public Features
- **Home Page**: Overview of Smart City initiatives
- **Projects**: Ongoing and completed projects with details
- **Tenders**: Open and closed tenders with submission deadlines
- **Events**: News, announcements, and event listings
- **Gallery**: Photo and video galleries
- **Downloads**: Government orders, documents, and reports
- **Careers**: Job openings and internship opportunities
- **Contact**: Contact forms and complaint registration
- **Search**: Full-text search across all content
- **Chatbot**: AI-powered assistant for user queries

### Admin Features
- **Content Management**: CRUD operations for all content types
- **Media Management**: Upload and organize images, PDFs, and videos
- **User Management**: Admin user accounts and permissions
- **Analytics**: Visitor tracking and statistics
- **Custom UI**: Beautiful, modern admin interface

## 🛠 Technology Stack

### Backend
- **Django 4.2+**: Web framework
- **Django REST Framework**: API development
- **MySQL/SQLite**: Database
- **Pillow**: Image processing
- **django-cors-headers**: CORS handling
- **django-simple-history**: Model history tracking
- **django-filter**: Advanced filtering

### Frontend
- **React 18+**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **i18next**: Internationalization
- **Lucide React**: Icon library

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+**
- **Node.js 18+** and npm/yarn
- **MySQL 8.0+** (optional, SQLite works for development)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Smart-City
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
# For SQLite (default):
# DB_ENGINE=django.db.backends.sqlite3
# DB_NAME=db.sqlite3

# For MySQL:
# DB_ENGINE=django.db.backends.mysql
# DB_NAME=smartcity_db
# DB_USER=root
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=3306

# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
echo "VITE_API_BASE_URL=http://127.0.0.1:8000" > .env
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/.env` file:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite - default)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# Database (MySQL - alternative)
# DB_ENGINE=django.db.backends.mysql
# DB_NAME=smartcity_db
# DB_USER=root
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=3306

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Time Zone
TIME_ZONE=Asia/Kolkata
```

### Frontend Configuration

The frontend uses a centralized API configuration in `frontend/src/config/api.js`. 

To change the API base URL:
1. Create `frontend/.env` file:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

2. Or modify `frontend/src/config/api.js` directly.

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```
Backend will run on `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **API Root**: http://127.0.0.1:8000/api/

## 🏗 Backend Structure

### Why `backend/backend/` folder?

When you run `django-admin startproject backend`, Django creates:
- A folder named `backend/` (the project root)
- Inside it, another `backend/` folder containing project settings

This is standard Django structure:
- `backend/backend/` = Project configuration (settings, URLs, WSGI)
- `backend/api/` = Application code (models, views, serializers)
- `backend/common/` = Shared utilities

### API Endpoints

All API endpoints are prefixed with `/api/`:

- `/api/navigation/` - Navigation items
- `/api/pages/` - Dynamic page content
- `/api/careers/` - Career listings
- `/api/tenders/` - Tender listings
- `/api/news/` - News articles
- `/api/events/` - Event listings
- `/api/projects/` - Project information
- `/api/board-members/` - Board of directors
- `/api/ceos/` - CEO succession list
- `/api/staff/` - Staff directory
- `/api/search/` - Search functionality
- `/api/chat/` - Chatbot endpoint

See `backend/api/urls.py` for complete list.

## 🎨 Frontend Structure

### Component Organization

```
src/
├── components/          # Reusable components
│   ├── layout/        # Layout components (Header, Navbar, Footer)
│   └── ...
├── pages/             # Page components
│   ├── Home/         # Home page
│   ├── Project/      # Project pages
│   ├── Tenders/      # Tender pages
│   └── ...
├── config/           # Configuration
│   └── api.js        # API endpoints configuration
└── assets/           # Static assets
```

### Using API Configuration

Import and use the centralized API config:

```javascript
import API_CONFIG from '../config/api';

// Get full URL
const url = API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.CAREERS);

// Or use directly
axios.get(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.NEWS))
```

## 📚 API Documentation

### Authentication

Currently, the API uses no authentication (public access). For production, implement:
- JWT tokens
- API keys
- Session authentication

### Response Format

All API responses follow REST conventions:

```json
{
  "id": 1,
  "title": "Example",
  "date": "2024-01-01",
  ...
}
```

### Pagination

List endpoints support pagination:
- `?page=1` - Page number
- `?page_size=20` - Items per page

## 🔐 Admin Panel

### Accessing Admin

1. Navigate to http://127.0.0.1:8000/admin/
2. Login with superuser credentials
3. Manage all content types

### Admin Features

- **Modern UI**: Custom-styled admin interface
- **Organized Models**: Grouped by functionality
- **Media Management**: Easy file uploads
- **History Tracking**: View model change history
- **Bulk Actions**: Perform actions on multiple items

### Creating Admin User

```bash
cd backend
python manage.py createsuperuser
```

## 💻 Development Guidelines

### Backend

1. **Models**: Define in `api/models.py`
2. **Serializers**: Create in `api/serializers.py`
3. **Views**: Use ViewSets in `api/views.py`
4. **URLs**: Register in `api/urls.py`
5. **Admin**: Configure in `api/admin.py`

### Frontend

1. **Components**: Create reusable components in `components/`
2. **Pages**: Add new pages in `pages/`
3. **API Calls**: Use `API_CONFIG` from `config/api.js`
4. **Styling**: Use Tailwind CSS classes
5. **Routing**: Add routes in `App.jsx`

### Code Style

- **Python**: Follow PEP 8
- **JavaScript**: Use ESLint rules
- **Comments**: Document complex logic
- **Commits**: Use descriptive commit messages

## 🚢 Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Configure proper `ALLOWED_HOSTS`
3. Use production database (PostgreSQL recommended)
4. Set up static file serving (Nginx/Apache)
5. Use environment variables for secrets
6. Enable HTTPS

### Frontend Deployment

1. Build production bundle:
```bash
cd frontend
npm run build
```

2. Serve `dist/` folder with web server (Nginx/Apache)

3. Configure API base URL for production

### Environment Variables

**Backend (.env):**
```env
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=yourdomain.com
DB_ENGINE=django.db.backends.postgresql
DB_NAME=smartcity_prod
DB_USER=db_user
DB_PASSWORD=secure_password
```

**Frontend (.env.production):**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Check database credentials in `.env`
- Ensure database server is running
- Verify database exists

**Migration Errors:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Static Files Not Loading:**
```bash
python manage.py collectstatic
```

### Frontend Issues

**API Connection Error:**
- Verify backend is running
- Check CORS settings in backend
- Verify API base URL in `config/api.js`

**Build Errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Common Issues

1. **Port Already in Use**: Change port in settings
2. **CORS Errors**: Add frontend URL to `CORS_ALLOWED_ORIGINS`
3. **Media Files 404**: Check `MEDIA_ROOT` and `MEDIA_URL` settings

## 📝 License

[Your License Here]

## 👥 Contributors

[Contributor List]

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Contact: [Your Contact Information]

---

**Built with ❤️ for Smart City Thiruvananthapuram**
