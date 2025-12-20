# Lost & Found

A concise README for a TypeScript + MERN lost-and-found application with dark/light/system theming and optional rewards for returned items.

---

## Project overview

A full‑stack application letting users post **found** items (optionally offering a reward) and **lost** reports. Finders can upload photos and location details; owners can search, match, and request contact or file claims. The codebase is split into `backend/` (Express + TypeScript + Mongoose) and `frontend/` (React + TypeScript, `createBrowserRouter`).

---

## Key features

* Post found items (images, description, location, optional reward)
* Post lost item reports and browse found items
* Search and basic matching (text + location radius)
* Claim workflow with evidence uploads
* Authentication (JWT), role-based actions, and secure uploads
* Light / Dark / System theme with persistent user preference

---

## Tech stack

* **Frontend:** React + TypeScript, react-router (`createBrowserRouter`), Vite (or CRA), Tailwind CSS or CSS Modules
* **Backend:** Node.js, Express, TypeScript, Mongoose
* **Database:** MongoDB (Atlas or local)
* **Storage:** Cloudinary or S3 (dev: local `uploads/`)
* **Auth:** JWT; optional Stripe for reward escrow

---

## Architecture & folder layout

Project structure (matches your workspace):

```
/backend
  ├─ config
  ├─ middlewares
  ├─ models
  ├─ routes
  ├─ uploads
  ├─ .env
  └─ server.ts

/frontend
├─ public
├─ src
│ ├─ assets
│ ├─ components
│ ├─ hooks
│ ├─ pages
│ ├─ utils 
│ ├─ styles.d.ts 
│ ├─ App.tsx 
│ ├─ main.tsx 
│ ├─ index.css
│ └─ App.css
├─ .env
└─ vite.config.ts
```

(Adjust filenames to match your repo; this mirrors the screenshot-provided structure.)

---

## Getting started (development)

**Prerequisites:** Node >=18, npm/yarn/pnpm, MongoDB URI

**Install & run**

```bash
# server
cd backend
npm install
npm run dev

# client
cd ../frontend
npm install
npm run dev
```

Open the client (`http://localhost:5173`) and the server (`http://localhost:5000`).

---

## Environment variables

Example `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lost&found
```

Example `frontend/.env` (Vite):

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## Database models (Mongoose) — example

**foundItem (simplified)**

```ts
{title:{type:String,required:true},description:String,category:String,dateFound:Date,location:String,isDamaged:{type:Boolean,default:false},contact:{name:{type:String,required:true},email:String,phone:String,preferContact:{type:String,enum:['email','phone','text'],default:'phone'}},image:{url:String,filename:String,mimetype:String,size:Number},additionalNotes:String,reward:{type:Number,default:0},status:{type:String,enum:['found','claimed','returned','closed'],default:'found'}},{timestamps:true}
```

---

## API endpoints (high-level)

Base path: `/api`

* `POST /postitem` — post found item
* `POST /lookitem` — look for lost items

---

## Client routing (createBrowserRouter) — example

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "lookforitem",
        element: <LookItem />
      },
      {
        path: "postfounditem",
        element: <PostItem />
      }
    ]
  }
]);
```

## Dark/Light/System theme implementation notes

* Store preference in `localStorage` as `'light'|'dark'|'system'`.
* If `system`, resolve active theme with `window.matchMedia('(prefers-color-scheme: dark)')`.
* Apply a `data-theme` attribute on `document.documentElement` (`'light'` or `'dark'`) and manage colors with CSS variables. Provide a `useTheme` hook that exposes `choice` and `setChoice`.

---

## Image uploads & rewards handling

* Use `multer` for multipart uploads in dev or upload directly to Cloudinary/S3 from the client.
* Store public URLs on `Item.images` and keep thumbnails + size/type validation.
* Reward stored as integer (cents). For on‑platform payment/escrow, integrate Stripe; otherwise treat rewards as off‑platform promises and display terms to users.

---

## License & contact

This project is released under the **MIT License**.

Maintainer: Your Name — [ahmedklai.connect@gmail.com](mailto:ahmedklai.connect@gmail.com)
