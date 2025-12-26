# Lightweight API Client

A simple Postman-like API client built using **React**, **Vite**, and **Tailwind CSS**.  
This project allows users to test REST APIs easily with support for different HTTP methods, environment variables, request history, and code snippets.

---

## ✨ Features

- Send API requests using **GET, POST, PUT, PATCH, DELETE**
- Postman-style **method selector dropdown**
- **Environment variables** support using `{{VARIABLE_NAME}}`
- Request body editor for POST / PUT / PATCH
- **Response viewer** with:
  - Status code
  - Response time (color-highlighted)
  - JSON / text response display
- Auto-generated **code snippets**:
  - cURL
  - JavaScript (fetch)
  - Python (requests)
- **Request history** (last 10 requests)
- Fully **responsive UI** (mobile + desktop)

---

## 🛠 Tech Stack

- **React** (with Hooks)
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- Native `fetch` API

---

## 📸 UI Highlights

- Card-based layout
- Smooth hover & click animations
- Dark JSON response viewer
- Color-coded status and response time
- Postman-inspired UX

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
