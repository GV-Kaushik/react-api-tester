# Lightweight API Client

A browser-based, Postman-inspired API testing tool built using **React**, **Vite**, and **Tailwind CSS**.  
This application allows developers to send HTTP requests, inspect responses, manage environment variables, and generate request code snippets — all directly from the browser.

---

## Problem Statement

Backend developers often build APIs but need a quick and lightweight way to test them.  
Popular tools like Postman or Insomnia are powerful but heavy, desktop-based applications.

This project provides a **simple, frontend-only API client** that runs entirely in the browser and helps developers quickly test REST APIs.

---

## Features

- **HTTP Methods Support**: GET, POST, PUT, PATCH, DELETE
- **Environment Variables** using `{{VARIABLE_NAME}}`
- **Request Body Editor** (POST / PUT / PATCH only)
- **Response Viewer** with:
  - HTTP status code
  - Response time (color-coded)
  - JSON / text response rendering
- **Code Snippet Generator**:
  - cURL
  - JavaScript (fetch)
  - Python (requests)
- **Request History** (last 10 requests)

---

## Tech Stack

- **Frontend**: React (Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API Calls**: Native `fetch` API

---

## Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/GV-Kaushik/react-api-tester
cd react-api-tester

```
### 2.Install dependencies
```bash
npm install
```
### 3.Run the development server
```bash
npm run dev
```
### 4.Open your browser at 
```dts
https://react-api-tester-seven.vercel.app/
```

---
## Example API Usage

### GET REQUEST
```awk
https://jsonplaceholder.typicode.com/posts/1
```
---

### POST REQUEST
```awk
https://jsonplaceholder.typicode.com/posts
```
### Request Body
```json
{
  "title": "Hello",
  "body": "Testing API Client",
  "userId": 1
}

```
---
### Environment Variables
Add an environment variable in the UI:
```dts
KEY: BASE_URL
VALUE: https://jsonplaceholder.typicode.com
```
Use it in request URLs like this:
```handlebars
{{BASE_URL}}/users/1
```
---
## Project Structure
```nix
src/
├── components/
│   ├── CodeSnippet.jsx     # Generates request code snippets
│   ├── Env.jsx             # Environment variable manager
│   ├── History.jsx         # Request history viewer
│   ├── RequestForm.jsx     # Method selector, URL input, 
│   ├── Response.jsx        # API response viewer
├── App.jsx                 # Main application layout
├── main.jsx                # React entry point
├── index.css               # Tailwind CSS styles
index.html                  # Root HTML file
package.json                # Project metadata and dependencies
tailwind.config.js          # Tailwind configuration
vite.config.js              # Vite configuration
```






