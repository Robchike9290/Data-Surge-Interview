# Data Surge Interview

A full-stack "Hello, world" application for the **Data Surge Interview** exercise, built with a React/TypeScript frontend and a TypeScript/Node.js backend using Express.

## Project Structure

```
hello-world-app/
├── backend/          # TypeScript/Node.js backend using Express
│   ├── src/
│   │   └── index.ts  # Express server
│   ├── data.txt      # Sample data file
│   ├── package.json
│   └── tsconfig.json
└── frontend/        # React + TypeScript frontend using Vite
    └── src/
        ├── App.tsx
        └── main.tsx
```

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the backend in development mode:
   ```bash
   npm run dev
   ```
   
   Or build and run in production mode:
   ```bash
   npm run build
   npm start
   ```

The backend will start on `http://localhost:8080` and expose the `/api/hello` endpoint.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000` and automatically proxy API requests to the backend.

## How It Works

1. The backend uses Express to handle HTTP requests and reads "Hello, world" from `backend/data.txt`
2. The `/api/hello` endpoint returns this message as JSON: `{"message": "Hello, world"}`
3. The React frontend makes a GET request to this endpoint on component mount
4. The message is displayed in the browser

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

The production build will be in the `backend/dist` directory.

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

