Elexmart Backend API

Elexmart Backend is a modular Express.js + MongoDB REST API that powers authentication, product management, order processing, and Razorpay-based payments for the Elexmart e-commerce platform.

The system supports:

Local authentication (JWT)

OAuth login (Google & GitHub via Passport)

Razorpay payment integration

Webhook-based payment verification

Order tracking

Newsletter subscription endpoint

Rate limiting and security middleware

Architecture Overview

This backend uses a hybrid authentication approach:

JWT-based authentication for API protection.

Session-based Passport authentication for OAuth providers.

MongoDB for persistent data storage.

Razorpay for payment order creation and verification.

Middleware stack includes:

Helmet (security headers)

Morgan (HTTP logging)

CORS (restricted to frontend origin)

Rate limiting (200 requests / 15 minutes)

body-parser with raw body retention for webhook verification

Tech Stack

Node.js (ES Modules)

Express.js

MongoDB + Mongoose

Passport.js (Google & GitHub OAuth)

JSON Web Tokens (JWT)

Razorpay SDK

bcrypt

express-session

Helmet

Morgan

express-rate-limit

Folder Structure

backend/
│
├── config/
│ ├── passport.js # OAuth strategies
│ └── razorpay.js # Razorpay instance config
│
├── controllers/ # Business logic layer
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── utils/ # JWT utilities and middleware
│
├── server.js # Application entry point
└── .env.example # Environment template

Environment Variables

Create a .env file in backend/:

PORT=8000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

OAUTH_CALLBACK_PATH=/oauth/callback

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

Never commit your .env file.

Authentication System
1. Local Authentication (JWT)

Endpoints:

POST /api/auth/register
POST /api/auth/login

Flow:

Password is hashed using bcrypt (12 rounds).

JWT token is generated using generateToken().

Token must be included in requests as:

Authorization: Bearer <token>

Protected routes use authMiddleware.

2. OAuth Authentication (Google & GitHub)

Endpoints:

GET /api/auth/google
GET /api/auth/github
GET /api/auth/oauth/callback

Flow:

User authenticates via provider.

Passport retrieves profile.

User is created or updated in MongoDB.

JWT is generated.

User is redirected to:

FRONTEND_URL/auth-success?token=<jwt>

OAuth login uses express-session internally.

Products API

Base: /api/products

GET /api/products
GET /api/products/:id

Products are stored in MongoDB.

Orders API

Base: /api/orders

Protected by JWT.

POST /api/orders
GET /api/orders/me

Stores:

user reference

items

amount

currency

status

Order status enum:

created

paid

failed

captured

Payment System (Razorpay)

Your backend contains two payment flows:

Flow A – Checkout Controller

POST /api/checkout/create-order
POST /api/checkout/webhook

Creates Razorpay order

Stores order in MongoDB

Webhook verifies signature using raw request body

Updates order status to "paid"

Flow B – Payment Route

POST /api/payment/order
POST /api/payment/verify
POST /api/payment/webhook

Creates Razorpay order

Verifies payment using HMAC signature

Separate webhook endpoint using RAZORPAY_WEBHOOK_SECRET

Note:
Both systems coexist. In production, it is recommended to consolidate into a single payment flow.

Newsletter API

POST /api/newsletter

Currently logs email.
Designed to be extended to a mail service or dedicated collection.

Security Features

Helmet for secure HTTP headers

CORS restricted to frontend origin

Global rate limiting

JWT verification middleware

bcrypt password hashing

Razorpay signature verification

Raw body verification for webhooks

MongoDB unique email constraint

Health Check

GET /api/health

Returns:

{
ok: true,
time: <timestamp>
}

Running Locally

Install dependencies

npm install

Add .env

Start server

npm run dev
or
node server.js

Server runs on:
http://localhost:8000

Known Architectural Observations

Hybrid authentication system (JWT + session).

Two separate Razorpay flows.

Order creation exists in both checkout and orders controllers.

No centralized error handling middleware.

No request validation layer (Joi/Zod recommended).

Session store is in-memory (not suitable for production scaling).

Production Improvements Recommended

Consolidate payment logic into one flow.

Add centralized error handler.

Add request validation.

Use Redis session store.

Implement refresh token mechanism.

Add logging system (Winston/Pino).

Add API testing (Jest + Supertest).

Dockerize backend.

Add CI/CD pipeline.