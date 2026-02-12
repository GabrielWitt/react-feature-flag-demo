# React Feature Flag Demo
A production-minded React + TypeScript + Tailwind application integrated with a PHP API to demonstrate feature flags, role-based access control, and scalable frontend architecture.

## Project Description
This project exists to model a realistic frontend architecture for modern web apps that need controlled feature rollout and role-aware UI behavior without overengineering.

It solves three common product and engineering problems:
- Releasing UI features safely without redeploying frontend code.
- Serving different experiences to different user roles (admin vs tenant/customer).
- Keeping UI code maintainable as pages, states, and business logic grow.

### Architecture Overview
- Frontend: React + TypeScript + Tailwind (Vite)
- Backend: PHP mock API (`/backend`) with JSON responses
- Integration: Vite dev proxy maps `/api/*` to `http://127.0.0.1:8000/backend/*`

Frontend responsibilities:
- Rendering role-specific pages and navigation.
- Managing auth/feature state via React Context.
- Consuming backend endpoints through service-layer abstractions.

Backend responsibilities:
- Returning feature flag data, login response, and user/domain data.
- Simulating production API shapes without a database.

### Feature Flags + RBAC Strategy
- Feature flags are fetched from backend and stored globally in `FeatureFlagContext`.
- `useFeature(featureName)` centralizes feature evaluation logic.
- RBAC is enforced at route level (`RequireRole`) and reinforced in UI rendering.
- Final visibility = **role permission + feature flag state**.

This layered approach reduces accidental exposure of restricted UI and improves predictability in large systems.

## Table of Contents
1. [Demo](#demo)
2. [Features Implemented](#features-implemented)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Reference](#api-reference)
7. [Folder Structure](#folder-structure)
8. [Testing](#testing)
9. [Contribution Guidelines](#contribution-guidelines)
10. [Roadmap](#roadmap)
11. [Author](#author)

## Demo
Add screenshots/GIFs here:

- `docs/screenshots/login.png`
- `docs/screenshots/admin-dashboard.png`
- `docs/screenshots/tenant-home.png`
- `docs/screenshots/reservations.png`
- `docs/gifs/feature-flag-toggle.gif`

Example Markdown:

```md
![Login Screen](docs/screenshots/login.png)
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
```

## Features Implemented
- Authentication flow with role-based routing:
  - Admin experience
  - Tenant/customer experience
- Global app navigation with role-aware menu options.
- Feature flag integration from backend endpoint.
- Tenant module:
  - Home
  - Lease detail
  - Payments history
  - Payment checkout (card/bank validation + success states)
  - Reservations and reservation details
- Admin module:
  - Dashboard
  - Tenants list
  - Tenant detail
- Shared pages:
  - Login
  - About
  - Profile
  - Reservation flows
- Reusable UI and layout primitives:
  - `Button`
  - `MainLayout`
- Error-safe API parsing for user-friendly failure messaging.
- Automated tests for `useFeature` behavior with mocked context.

## Tech Stack
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- React Router
- Vite
- Vitest + Testing Library
- PHP (mock backend APIs)

## Installation
### 1) Clone and install frontend dependencies
```bash
git clone https://github.com/GabrielWitt/react-feature-flag-demo.git
cd react-feature-flag-demo
npm install
```

### 2) Start PHP backend
Requires PHP installed locally.

```bash
npm run dev:backend
```

This starts:
- `http://127.0.0.1:8000`

### 3) Start frontend
In a second terminal:

```bash
npm run dev
```

Frontend runs via Vite (default `http://127.0.0.1:5173` unless changed).

### 4) Run both together
- Terminal A: `npm run dev:backend`
- Terminal B: `npm run dev`

## Usage
### Demo login accounts
- Admin:
  - Email: `admin@gabrodev.com`
  - Password: `admin`
- Tenant:
  - Email: `tenant@gabrodev.com`
  - Password: `client`

### Role behavior
- Admin can access admin pages (`/admin`, `/admin/tenants`, etc.).
- Tenant can access tenant pages (`/tenant`, `/tenant/payments`, etc.).

### Feature flag behavior
- Frontend fetches flags from backend on app start.
- UI sections/components are conditionally rendered using `useFeature`.
- This enables runtime feature control without frontend redeploy.

## API Reference
All endpoints return JSON with CORS/content headers.

### `GET /backend/flags.php`
Returns feature flags.

### `POST /backend/login.php`
Authenticates demo user and returns token + user payload.

Request body:
```json
{
  "email": "admin@gabrodev.com",
  "password": "admin"
}
```

### `GET /backend/users.php`
Returns users and tenant-related dashboard/payment data.

### Frontend API paths (via proxy)
Frontend uses `/api/*` paths, mapped by Vite proxy to `/backend/*`.

## Folder Structure
```text
src/
  components/
    layout/
    ui/
  context/
  hooks/
    __tests__/
  pages/
    admin/
    shared/
    tenant/
  services/
  test/
  types/
  utils/
backend/
```

Why this structure:
- `components/`: reusable visual building blocks.
- `context/`: shared app state (auth, feature flags).
- `hooks/`: behavior abstraction (`useFeature`, `useAuth`).
- `pages/`: route-level features grouped by domain/role.
- `services/`: API/data access separation from UI.
- `types/`: shared contracts for strict typing and safer refactors.
- `utils/`: generic helpers (e.g., response parsing).
- `backend/`: local PHP API simulation for realistic integration workflows.

## Testing
Run tests:

```bash
npm run test:run
```

Watch mode:

```bash
npm run test
```

Current automated coverage includes:
- `useFeature` hook behavior:
  - enabled flag => `true`
  - disabled flag => `false`
  - missing flag => `false`

Why this matters:
- Feature gating is a high-impact branch point in UI behavior.
- Hook-level tests protect against regressions when flags or context evolve.

## Contribution Guidelines
1. Fork the repo.
2. Create a branch: `feature/<short-description>`.
3. Keep changes scoped and typed.
4. Add/update tests for behavior changes.
5. Run:
   - `npm run build`
   - `npm run test:run`
6. Open a PR with:
   - problem statement
   - approach
   - screenshots (if UI changes)
   - risk notes

Engineering standards:
- Prefer reusable components over duplicated markup/styles.
- Keep business logic in hooks/services, not deeply inside JSX.
- Preserve strict TypeScript safety.

## Roadmap
- Persist auth session/token securely.
- Introduce backend validation/error contracts with consistent status codes.
- Replace static PHP arrays with database-backed models.
- Add E2E tests for role/flag flows.
- Add CI pipeline (build + test + lint gates).
- Add observability (error boundaries + logging strategy).

## Author
Gabriel Witt  
GitHub: https://github.com/GabrielWitt
