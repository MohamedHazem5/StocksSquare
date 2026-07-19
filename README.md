# Stock Squares

Precious metals storefront — React frontend + ASP.NET Core API.

| Layer | Stack |
|-------|--------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS v4 |
| Backend | ASP.NET Core Web API (.NET 10) — in-memory data |
| Layout | RTL Arabic UI |

---
<img width="1913" height="942" alt="image" src="https://github.com/user-attachments/assets/62ec7a98-a36f-41a0-8429-cab4ece80ce7" />

## Project structure

```
StocksSquare/
├── Frontend/          # React app (Vite)
│   ├── public/assets/ # Product images
│   └── src/
│       ├── api/
│       ├── components/
│       ├── utils/
│       └── types/
└── Backend/
    └── StockSquare/
        └── StockSquare/
            ├── Controllers/
            ├── Data/
            └── Models/
```

---

## Prerequisites

- **Node.js** 20+ and npm
- **.NET SDK** 10 (or compatible with `net10.0`)

---

## Backend setup

```bash
cd Backend/StockSquare/StockSquare
dotnet restore
dotnet run --launch-profile http
```

API listens on **http://localhost:5032**

### Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/market` | Full snapshot (banner, categories, products, gold prices) |
| GET | `/api/products` | All products (`?category=gold\|silver\|coins`) |
| GET | `/api/products/{id}` | Single product |
| GET | `/api/categories` | Category list |
| GET | `/api/gold-prices` | Live gold karat prices |

CORS origins are configured in `appsettings*.json` (`Cors:AllowedOrigins`).

| Environment | Allowed frontend origins |
|-------------|--------------------------|
| Development | `http://localhost:5173`, `http://localhost:4173` |
| Production | `https://stocksquares.netlify.app` (and `http://…`) |

---

## Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

App runs at **http://localhost:5173**

Vite proxies `/api/*` to the backend.

Optional: create `Frontend/.env` to call the API without the proxy:

```
VITE_API_URL=http://localhost:5032
```

### Build for production

Production build uses `Frontend/.env.production`, which points the API at Somee:

```
VITE_API_URL=https://www.StockSquares.somee.com
```

Use `http://www.StockSquares.somee.com` instead if the Somee site has no SSL. Because the Netlify site is HTTPS, browsers block mixed content if the API URL is plain HTTP.

```bash
cd Frontend
npm run build
npm run preview
```

Deploy to Netlify (`https://stocksquares.netlify.app`). Publish the API to Somee (`www.StockSquares.somee.com`).

### Netlify Drop deploy

1. `cd Frontend && npm run build`
2. Open the **`dist`** folder and drag **its contents** (not a parent folder) onto [app.netlify.com/drop](https://app.netlify.com/drop) — `index.html` and `_redirects` must be at the site root.
3. Or drag the whole `dist` folder; Netlify serves that folder as the site root.

`public/_redirects` (copied into `dist` on build) sends all routes to `index.html` so the SPA loads correctly.

---

## Features

- RTL layout (sidebar, banner, product grid)
- Responsive desktop + mobile navigation
- Category filtering
- Add-to-cart feedback
- Empty state when no products are returned from the API

