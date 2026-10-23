# SE GLOBAL — Mobile Accessories Store & Admin Management Platform

> Cute tech accessories with big personality. Modern affiliate & direct e-commerce catalog with a dedicated password-protected Admin Management Portal.

---

## 🚀 Quick Start & Commands

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build Locally
```bash
npm run preview
```

### 5. Run TypeScript Lint & Typecheck
```bash
npm run lint
```

---

## 🌐 Application Architecture & Two Distinct URLs

This project is architected with a decoupled dual-route interface:

### 1. Public Customer Storefront (`/`)
* **URL:** `/` (or `/#/`)
* **Audience:** End customers and online shoppers.
* **Key Features:**
  * Displays **only products published by the Admin** (`isPublished: true`).
  * **Multi-Photo Interactive Sliders:** Products now support multiple photos/angles. Customers can slide/swipe through photos directly on storefront cards or inside the detailed quick-view modal with thumbnail navigation.
  * **Dynamic Store Ad & Promotional Campaign Banner:** Auto-rotating high-converting promotional banners with customizable gradients, badges, CTAs, and click analytics.
  * **Marketplace Affiliate Integration:** Direct branded buy buttons for **Meesho** (Pink), **Flipkart** (Blue), and **Amazon** (Orange).
  * **Dynamic Category Filtering:** Fast client-side filtering for *Cable Protectors*, *Lens Protectors*, and *Cases & Gadgets*.
  * **Live Search & Price Sorting:** Instant search with debounce and price / rating sorting.
  * **Product Quick View Modal:** Click any item to view large visual preview with multiple photos, stock availability, and specifications.
  * **One-Click WhatsApp Sharing:** Direct link to share products or deals on WhatsApp (`api.whatsapp.com/send`).
  * **Customer Saved Wishlist Drawer:** Slide-over drawer with saved items and dynamic total wishlist value calculation.
  * **Single Admin Button:** Clean e-commerce interface with exactly **one** discreet `🔒 Admin` button in the navbar.

### 2. Admin Management Portal (`/admin`)
* **URL:** `/admin` (or `/#admin`)
* **Audience:** Store owner and authorized administrators.
* **Authorization Gate:**
  * Protected with a secure login gate (no visible credential hints on login screen).
  * **Default Credentials:**
    * **Username / Email:** `admin` or `lakshyaright@gmail.com`
    * **Password:** `admin123`
  * Authorized session with prominent **Log Out** button to lock the console.
* **Key Features:**
  * **Multi-Photo Gallery Uploader:** Add multiple photos per product via direct file upload, external image URLs, or emoji presets. Set primary cover image and delete individual photos.
  * **Ads & Promotional Campaigns Studio (`AdminAdsManager`):**
    * Create, edit, and toggle promotional banners and ads.
    * Choose gradients (Purple Glam, Ocean Blue, Gold Amber, Emerald Mint, Crimson Rose).
    * Choose position (`top-strip`, `middle-catalog`, `popup-deal`).
    * Badges (`FLASH SALE`, `HOT DEAL`, `LIMITED OFFER`, etc.).
    * Custom CTA text & destination links.
    * Real-time click tracking on promotional campaigns.
  * **1-Click Live Publish Toggle:** Toggle any product between `Published (Live)` and `Draft (Hidden)` with instant real-time synchronization.
  * **Store Templates & Visual Themes Studio:**
    * **4 Themes:** *Warm Boutique (Aesthetic Cream)*, *Midnight Cyber (Dark Tech Luxe)*, *Nordic Studio (Minimal Monochrome)*, and *Candy Kawaii (Playful Pastel)*.
    * **3 Grid Layouts:** *Standard 3-Column*, *Compact 4-Column*, and *Horizontal Showcase Rows*.
    * **Hero & Announcement Customizer:** Edit the top announcement bar and hero headline live.
    * **Visitor Theme Switcher Toggle:** Option to allow shoppers to choose their preferred theme.
  * **Affiliate Analytics & Click Tracking:** Track outbound clicks across Meesho, Flipkart, and Amazon with a traffic leaderboard.
  * **Bulk Catalog Data Suite:** Export entire product inventory to **CSV (Excel)** or **JSON**, and import bulk JSON batches.

---

## 🛠️ Tech Stack & Libraries

* **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Iconography:** [Lucide React](https://lucide.dev/)
* **Typography:** Plus Jakarta Sans & Space Grotesk
* **State & Persistence:** React Context API with cross-tab `localStorage` synchronization (`ProductContext`, `AuthContext`, `ThemeContext`, `AdContext`)

---

## 📂 Project Structure

```
├── public/
│   ├── assets/              # Static assets and sample attachments
│   └── seglobal.zip         # 1-Click full project downloadable archive
├── src/
│   ├── components/
│   │   ├── AdminAdsManager.tsx       # Promotional ad campaigns manager
│   │   ├── AdminAnalytics.tsx        # Outbound click tracking & bulk CSV/JSON tools
│   │   ├── AdminLogin.tsx            # Protected authentication gate
│   │   ├── AdminPortal.tsx           # Product catalog inventory manager & gallery editor
│   │   ├── AdminThemeCustomizer.tsx  # Store templates & layout geometry studio
│   │   ├── ProductDetailModal.tsx    # Customer quick view & WhatsApp share
│   │   ├── ProductImageSlider.tsx    # Interactive multi-photo carousel & slider
│   │   ├── PublicStorefront.tsx      # Public customer e-commerce page
│   │   ├── StoreAdBanner.tsx         # Auto-rotating promotional ad banner
│   │   └── WishlistDrawer.tsx        # Saved items slide-over drawer
│   ├── context/
│   │   ├── AdContext.tsx             # Promotional ad campaigns context & click tracking
│   │   ├── AuthContext.tsx           # Admin session & authentication
│   │   ├── ProductContext.tsx        # Catalog state & click tracking
│   │   └── ThemeContext.tsx          # Store templates & visual theme state
│   ├── data/
│   │   ├── defaultAds.ts             # Default high-converting promotional campaigns
│   │   ├── defaultProducts.ts        # Initial mobile accessory items with multiple photos
│   │   └── storeTemplates.ts         # 4 color palettes and theme configurations
│   ├── types/
│   │   ├── ad.ts                     # Store promotional ad types & positions
│   │   ├── product.ts                # TypeScript product and stock types
│   │   └── theme.ts                  # Theme and layout types
│   ├── utils/
│   │   └── navigation.ts             # Path & hash route controller
│   ├── App.tsx                       # Root router and context wrapper
│   ├── index.css                     # Global Tailwind tokens
│   └── main.tsx                      # DOM entry point
├── package.json                      # Dependencies and npm scripts
├── package-lock.json                 # Pinned dependency lockfile
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite bundler configuration
```

---

## 📄 License

Apache-2.0 License. Built for **SE GLOBAL**.
