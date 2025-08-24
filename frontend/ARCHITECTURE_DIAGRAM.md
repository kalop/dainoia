# DreamsChat Frontend Architecture

## 🏗️ Architecture Overview

This is a **React-based chat application template** built with modern web technologies. The application follows a **feature-based modular architecture** with separate user and admin interfaces.

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DREAMSCHAT FRONTEND                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐  │
│  │   ENTRY POINT   │    │   ROUTING       │    │     STATE MANAGEMENT    │  │
│  │                 │    │                 │    │                         │  │
│  │  main.tsx       │───▶│  router.tsx     │───▶│  Redux Store           │  │
│  │  (React 19)     │    │  (React Router) │    │  (commonSlice)         │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘  │
│           │                       │                           │              │
│           ▼                       ▼                           ▼              │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           FEATURE MODULES                              │  │
│  │                                                                         │  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐  │
│  │   USER FEATURE  │    │  ADMIN FEATURE  │    │     AUTH FEATURE        │  │
│  │                 │    │                 │    │                         │  │
│  │  feature.tsx    │    │ adminFeature.tsx│    │  authFeature.tsx        │  │
│  │  + Sidebar      │    │ + AdminHeader   │    │  + Signin/Signup        │  │
│  │  + ChatSidebar  │    │ + AdminSidebar  │    │  + Forgot Password      │  │
│  │  + Modals       │    │ + ThemeSettings │    │  + OTP                  │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘  │
│           │                       │                           │              │
│           ▼                       ▼                           ▼              │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           PAGE COMPONENTS                              │  │
│  │                                                                         │  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐  │
│  │   USER PAGES    │    │  ADMIN PAGES    │    │     UI COMPONENTS       │  │
│  │                 │    │                 │    │                         │  │
│  │ • Chat          │    │ • Dashboard     │    │ • Base UI              │  │
│  │ • Group Chat    │    │ • Users         │    │ • Advanced UI          │  │
│  │ • Status        │    │ • Settings      │    │ • Forms                │  │
│  │ • Calls         │    │ • Reports       │    │ • Charts               │  │
│  │ • Profile       │    │ • Analytics     │    │ • Tables               │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           CORE MODULES                                 │  │
│  │                                                                         │  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐  │
│  │   COMMON        │    │     HOOKS       │    │       MODALS            │  │
│  │                 │    │                 │    │                         │  │
│  │ • Sidebar       │    │ • video-modal   │    │ • Common Modals        │  │
│  │ • ChatSidebar   │    │ • Custom hooks  │    │ • Add Contact          │  │
│  │ • Navigation    │    │                 │    │ • Add Group            │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                           ASSETS & STYLING                             │  │
│  │                                                                         │  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐  │
│  │     IMAGES      │    │     ICONS       │    │       STYLES            │  │
│  │                 │    │                 │    │                         │  │
│  │ • Profiles      │    │ • FontAwesome   │    │ • SCSS/Sass            │  │
│  │ • Media         │    │ • Feather       │    │ • Bootstrap 5          │  │
│  │ • Backgrounds   │    │ • Ionic         │    │ • Custom Themes        │  │
│  │ • Flags         │    │ • Tabler        │    │ • Dark Mode            │  │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### **Core Technologies**
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 7.0.6** - Fast build tool and dev server
- **React Router 6.30.1** - Client-side routing

### **State Management**
- **Redux Toolkit 2.8.2** - Modern Redux with simplified API
- **React Redux 9.2.0** - React bindings for Redux

### **UI Libraries**
- **Bootstrap 5.3.7** - CSS framework
- **React Bootstrap 2.10.10** - Bootstrap components for React
- **Ant Design 5.26.7** - Enterprise UI library
- **PrimeReact 10.9.6** - Rich UI components

### **Styling**
- **Sass 1.89.2** - CSS preprocessor
- **SCSS** - Advanced CSS with variables and mixins
- **Custom themes** - Dark/Light mode support

### **Icons & Graphics**
- **FontAwesome 6.7.2** - Icon library
- **Feather Icons** - Simple, beautiful icons
- **Ionic Icons** - Mobile-first icon set
- **Tabler Icons** - Modern icon set

### **Charts & Data Visualization**
- **Chart.js 4.5.0** - Flexible charting library
- **React ApexCharts 1.7.0** - React wrapper for ApexCharts
- **React CountUp 6.5.3** - Animated number counters

