<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

# Fitness Workout Backend

A robust backend API for managing users, workouts, subscriptions, and videos for a fitness platform. Built with NestJS, Prisma, and PostgreSQL, this project provides secure authentication, role-based access, and scalable data management.

## Features

- User registration, login, and role assignment (Admin/User)
- JWT authentication and role-based authorization
- CRUD operations for products, videos, and subscriptions
- Dashboard endpoints for user and video management
- Subscription revenue tracking
- Prisma ORM for database access
- E2E and unit testing with Jest

## Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL
- Jest (testing)
- ESLint (linting)

## Project Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- PostgreSQL database

### Installation
```bash
git clone https://github.com/sazed1237/fitness-workout-backend.git
cd fitness-workout-backend
npm install
```

### Environment Setup
- Copy `.env.example` to `.env` and update database credentials and JWT secrets.
- Update `prisma/schema.prisma` with your database connection string.

### Database Migration
```bash
npx prisma migrate dev
```

### Running the Project
```bash
# development
npm run start
# watch mode
npm run start:dev
# production mode
npm run start:prod
```

### Testing
```bash
npm run test        # unit tests
npm run test:e2e    # e2e tests
npm run test:cov    # test coverage
```

## API Endpoints

### Auth Endpoints (`/auth`)
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT
- `POST /auth/forgot-password` — Request password reset
- `POST /auth/verify-otp` — Verify OTP for password reset
- `POST /auth/reset-password` — Reset password
- `GET /auth/me` — Get current user (JWT required)
- `PATCH /auth/role` — Assign role (JWT required)

### Products Endpoints (`/products`)
- `POST /products` — Create product (Admin only)
- `PATCH /products/:id` — Update product (Admin only)
- `DELETE /products/:id` — Delete product (Admin only)
- `GET /products` — Get all products (with filters)

### Subscriptions Endpoints (`/subscriptions`)
- `POST /subscriptions/assign` — Assign subscription (Admin only, JWT required)

### Videos Endpoints (`/videos`)
- `POST /videos` — Upload video (Admin only, JWT required)
- `GET /videos` — Get all videos (JWT required)

### Dashboard Endpoints (`/dashboard`)
- `GET /dashboard/users` — Get paginated users (Admin only)
- `GET /dashboard/videos` — Get paginated videos (Admin only)
- `GET /dashboard/revenue` — Get total revenue from active subscriptions (Admin only)
- `DELETE /dashboard/users/:id` — Delete a user by ID (Admin only)

### App Endpoint
- `GET /` — Health check or welcome message

## Project Structure

```
src/
  auth/           # Authentication and user management
  common/         # Guards, decorators, utilities
  dashboard/      # Admin dashboard endpoints
  products/       # Product management
  subscriptions/  # Subscription management
  videos/         # Video management
  prisma/         # Prisma service and schema
test/             # E2E and unit tests
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
