# React FE Base

A minimal, production-ready starter aligned with your architecture:

- **Base UI**: `NavBar`, `Header`, `Footer`
- **Shared UI**: `Table`, `Form` (extensible)
- **Context**: `AppContext` for auth token or global state
- **API Layer**: `HttpClient` (Axios wrapper), `UserApi`, `SubjectApi`
- **Routing**: React Router v6
- **Tailwind**: Utility-first styling

## Quickstart

```bash
# 1) Extract and enter the folder
cp .env.example .env   # edit API base URL if needed

# 2) Install deps
npm i

# 3) Start dev server
npm run dev
```

Adjust environment variables in `.env`. The Users page expects a backend route:
`GET /users?page=<n>&pageSize=<n>` -> `{ data: User[], page, pageSize, total }`.

## Structure

```
src/
  api/
    http/HttpClient.ts     # axios wrapper (auth-ready)
    resources/UserApi.ts
    resources/SubjectApi.ts
    index.ts               # useApi() factory
  components/
    base/{NavBar,Header,Footer}.tsx
    shared/{Table,Form}.tsx
  config/env.ts
  context/AppContext.tsx
  layouts/BaseLayout.tsx
  pages/{Home,About}.tsx
  pages/users/UsersPage.tsx
  App.tsx
  main.tsx
  index.css                # tailwind entry
```

## Notes

- Add more resource APIs the same way as `UserApi`.
- If you use refresh tokens, add a 401 handler in `HttpClient` response interceptor.
- Feel free to replace `AppContext` with a more advanced state manager later.


## Auth & Roles

- Roles supported: `admin`, `mentor`, `mentee`.
- State stored in `AuthContext` and persisted to `localStorage`.
- Route guards:
  - `RequireAuth` protects pages that need login.
  - `RequireRole` protects pages by role(s).
- Backend endpoints expected:
  - `POST /auth/login` → `{ token, user: { id, name, email, role } }`
  - `GET /auth/me` (optional) → `{ id, name, email, role }`

### Wiring your backend

In `AuthContext.login()`, we call `api.auth.login(credentials)`. The `HttpClient` attaches `Authorization: Bearer <token>` from context, and calls `logout()` on `401` automatically.

Update `NavBar` to conditionally show Admin/Mentor/Mentee links based on the logged-in user's role.
