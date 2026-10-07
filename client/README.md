# MoneyMate React Frontend

A clean + glassmorphism blue Expense Tracker frontend built with React + Vite + React Router + Axios + plain CSS.

## Pages
- `/` Landing
- `/home` Protected dashboard
- `/about` About
- `/login` Login
- `/register` Registration
- `/forgot-password` Security-question password reset
- `/change-password` Protected change password

## Run
```bash
npm install
copy .env.example .env
npm run dev
```

For macOS/Linux:
```bash
cp .env.example .env
```

Default API URL:
`http://localhost:5000/api`

The frontend expects the authentication endpoints:
- POST `/auth/login`
- POST `/auth/register`
- POST `/auth/forgot-password/question`
- POST `/auth/forgot-password/verify`
- POST `/auth/forgot-password/reset`
- PUT `/auth/change-password`

The Home dashboard currently uses demo data. Connect your expense endpoints in `src/pages/Home.jsx` when your backend is ready.