### **Forms & Input**
- **React Select 5.10.2** - Advanced select component
- **React Input Mask 2.0.4** - Input masking
- **React Date Range 2.0.1** - Date range picker
- **React Simple WYSIWYG 3.4.0** - Rich text editor

### **Media & Interactivity**
- **React Player 2.16.1** - Media player
- **Swiper 11.2.10** - Touch slider
- **Yet Another React Lightbox 3.25.0** - Image lightbox
- **Dragula 3.7.3** - Drag and drop

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── environment.tsx          # Environment configuration
│   ├── index.scss              # Global styles
│   │
│   ├── core/                   # Core application modules
│   │   ├── common/             # Shared components
│   │   │   ├── sidebar/        # Sidebar components
│   │   │   └── imageWithBasePath/
│   │   ├── data/               # Data management
│   │   │   ├── interface/      # TypeScript interfaces
│   │   │   └── redux/          # Redux store and slices
│   │   ├── hooks/              # Custom React hooks
│   │   └── modals/             # Modal components
│   │
│   ├── feature-module/         # Feature-based modules
│   │   ├── router/             # Routing configuration
│   │   ├── auth/               # Authentication pages
│   │   ├── pages/              # User pages (chat, calls, status)
│   │   ├── admin/              # Admin interface
│   │   ├── uiInterface/        # UI component library
│   │   ├── feature.tsx         # User layout wrapper
│   │   ├── adminFeature.tsx    # Admin layout wrapper
│   │   └── authFeature.tsx     # Auth layout wrapper
│   │
│   └── assets/                 # Static assets
│       ├── img/                # Images and media
│       └── style/              # Stylesheets and themes
│
├── public/                     # Public assets
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔄 Application Flow

### **1. Application Bootstrap**
```
main.tsx → Redux Provider → Router → Feature Modules → Pages
```

### **2. Routing Structure**
- **Public Routes** (`/`) - User chat interface
- **Auth Routes** (`/auth/*`) - Authentication pages
- **Admin Routes** (`/admin/*`) - Admin dashboard
- **Admin Auth Routes** (`/admin/auth/*`) - Admin authentication

### **3. State Management**
```typescript
// Redux Store Structure
{
  darkMode: boolean,        // Theme toggle
  mobileSidebar: boolean,   // Mobile navigation
  miniSidebar: boolean,     // Collapsed sidebar
  expandMenu: boolean       // Menu expansion
}
```

### **4. Feature Modules**

#### **User Feature** (`feature.tsx`)
- Main chat interface layout
- Sidebar navigation
- Chat sidebar
- Common modals

#### **Admin Feature** (`adminFeature.tsx`)
- Admin dashboard layout
- Admin header and sidebar
- Theme settings
- Loading states

#### **Auth Feature** (`authFeature.tsx`)
- Authentication pages layout
- Sign in/up forms
- Password recovery

## 🎨 UI/UX Features

### **Responsive Design**
- Mobile-first approach
- Responsive breakpoints
- Touch-friendly interface

### **Theme System**
- Light/Dark mode toggle
- Customizable color schemes
- Dynamic theme switching

### **Component Library**
- **Base UI**: Buttons, cards, alerts, modals
- **Advanced UI**: Charts, drag-drop, text editor
- **Forms**: Inputs, validation, file upload
- **Tables**: Data tables, pagination
- **Icons**: Multiple icon libraries

### **Interactive Features**
- Real-time chat interface
- File upload and sharing
- Video/audio calls
- Status updates
- Group management

## 🚀 Development Workflow

### **Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### **Build Configuration**
- **Base Path**: `/react/template/`
- **Asset Optimization**: Vite handles bundling
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement

## 🔧 Key Features

### **Chat Application**
- One-on-one messaging
- Group chat functionality
- File sharing
- Message status indicators
- Contact management

### **Admin Dashboard**
- User management
- Analytics and reports
- System settings
- Content moderation
- Backup and maintenance

### **Authentication**
- User registration/login
- Password recovery
- OTP verification
- Admin authentication
- Session management

## 📱 Mobile Support
- Responsive design
- Touch gestures
- Mobile-optimized navigation
- Progressive Web App features

This architecture provides a solid foundation for a modern chat application with comprehensive admin capabilities, following React best practices and modern web development standards.
