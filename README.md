# Deployment Report: Simple Note Taker (SQLite)

## 1. Deployed URL
- **Live Application:** [https://your-project-name.onrender.com](https://your-project-name.onrender.com)

## 2. GitHub Repository
- **Source Code:** [https://github.com/your-username/your-repo-name]([https://github.com/your-username/your-repo-name](https://github.com/thanakorn03/simple-note-taker.git))

## 3. Deployment Platform & Configuration
- **Provider:** Render.com
- **Service Type:** Web Service (Free Tier)
- **Root Directory:** `backend`
- **Build Command:** `npm install && cd ../frontend && npm install && npm run build`
- **Start Command:** `node server.js`
- **Persistent Disk:**
  - **Name:** data-disk
  - **Mount Path:** `/app/backend/data`
  - **Size:** 1 GB

## 4. Environment Variables
- `NODE_ENV`: `production`

## 5. Deployment Date
- October 27, 2025
