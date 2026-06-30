# Asseroo

Asseroo is a full-stack vehicle ownership transfer application using Aadhaar-based identity and an in-memory blockchain ledger.

- Backend: Spring Boot (Java 21), REST API, validation, blockchain core
- Frontend: React + Vite + JavaScript + HeroUI
- UX: rounded, soft, pastel-blue primary theme

## Project Structure

```text
asseroo/
├── asseroo-backend/   # Spring Boot API + blockchain logic
├── asseroo-frontend/  # React client (HeroUI + Tailwind)
└── README.md
```

## Core Features

- Aadhaar user registration and login
- Vehicle registration to current Aadhaar owner
- Vehicle ownership transfer between Aadhaar users
- Append-only blockchain blocks (proof-of-work, difficulty = 4)
- Chain validity check and transaction inspection
- Dashboard with ownership + recent activity

## Tech Stack

### Backend

- Java 21
- Spring Boot 4 (`webmvc`, `validation`)
- In-memory storage (no external DB)
- CORS origin: `http://localhost:5173`

### Frontend

- React 19 + JavaScript + Vite
- HeroUI + Tailwind CSS v4
- Axios API client (`VITE_API_BASE_URL`, default: `http://localhost:8080/api`)
- Tabler Icons + Framer Motion

## Prerequisites

- Java 21+
- Node.js 20+ (LTS recommended)
- npm 10+

## Quick Start

Run backend and frontend in separate terminals.

### 1) Backend

```bash
cd asseroo-backend
./gradlew bootRun
```

Backend URL: `http://localhost:8080`

### 2) Frontend

```bash
cd asseroo-frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Frontend Scripts

From `asseroo-frontend`:

- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Backend API

Base URL: `http://localhost:8080/api`

### Auth

- `POST /auth/register`
  - Body: `{ "aadhaarNumber": "123412341234" }`
  - Response: `{ "message": "Aadhaar registered successfully." }`

- `POST /auth/login`
  - Body: `{ "aadhaarNumber": "123412341234" }`
  - Success response:

    ```json
    {
      "authenticated": true,
      "aadhaarNumber": "123412341234",
      "vehicles": ["KA01AB1234"]
    }
    ```

### Vehicles

- `POST /vehicles/register`

  ```json
  {
    "vehicleRegistrationNumber": "KA01AB1234",
    "ownerAadhaarNumber": "123412341234"
  }
  ```

- `POST /vehicles/transfer`

  ```json
  {
    "vehicleRegistrationNumber": "KA01AB1234",
    "fromAadhaarNumber": "123412341234",
    "toAadhaarNumber": "987698769876"
  }
  ```

- `GET /vehicles/{registrationNumber}/owner`
- `GET /users/{aadhaarNumber}/vehicles`

### Blockchain

- `GET /blockchain/chain`
- `GET /blockchain/transactions`
- `GET /blockchain/valid`

## Validation Rules

- Aadhaar: exactly 12 digits (`^\d{12}$`)
- Vehicle format (normalized): `KA01AB1234`
- Transfer constraints:
  - sender must be current owner
  - sender and receiver cannot be the same
  - both Aadhaar numbers must be registered

## Local Configuration

- Backend app name: `asseroo-backend`
- Frontend API default: `http://localhost:8080/api`
- Allowed CORS origin: `http://localhost:5173`

Optional frontend env file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

## Demo Flow

1. Register Aadhaar A
2. Register Aadhaar B
3. Login as Aadhaar A
4. Register a vehicle to Aadhaar A (example: `KA01AB1234`)
5. Transfer to Aadhaar B
6. Verify in dashboard:
   - ownership changes
   - transaction appears
   - chain status stays valid

## Notes

- Data is in-memory and resets when backend restarts.
- Built for MVP/demo flow, not production persistence.
- Frontend uses internal view switching (no route-based router yet).

