# 🎉 Event Manager

A simple **Event Management Dashboard** built with **HTML, Tailwind CSS, and Vanilla JavaScript**, using a mock REST API (JSON Server) for persistence. The project includes **authentication, role-based access, and event CRUD operations**.

---

## 🚀 Features

* 🔐 **Authentication** (Login & Register)
* 👤 **Role-based access** (Admin / User)
* 📅 **Event listing**
* ➕ **Create events** (Admin only)
* ❌ **Delete events** (Admin only)
* 📝 **Register to events** (Users)
* 🚪 **Logout functionality**
* 🛡️ Route protection using a guard

---

## 🧱 Tech Stack

* **HTML5**
* **Tailwind CSS** (via CDN)
* **Vanilla JavaScript**
* **JSON Server** (Mock REST API)

---

## 📁 Project Structure

```
project-root/
│
├── dashboard.html
├── login.html
├── register.html
│
├── js/
│   ├── auth.js      # Login, register, logout logic
│   ├── guard.js     # Session and route protection
│   └── events.js    # Event CRUD and UI logic
│
└── db.json          # JSON Server database
```

---

## 🔐 Authentication Flow

1. User logs in via `login.html`
2. Credentials are validated against the API
3. User data is stored in `localStorage`
4. Protected pages validate session using `guard.js`
5. Logout clears session and redirects to login

---

## 👥 User Roles

### Admin

* Can create events
* Can delete events
* Can view all events

### User

* Can view events
* Can register for events
* Cannot create or delete events

> ⚠️ Role validation is **frontend-only** and intended for learning purposes.

---

## 🛡️ Route Protection (`guard.js`)

* Redirects unauthenticated users to `login.html`
* Exposes the logged-in user globally via `window.user`

---

## 📡 API Endpoints

Using **JSON Server**:

### Users

```
GET  /users
POST /users
```

### Events

```
GET    /events
POST   /events
PUT    /events/:id
DELETE /events/:id
```

---

## ▶️ Getting Started

### 1. Install JSON Server

```bash
npm install -g json-server
```

### 2. Create `db.json`

```json
{
  "users": [],
  "events": []
}
```

### 3. Run the server

```bash
json-server --watch db.json --port 3000
```

### 4. Open the app

Open `login.html` in your browser.

---

## 📄 License

This project is open for educational use.

---

Made with ❤️ using Vanilla JavaScript
