# 🛍️ E-Commerce Frontend (React + Vite)

A modern e-commerce storefront built with **React**, **React Router v6**, and **Vite**.

---

## Pages

| Route            | Description                          |
|------------------|--------------------------------------|
| `/`              | Home — hero banner + featured products |
| `/products`      | Product listing with search & filter |
| `/products/:id`  | Product detail with add-to-cart      |
| `/cart`          | Shopping cart                        |
| `/checkout`      | Checkout form                        |
| `/orders`        | Order history with status management |
| `/admin`         | Admin panel — manage products & categories |

---

## Tech Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Vite 5** — Dev server and build tool
- **Vanilla CSS** — Custom design system (no UI framework)

---

## Local Development

### Prerequisites

- Node.js 20+
- The backend API running (see `../backend/README.md`)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit VITE_API_URL to point to the running backend

# 3. Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Building for Production

```bash
npm run build
# Output: dist/
```

---

## Environment Variables

| Variable        | Description                            | Default                |
|-----------------|----------------------------------------|------------------------|
| `VITE_API_URL`  | Base URL of the backend API (browser-accessible) | `http://localhost:3000` |
