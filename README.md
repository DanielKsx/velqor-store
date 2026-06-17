# VELQOR

VELQOR is a full stack e-commerce application built as a portfolio project.

The goal of the project was to build a complete online store from scratch, including product browsing, cart management, checkout flow, order processing and secured admin endpoints.

The application was built using React, NestJS, Prisma and MariaDB.

---

## Live Demo:
https://velqor-store.onrender.com

## API:
https://velqor-api-bptu.onrender.com/api/products

## Project Goals

The main goal of this project was to practice building a complete full stack application from scratch and gain hands-on experience with:

* React
* NestJS
* Prisma
* Authentication
* Database design
* API development
* Application security

---

## What can users do?

* Browse products
* View product details
* Choose color and size variants
* Add products to the cart
* Keep the cart between sessions
* Place orders through the checkout page
* View order confirmation after checkout
* Change product quantities in the cart
* Add notes to products before ordering
* Review the full order summary before checkout

---

## Admin API

The project includes protected admin endpoints that allow:

* Logging in as an administrator
* Managing products
* Viewing orders through protected API endpoints
* Updating order status through protected API endpoints


---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router DOM
* Redux Toolkit
* Redux Persist
* SCSS Modules
* Vite

### Backend

* NestJS
* TypeScript
* Prisma ORM
* MariaDB / MySQL
* JWT
* bcrypt
* Helmet
* Throttler
* Cookie Parser
* Class Validator

---

## Security

Security features implemented in the project:

* JWT authentication
* httpOnly cookies
* Password hashing with bcrypt
* DTO validation
* Global ValidationPipe
* Request whitelisting
* Helmet
* Rate limiting
* Prisma transactions
* Backend-side order price calculation
* Product snapshots stored in orders

---

## API Overview

### Public Endpoints

```http
GET /api/products
GET /api/products/:slug/:sku
POST /api/orders
```

### Admin Endpoints

```http
POST /api/auth/admin/login
POST /api/auth/admin/logout

GET /api/admin/orders
GET /api/admin/orders/:id
PATCH /api/admin/orders/:id/status

GET /api/admin/products
GET /api/admin/products/:id
POST /api/admin/products
PATCH /api/admin/products/:id
DELETE /api/admin/products/:id
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/DanielKsx/velqor-store.git
cd velqor-store
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=

FRONTEND_URL=http://localhost:5173

ADMIN_EMAIL=
ADMIN_PASSWORD=

JWT_SECRET=
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run start:dev
```

Backend URL:

```txt
http://localhost:3000
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Build

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
npm run build
```

---

## Project Structure

```txt
velqor-store
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   ├── prisma
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Possible Future Improvements

This project focuses on the core e-commerce flow. Some features that could be added in the future:

* Admin dashboard analytics
* Product images per color variant
* Image uploads
* Inventory management
* Payment integration
* Refresh tokens
* Audit logs
* Monitoring and metrics

---

## About

This project was built as a portfolio project to practice full stack development and learn how a real-world e-commerce application is structured.

It covers frontend and backend development, authentication, database design, API development and application security.
