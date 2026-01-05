# Lost & Found

## Project overview

A full‑stack application letting users post **found** items (optionally offering a reward) and **lost** reports. Finders can upload photos and location details; owners can search, match, and request contact or file claims. The codebase is split into `backend/` (Express + TypeScript + Mongoose) and `frontend/` (React + TypeScript).

---

## Key features

* Post found items (images, description, location, optional reward)
* Post lost item reports and browse found items
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
├─ src
│ ├─ config        # Environment variables, database connection logic
│ ├─ controllers   # Request handling 
│ ├─ middlewares   # Validation, rate limiting, image upload ...
│ ├─ models        # Database schemas  
│ ├─ routes        # API route definitions
│ ├─ schemas       # Zod schemas for validation
│ ├─ services      # LOGIC (DB interactions)
│ ├─ utils         # Helper functions
│ └─ server.ts     # Main
├─ uploads         # This repository includes items photos
├─ .env            # Secrets
├─ .gitignore
└─ vite.config.ts

/frontend
├── public
├── src
│   ├── assets         
│   ├── components     # Reusable UI building blocks (Buttons, Inputs, Modals)
│   ├── hooks          # Custom React hooks for shared logic
│   ├── pages          # Top-level route components (Home, Items, Signin)
│   ├── utils          # Helper functions
│   ├── styles.d.ts    # TypeScript definitions for CSS modules
│   ├── App.tsx        # Main application component and routing configuration
│   ├── main.tsx       # Application entry point
│   ├── index.css      # Global styles, CSS resets
│   └── App.css        # Root variables 
├── .env               # Environment variables
└── vite.config.ts

/ScreenShots       #This repository includes screenshots that demonstrate  the Lost & Found web app
```


---

## Getting started (development)

**Prerequisites:** Node, npm, .env variables

**Install & run**

```bash
# server
cd backend
npm install
npm run dev

# client
cd frontend
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
saltRounds=10
JWT_SECRET=your_jwt_secret_key
```

Example `frontend/.env` (Vite):

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## Database models (Mongoose) — example

**Item (simplified)**

```ts
{
  title: String,
  description: String,
  category: String,
  dateOccurred: Date,
  location: String,
  status: { type: String, enum: ['found', 'lost', 'returned'] },
  reward: Number,
  holder: {
    address: String,
    city: String,
    postal: String
  },
  contact: {
    name: String,
    email: String,
    phone: String,
    preferContact: { type: String, enum: ['email', 'phone', 'text'], default: 'phone' }
  },
  image: {
    filename: String,
    mimetype: String,
    size: Number,
    uploadedAt: Date
  },
  additionalNotes: String
}, { timestamps: true }
```

---

## API endpoints

Base path: `/api`

* `GET /health`    — verify api running

**Items endpoints**

* `POST /postitem` — post found item
* `POST /lookitem` — look for lost items
* `GET /items`     — get all items

**User endpoints**  
* `POST /auth/singin`         — create user
* `POST /auth/signup`         — Login user session
* `POST /auth/logout`         — logout user from session
* `POST /auth/refresh-token`  — refresh user tokens
* `GET  /me`             — get user data (require active user session)
* `GET /user/:id`        — get user data by id
* `GET  /users`           — get all users data
  
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
      },{
        path: "items",
        element: <Items />
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
|---:|---|
<a href="ScreenShots/HomePageLightMode.png">
  <img src="ScreenShots/HomePageLightMode.png" alt="Home page — light mode" width="420">
</a> | 
<a href="ScreenShots/HomePageDarkMode.png">
  <img src="ScreenShots/HomePageDarkMode.png" alt="Home page — dark mode" width="420">
</a> |

### Post/look for Items Form
| Post found Items | Post lost Items |
|---:|---|
<a href="ScreenShots/postFoundItem.png">
  <img src="ScreenShots/postFoundItem.png" alt="Post found item form" width="420" height="200">
</a> | 
<a href="ScreenShots/postLostItem.png">
  <img src="ScreenShots/postLostItem.png" alt="Post lost item form" width="420"  height="200">
</a> |

### Error Page
<a href="ScreenShots/ErrorPage.png">
  <img src="ScreenShots/ErrorPage.png" alt="Error page" width="420">
</a>




---


## License & contact

This project is released under the **MIT License**.

Maintainer: Ahmed Klai — [ahmedklai.connect@gmail.com](mailto:ahmedklai.connect@gmail.com)
