# Smart City Frontend

This is the frontend application for the Smart City Thiruvananthapuram project, built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Multi-language Support**: English and Malayalam (i18n)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Built with Vite for fast development and production builds
- **Accessibility**: Focus states and semantic HTML

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🛠️ Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

```bash
# Build for production
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── assets/        # Images and static assets
│   ├── locales/       # Translation files
│   ├── data/          # Data utilities
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Public assets
├── package.json       # Dependencies and scripts
└── vite.config.js     # Vite configuration
```

## 🎨 Styling

The project uses Tailwind CSS with custom configuration:
- Primary colors: Blue shades (#184E77, #1E6091)
- Accent color: Yellow (#d9ed92)
- Custom animations and transitions
- Responsive breakpoints

## 🔧 Configuration

- **Vite**: Configured in `vite.config.js` with proxy for API calls
- **Tailwind**: Custom theme in `tailwind.config.js`
- **i18n**: Translation setup in `i18n.js`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run i18n:extract` - Extract translation keys

## 🌐 API Integration

The frontend connects to the Django backend API:
- API base URL: `http://127.0.0.1:8000/api/`
- Media files: `http://127.0.0.1:8000/media/`

Proxy configuration is set up in `vite.config.js` for development.

## 🎯 Key Components

- **Header**: Top navigation with language toggle and contact info
- **Navbar**: Main navigation with dropdown menus
- **Footer**: Footer with social links and quick access
- **HomePage**: Landing page with hero section
- **Chatbot**: AI-powered chatbot integration

## 🔄 Recent Updates

- ✅ Moved frontend files to dedicated `frontend/` folder
- ✅ Enhanced UI with modern gradients and animations
- ✅ Improved responsive design
- ✅ Added smooth transitions and hover effects
- ✅ Enhanced accessibility features

