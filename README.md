# Notes App

A full-stack Notes web application built with Next.js, MongoDB, and custom authentication. Features a clean, responsive interface with dark mode support.

## Features

- 🔐 **Custom Authentication** - Email/password signup and login with JWT tokens
- 📝 **CRUD Operations** - Create, read, update, and delete notes
- 🔒 **Secure** - HTTP-only cookies, password hashing with bcrypt
- 📱 **Responsive** - Mobile-friendly design with Tailwind CSS
- 🌙 **Dark Mode** - Toggle between light and dark themes
- ⚡ **Fast** - Server-side rendering and optimized MongoDB connections

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Authentication**: Custom JWT-based auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Vercel

### 1. Prepare your MongoDB Atlas database

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string

### 2. Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string (use a password generator)

3. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be available at `https://your-app.vercel.app`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create new note
- `GET /api/notes/[id]` - Get specific note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   └── notes/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── notes/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Header.tsx
│   ├── NoteList.tsx
│   └── NoteEditor.tsx
├── lib/
│   ├── dbConnect.ts
│   └── auth.ts
├── models/
│   ├── User.ts
│   └── Note.ts
└── package.json
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication with HTTP-only cookies
- **Input Validation**: Server-side validation for all inputs
- **User Isolation**: Users can only access their own notes
- **CSRF Protection**: SameSite cookie settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
