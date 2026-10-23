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
  * **Marketplace Affiliate Integration:** Direct branded buy buttons for **Meesho** (Pink), **Flipkart** (Blue), and **Amazon** (Orange).
  * **Dynamic Category Filtering:** Fast client-side filtering for *Cable Protectors*, *Lens Protectors*, and *Cases & Gadgets*.
  * **Live Search & Price Sorting:** Instant search with debounce and price / rating sorting.
  * **Product Quick View Modal:** Click any item to view large visual preview, stock availability, and specifications.
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
  * **1-Click Live Publish Toggle:** Toggle any product between `Published (Live)` and `Draft (Hidden)` with instant real-time synchronization.
  * **Add / Edit Product Modal:** Title, Category, Selling Price (₹), Original MRP (₹), Ratings, Reviews, Affiliate Redirect URL, Emoji Quick Presets (`💖`, `🧸`, `🐧`, `🐼`, `⚡`, `🎧`, `📷`, `🌸`, `🥑`, etc.), and custom image upload.
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
* **State & Persistence:** React Context API with cross-tab `localStorage` synchronization

---

## 📂 Project Structure

```
├── public/
│   ├── assets/              # Static assets and sample attachments
│   └── seglobal.zip         # 1-Click full project downloadable archive
├── src/
│   ├── components/
│   │   ├── AdminAnalytics.tsx        # Outbound click tracking & bulk CSV/JSON tools
│   │   ├── AdminLogin.tsx            # Protected authentication gate
│   │   ├── AdminPortal.tsx           # Product catalog inventory manager
│   │   ├── AdminThemeCustomizer.tsx  # Store templates & layout geometry studio
│   │   ├── ProductDetailModal.tsx    # Customer quick view & WhatsApp share
│   │   ├── PublicStorefront.tsx      # Public customer e-commerce page
│   │   └── WishlistDrawer.tsx        # Saved items slide-over drawer
│   ├── context/
│   │   ├── AuthContext.tsx           # Admin session & authentication
│   │   ├── ProductContext.tsx        # Catalog state & click tracking
│   │   └── ThemeContext.tsx          # Store templates & visual theme state
│   ├── data/
│   │   ├── defaultProducts.ts        # Initial mobile accessory items
│   │   └── storeTemplates.ts         # 4 color palettes and theme configurations
│   ├── types/
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
