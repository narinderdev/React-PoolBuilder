# Pool Builder Frontend

React + Vite frontend for the Pool Builder onboarding and portal experience.

## Features
- OTP login + JWT session handling (access + refresh tokens).
- Onboarding flow with validation and permissions.
- Homeowner portal dashboard (static content for now).
- Users directory screen.

## Tech Stack
- React (Vite)
- CSS (custom)

## Requirements
- Node.js 18+ (or compatible)
- Backend running locally on `http://localhost:8000`

## Setup
```bash
npm install
```

## Environment
Create a `.env` file in this folder:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Project Structure
```
src/
  components/   # Screen components
  App.jsx        # App state + routing
  App.css        # Global styles
```

## Auth Flow
1. Login -> request OTP
2. Verify OTP -> receive access + refresh tokens
3. If user already onboarded -> go to portal
4. If new user -> go to onboarding
5. Logout clears tokens and returns to login

## Notes
- Back button to login/OTP is blocked once authenticated.
- Portal data is currently static; users list comes from the backend.
