# Todo Project

A full-stack todo application built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time updates

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd todo.project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

## Production Build

```bash
npm run build
npm start
```

## Deployment

This project is ready for deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
todo.project/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── dist/ (after build)
├── package.json
├── render.yaml
└── DEPLOYMENT.md
```