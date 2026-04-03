# Asseroo

Asseroo is a full-stack vehicle ownership transfer app built around Aadhaar-based identity and an in-memory blockchain ledger.

- Backend: Spring Boot (Java 21), validation, REST API, blockchain logic
- Frontend: React + Vite + JavaScript + HeroUI with a soft pastel UI theme
- Use case: Register Aadhaar users, register vehicles, transfer ownership, and inspect blockchain activity

---

## Project Structure

```
asseroo/
├── asseroo-backend/   # Spring Boot API + blockchain core
├── asseroo-frontend/  # React client (HeroUI)
└── README.md
```

---

## Features

- Aadhaar authentication flow (`register` + `login`) with strict 12-digit validation
- Vehicle registration against current Aadhaar owner
- Ownership transfer between Aadhaar users
- Blockchain-style append-only blocks with proof-of-work (`difficulty = 4`)
- Merkle root + hash-link validation (`/api/blockchain/valid`)
- Dashboard for owned vehicles and recent on-chain transactions
- Pastel, rounded, low-contrast HeroUI frontend

---

## Tech Stack

### Backend (`asseroo-backend`)

- Java 21 (toolchain)
- Spring Boot 4 (`spring-boot-starter-webmvc`, `spring-boot-starter-validation`)
- In-memory state (no external database)
- CORS configured for frontend origin: `http://localhost:5173`

### Frontend (`asseroo-frontend`)

- React 19 + JavaScript + Vite
- HeroUI (`@heroui/react`) + Tailwind CSS v4
- Axios API client (`VITE_API_BASE_URL`, default `http://localhost:8080/api`)
- Tabler Icons + Framer Motion

---

## Prerequisites

- Java 21+
- Node.js 20+ (or current LTS)
- npm 10+

---

## Quick Start

Run backend and frontend in separate terminals.

### 1) Start Backend

```bash
cd asseroo-backend
./gradlew bootRun
```

Backend runs on `http://localhost:8080`.

### 2) Start Frontend

```bash
cd asseroo-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## Frontend Scripts

From `asseroo-frontend`:

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

---

## Backend API

Base URL: `http://localhost:8080/api`

### Auth

- `POST /auth/register`
	- Body: `{ "aadhaarNumber": "123412341234" }`
	- Returns: `{ "message": "Aadhaar registered successfully." }`

- `POST /auth/login`
	- Body: `{ "aadhaarNumber": "123412341234" }`
	- Returns success:
		```json
		{
			"authenticated": true,
			"aadhaarNumber": "123412341234",
			"vehicles": ["KA01AB1234"]
		}
		```

### Vehicles

- `POST /vehicles/register`
	- Body:
		```json
		{
			"vehicleRegistrationNumber": "KA01AB1234",
			"ownerAadhaarNumber": "123412341234"
		}
		```

- `POST /vehicles/transfer`
	- Body:
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

---

## Validation Rules

- Aadhaar: exactly 12 digits (`^\d{12}$`)
- Vehicle registration (normalized uppercase format): `KA01AB1234` style
- Transfer rules:
	- sender must be current owner
	- sender and recipient cannot be same
	- both Aadhaar numbers must be registered

---

## Default Local Configuration

- Backend app name: `asseroo-backend`
- Frontend API fallback: `http://localhost:8080/api`
- CORS allows: `http://localhost:5173`

If needed, create a frontend `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Typical Demo Flow

1. Register Aadhaar A
2. Register Aadhaar B
3. Login as Aadhaar A
4. Register vehicle (e.g. `KA01AB1234`) to Aadhaar A
5. Transfer vehicle from Aadhaar A to Aadhaar B
6. Open Dashboard and verify:
	 - owned vehicles updated
	 - transaction appears in recent activity
	 - chain validity remains `true`

---

## Notes

- Data is stored in-memory, so app state resets when backend restarts.
- This project is optimized for MVP/demo workflow rather than production persistence.
- Frontend currently uses internal view switching (no URL router), by design.

