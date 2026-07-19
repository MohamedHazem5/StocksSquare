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

Production build uses same-origin `/api/*`. Netlify proxies those requests to Somee (see `public/_redirects`), so the browser does not need cross-origin CORS for the API.

```bash
cd Frontend
npm run build
npm run preview
```

Deploy to Netlify (`https://stocksquares.netlify.app`). Publish the API to Somee (`www.StockSquares.somee.com`).

### Cloudflare Pages / Workers deploy

Your live site is still serving **source** HTML (`/src/main.tsx`). That always gives a white screen. Cloudflare must get the **`dist`** build.

**Check after deploy:** open the site → View Page Source. You must see:
```html
<script type="module" crossorigin src="/assets/index-….js"></script>
```
If you still see `/src/main.tsx`, you uploaded the wrong folder.

**Option A — upload manually**
1. `cd Frontend && npm run build`
2. Upload **only** `Frontend/dist` (must contain `index.html` + `assets/` with `Gold.png` and `index-….js`)
3. Do **not** upload `Frontend`, `src`, or the repo root

**Option B — Wrangler (recommended)**
```bash
cd Frontend
npm install -D wrangler
npx wrangler login
npm run deploy:cf
```
`wrangler.toml` points assets at `./dist`.

**Option C — Cloudflare Pages (Git)**
- Root directory: `Frontend`
- Build command: `npm run build`
- Build output directory: `dist`

Production API URL is in `.env.production` → `https://www.StockSquares.somee.com`. Republish the backend so CORS allows your Cloudflare origin (e.g. `https://stockssquare.mh600766.workers.dev`).


---

## Features

- RTL layout (sidebar, banner, product grid)
- Responsive desktop + mobile navigation
- Category filtering
- Add-to-cart feedback
- Empty state when no products are returned from the API

