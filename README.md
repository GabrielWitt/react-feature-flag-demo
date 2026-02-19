
# React Feature Flag Demo

A production-grade React + TypeScript + Tailwind application integrated with a PHP backend to demonstrate feature flag orchestration, role-based access control (RBAC), and scalable frontend architecture in a multi-tenant context.

This project models how modern frontend systems are structured in enterprise environments where security, maintainability, and controlled feature rollout are critical.

---

## Executive Summary

This application demonstrates how to:

- Ship UI features safely using backend-controlled feature flags.
- Enforce layered RBAC at route and component levels.
- Decouple frontend logic from backend contracts.
- Maintain scalability through strict typing, centralized state, and test coverage.
- Implement production-level quality gates (lint, typecheck, CI).

It is intentionally structured to resemble real-world SaaS and enterprise web applications.

---

## Architecture Overview

High-Level Flow:

UI Layer (React Components)
→ Custom Hooks
→ Auth + Feature Context
→ Service Layer
→ PHP Backend API
→ Mock Data Source

---

## Core Architectural Principles

### 1. Separation of Concerns

- UI rendering logic lives in `components/`
- Domain pages live in `pages/`
- State orchestration lives in `context/`
- Business behavior abstraction lives in `hooks/`
- Data access lives in `services/`
- Contracts are enforced via strict `types/`

No business logic is buried inside JSX trees.

---

### 2. Feature Flag Orchestration

Feature flags are:

- Fetched from backend at runtime.
- Cached and deduplicated via React Query.
- Evaluated centrally using `useFeature()`.
- Combined with RBAC rules before rendering UI.

Final visibility rule:

UI Visibility = Role Permission + Feature Flag State

---

### 3. Layered Authorization (RBAC + Tenant Scope)

Authorization is enforced at:

1. Route level (navigation guard)
2. View level (conditional rendering)
3. Domain logic level (tenant-scoped data filtering)

Hardcoded checks were removed and replaced with authenticated user claims.

---

### 4. Data Layer Strategy

The application uses a shared query layer:

- Centralized fetching
- Automatic caching
- Request deduplication
- Standardized loading and error states

Duplicate data sources were eliminated to avoid drift and inconsistencies.

---

### 5. Quality and Engineering Standards

This project includes production-grade safeguards:

- Strict TypeScript configuration
- ESLint + Prettier + EditorConfig
- CI workflow enforcing:
  - format check
  - lint
  - typecheck
  - tests
  - build validation
- Hook-level test coverage for critical feature logic

All PRs must pass quality gates before merge.

---

## Tech Stack

Frontend:
- React 19
- TypeScript (strict mode)
- Tailwind CSS
- React Router
- React Query
- Vitest + Testing Library

Backend (mock integration):
- PHP (API simulation)
- JSON-based contracts

Tooling:
- Vite
- GitHub Actions
- ESLint
- Prettier

---

## Security & Access Strategy

- Authentication state persisted and restored on app boot.
- Expired sessions handled gracefully.
- Explicit forbidden and not-found screens.
- Centralized authorization utilities.
- Tenant isolation enforced through authenticated claims.

---

## Accessibility & UX Considerations

- Semantic HTML structure.
- Accessible feedback states.
- Keyboard-friendly interactions.
- Standardized loading, empty, and error states.
- Removal of clickable div anti-patterns.

Accessibility uplift is treated as an architectural responsibility, not a visual afterthought.

---

## Testing Strategy

Covered areas:

- Feature flag evaluation behavior.
- RBAC logic.
- Tenant-scoped authorization rules.

Feature gating and authorization are high-impact branch points in UI behavior and are protected against regressions.

---

## Folder Structure

src/
  components/
    layout/
    ui/
  context/
  hooks/
    __tests__/
  pages/
    admin/
    tenant/
    shared/
  services/
  types/
  utils/
backend/

---

## Demo Accounts

Admin  
Email: admin@gabrodev.com  
Password: admin  

Tenant  
Email: tenant@gabrodev.com  
Password: client  

---

## Why This Project Exists

This project was built as a senior-level frontend architecture reference.

It demonstrates:

- How frontend systems scale.
- How security and UX coexist.
- How to structure code for long-term maintainability.
- How to collaborate cleanly with backend systems.

---

## Author

Gabriel Witt  
Frontend Engineer focused on scalable UI systems, multi-role architecture, and production-grade frontend engineering.

