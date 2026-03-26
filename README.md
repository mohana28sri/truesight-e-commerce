# Zenvique E-Commerce Full-Stack App

Welcome to the full-stack version of Zenvique (formerly TrueSight). We have seamlessly migrated this from a frontend-only application to a full-stack, deploy-ready Express.js + React stack with SQLite.

## Features Added

* **Express.js API Backend**: Fully-featured JSON API endpoints for Products, Auth, Cart, Wishlist, and Orders.
* **SQLite Database**: File-based zero-configuration database that works right out of the box using `better-sqlite3`.
* **JWT Authentication**: Secure user login, signup, and route protection.
* **Full Data Sync**: Cart and wishlist automatically sync between the backend and frontend when logged in. Guest context uses localStorage and merges upon login!
* **Production Build Setup**: Single-command startup `npm start` that serves both the frontend build and the backend API from the same process on port 3001.

## How to Run Locally

### Installation

```bash
npm install
```

### Seeding the Database

Before starting the server, seed the SQLite database with the mock products and reviews:

```bash
npm run seed
```

### Development Mode

To start the Vite frontend and Express backend concurrently (with hot-reloading):

```bash
npm run dev:all
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3001

### Production Build

To test the application exactly as it would run in production:

```bash
# Build the Vite frontend
npm run build 

# Start the Node.js server
npm start
```
Your app will be accessible at http://localhost:3001.

## Environment Variables
The `.env` file should include at least:
```env
JWT_SECRET=your_jwt_secret_key
PORT=3001
NODE_ENV=development
```
