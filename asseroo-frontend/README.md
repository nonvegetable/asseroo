# Asseroo Frontend

React + JavaScript frontend for Aadhaar-based vehicle ownership transfer.

## Features

- Aadhaar register/login flow (12-digit validation)
- Vehicle registration by Indian registration number (example: `KA01AB1234`)
- Vehicle transfer between Aadhaar numbers
- Dashboard for owned vehicles + on-chain activity
- HeroUI components with a pastel, rounded UI
- Axios integration with Spring backend APIs

## Run

```bash
npm install
npm run dev
```

To build production assets:

```bash
npm run build
```

Frontend expects backend on `http://localhost:8080/api`.
You can override with `VITE_API_BASE_URL`.
