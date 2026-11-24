# Mohamed Hussain: Full-Stack Portfolio

React (Vite) frontend, Express + Mongoose backend, MongoDB Atlas. Built for the Thiranex Full Stack Internship, Task 1.

## Features
Responsive dark-navy UI with blue/cyan/violet accents, sections (Home, About, Skills, Projects, Experience, Resume, Contact), validated contact form (client + server), messages stored in MongoDB, rate limiting, Helmet, CORS allowlist, admin-key protected message listing.

## Structure
```
portfolio/
  frontend/  src/{components,pages,assets,data.js,App.jsx,main.jsx,index.css}  public/resume.pdf
  backend/   config/ models/ routes/ controllers/ server.js .env.example
```

## Setup
```bash
# Backend
cd backend && cp .env.example .env   # fill MONGODB_URI, ADMIN_KEY
npm install && npm run dev           # http://localhost:5000

# Frontend (new terminal)
cd frontend && cp .env.example .env
npm install && npm run dev           # http://localhost:5173
```

## Customize
Edit `frontend/src/data.js` (profile, links, projects, experience; replace every `TODO`). Replace `frontend/public/resume.pdf` with your resume, or set `VITE_RESUME_URL`. Add a photo to `frontend/public/` and set `profile.photo`.

## Environment variables
| File | Variable | Purpose |
|---|---|---|
| backend/.env | PORT | Server port |
| | MONGODB_URI | Atlas connection string |
| | CLIENT_ORIGIN | Allowed frontend origin(s), comma separated |
| | ADMIN_KEY | Key for reading messages |
| frontend/.env | VITE_API_URL | Backend base URL |
| | VITE_RESUME_URL | Resume file path/URL |

## API
- `GET /api/health` returns `{status:"ok"}`
- `POST /api/contact` body `{name,email,subject,message}` returns 201 `{success:true}` or 400 `{success:false,errors:{...}}`
- `GET /api/contact` requires header `x-admin-key: <ADMIN_KEY>`; returns saved messages

Test: `curl -X POST localhost:5000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"a@b.com","subject":"Hello","message":"Testing the API now"}'`

## Deployment
1. **Atlas**: create free cluster, DB user, Network Access allow `0.0.0.0/0`, copy connection string.
2. **Render** (Web Service, root `backend`): build `npm install`, start `npm start`; set env vars; set `CLIENT_ORIGIN` to your Vercel URL.
3. **Vercel** (root `frontend`, Vite preset): build `npm run build`, output `dist`; set `VITE_API_URL` to the Render URL; redeploy after env changes.

Troubleshooting: CORS error means `CLIENT_ORIGIN` must exactly match the Vercel URL (no trailing slash). Render free tier sleeps, so the first request can take ~50s. Atlas connection failure means check IP allowlist and password encoding.

Live checklist: all nav links, resume download, invalid form shows errors, valid form shows success, document appears in Atlas, no console errors on mobile and desktop.

## Deployment links
Frontend: _TODO after deploying_ | Backend: _TODO after deploying_
