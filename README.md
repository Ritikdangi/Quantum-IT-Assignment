# Quantum-IT Assignment

A minimal MERN auth sample with a styled login/signup UI and a protected dashboard showing a static table.

## Stack
- Backend: Node.js + Express + Mongoose + JWT
- Frontend: React (Vite) + React Router + Tailwind (utility + custom CSS)
##Screenshots
<img width="1911" height="931" alt="image" src="https://github.com/user-attachments/assets/fdd67153-e370-43f5-b750-642a28f601ff" />
<img width="1907" height="923" alt="image" src="https://github.com/user-attachments/assets/2e33af7f-fb44-4d62-8b31-b47c05231bb9" />

<img width="1888" height="924" alt="image" src="https://github.com/user-attachments/assets/61e1a6d2-0501-4326-9c89-639c620a8854" />


## Local Development

Backend:
```powershell
Push-Location "backend"; npm install; npm run dev
```
Create `backend/.env` from `.env.example` and set:
```
MONGO_URI=...       # your MongoDB URI
JWT_SECRET=...      # a long random string
PORT=5000           # optional (defaults to 5000)
```

Frontend:
```powershell
Push-Location "frontend"; npm install; npm run dev
```
Optionally set `frontend/.env` from `.env.example`:
```
VITE_API_BASE=http://localhost:5000
```

## Build
```powershell
# Frontend
Push-Location "frontend"; npm run build
# Backend starts with
Push-Location "backend"; npm start
```
Backend will automatically serve `/frontend/dist` if present.

## Deployment

### Backend (Render)
- New Web Service → Connect repo → Root: `backend/`
- Build Command: `npm install`
- Start Command: `npm start`
- Env Vars: `MONGO_URI`, `JWT_SECRET`, `PORT` (5000) 

### Frontend (Vercel)
- New Project → Root: `frontend/`
- Build Command: `npm run build`
- Output Dir: `dist`
- Env Vars: `VITE_API_BASE` → set to your Render backend URL

## Project Notes
- Token-based auth stored in `localStorage`.
- `frontend/src/api/auth.js` reads `VITE_API_BASE` and falls back to `http://localhost:5000`.
- Protected route wrapper redirects unauthenticated users to `/login`.


## Housekeeping
- `.env` files are ignored via `.gitignore`. Use the `*.example` files as templates..
