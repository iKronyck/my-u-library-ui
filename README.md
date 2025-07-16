# MY U Library UI

A modern library management system built with Next.js 15, featuring role-based access control for librarians and students, with magic link authentication and real-time book management.

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15.3.5** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### State Management & Data Fetching

- **Zustand 5.0.6** - Lightweight state management
- **TanStack React Query 5.83.0** - Server state management and caching
- **Axios 1.10.0** - HTTP client

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Tailwind Merge 3.3.1** - Utility for merging Tailwind classes
- **CLSX 2.1.1** - Conditional className utility

### Authentication & UX

- **Magic Link Authentication** - Passwordless authentication
- **React Hot Toast 2.5.2** - Toast notifications

### Development Tools

- **ESLint 9** - Code linting
- **Turbopack** - Fast bundler for development

## 📁 Project Structure

```
my-u-library-ui/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   └── auth/
│   │   │       └── verify-token/
│   │   ├── auth/              # Authentication pages
│   │   │   └── magic-link/
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── librarian/     # Librarian-specific pages
│   │   │   │   ├── books/     # Book management
│   │   │   │   ├── loans/     # Loan management
│   │   │   │   └── users/     # User management
│   │   │   └── student/       # Student-specific pages
│   │   │       └── books/     # Book browsing
│   │   ├── login/             # Login page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── layouts/           # Layout components
│   │   ├── shared/            # Shared UI components
│   │   └── ui/                # Base UI components
│   ├── hooks/                 # Custom React hooks
│   │   ├── auth/              # Authentication hooks
│   │   ├── books/             # Book-related hooks
│   │   ├── dashboard/         # Dashboard hooks
│   │   ├── loans/             # Loan-related hooks
│   │   └── users/             # User management hooks
│   ├── lib/                   # Utility functions
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── middleware.ts              # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-u-library-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Add your environment variables here
   # Example:
   # NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication

The application uses **Magic Link Authentication** for a seamless login experience:

1. Users enter their email on the login page
2. A magic link is sent to their email
3. Clicking the link authenticates the user automatically
4. Users are redirected to their role-specific dashboard

## 👥 Role-Based Access

### Librarian Dashboard

- **Book Management**: Create, edit, delete, and view books
- **User Management**: Manage student accounts
- **Loan Management**: Track and manage book loans
- **Activity Feed**: Monitor library activity

### Student Dashboard

- **Browse Books**: Search and view available books
- **Borrow Books**: Request book loans
- **View Borrowed Books**: Track current loans
- **Return Books**: Return borrowed books

## 🏗️ Architecture

### State Management

- **Zustand**: Global application state
- **React Query**: Server state and caching
- **Local State**: Component-specific state with React hooks

### API Integration

- **Axios**: HTTP client for API calls
- **Custom Hooks**: Encapsulated API logic
- **Error Handling**: Centralized error management

### Routing

- **Next.js App Router**: File-based routing
- **Middleware**: Authentication and route protection
- **Dynamic Routes**: Dynamic page generation

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: User feedback
- **Modal Dialogs**: Interactive forms
- **Search & Filter**: Advanced book discovery
- **Real-time Updates**: Live data synchronization

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Make sure to set the following environment variables in your production environment:

- `NEXT_PUBLIC_API_URL` - Your API endpoint
- Any other required environment variables
