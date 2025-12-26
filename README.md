# Lost & Found

A concise README for a TypeScript + MERN lost-and-found application with dark/light/system theming and optional rewards for returned items.

---

## Project overview

A full‑stack application letting users post **found** items (optionally offering a reward) and **lost** reports. Finders can upload photos and location details; owners can search, match, and request contact or file claims. The codebase is split into `backend/` (Express + TypeScript + Mongoose) and `frontend/` (React + TypeScript, `createBrowserRouter`).

---

## Key features

* Post found items (images, description, location, optional reward)
* Post lost item reports and browse found items
* Search and basic matching
* Claim workflow with evidence uploads
* Light / Dark / System theme with persistent user preference

---

## Tech stack

* **Frontend:** React + TypeScript, Vite , CSS Modules
* **Backend:** Node.js, Express, TypeScript, Mongoose
* **Database:** MongoDB
* **Storage:**  multer , local `uploads/`
---

## Architecture & folder layout

Project structure :

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

/ScreenShots        #This repository includes four images used by the Lost & Found web app
```


---

## Getting started (development)

**Prerequisites:** Node, npm, MongoDB URI

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

## Image uploads

* Use `multer` for multipart uploads uploaded to /backend/uploads.

---

## Images / Visual Assets

### Home Page
| Light mode | Dark mode |
|---:|:---|
| [![Home page — light mode (thumb)](ScreenShots/thumb-HomePageLightMode.png)](ScreenShots/HomePageLightMode.png) | [![Home page — dark mode (thumb)](ScreenShots/thumb-HomePageDarkMode.png)](ScreenShots/HomePageDarkMode.png) |

### Post/look for Items Form
| Post found Items | Post lost Items |
|---:|:---|
| [![Post found item form (thumb)](ScreenShots/thumb-postFoundItem.png)](ScreenShots/postFoundItem.png) | [![Post lost item form (thumb)](ScreenShots/thumb-postLostItem.png)](ScreenShots/postLostItem.png) |

### Error Page
[![Error page (thumb)](ScreenShots/thumb-ErrorPage.png)](ScreenShots/ErrorPage.png)

### Database — MongoDB Compass
[![Database — MongoDB Compass (thumb)](ScreenShots/thumb-FoundItems.png)](ScreenShots/FoundItems.png)

---


## License & contact

This project is released under the **MIT License**.

Maintainer: Your Name — [ahmedklai.connect@gmail.com](mailto:ahmedklai.connect@gmail.com)
