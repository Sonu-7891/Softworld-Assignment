# Lead Management Tool

Lead Management Tool is a full-stack application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. This tool is designed for managing leads and customer details, supporting features such as role-based access, lead filtering, sorting, and notifications. It provides a responsive user interface and secure backend APIs.

## Features

### Backend
- **User Authentication:**
  - Role-based access control (Admin/User).
  - Secure login using JWT tokens (Access and Refresh tokens).
- **Lead Management:**
  - CRUD operations for leads.
  - Pagination, sorting, and filtering.
  - Fields include `leadName`, `email`, `contactNumber`, `status`, `nextFollowUpDate`, and more.
- **API Security:**
  - Input validation and sanitization.
  - CORS configuration for secure cross-origin requests.
  - Protection against XSS and injection attacks.

### Frontend
- **User Management:**
  - Login and role-based registration.
  - Role-based navigation and access.
- **Lead Management:**
  - Add, edit, and delete leads.
  - Dynamic form fields and validation.
- **Notifications:**
  - Real-time feedback using toast notifications for success or failure.
- **Responsive Design:**
  - Optimized for all devices (desktop, tablet, and mobile).

## Tech Stack

### Frontend
- React.js
- Redux (State Management)
- React Router (Routing)
- Axios (API Integration)
- React Toastify (Notifications)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites
Ensure the following are installed:
- **Node.js:** [Download here](https://nodejs.org)
- **MongoDB:** [Download here](https://www.mongodb.com/try/download/community)
- **Git:** [Download here](https://git-scm.com)

### Installation

#### Clone the Repository
```bash
git clone https://github.com/Sonu-7891/Softworld-Assignment.git 
```

## ## Install dependencies:
``bash
    npm install ``

## Start the backend server / frontend server:
``bash
    npm start``

## ## Project Structure
`
├── backend/
│   ├── controllers/         # Handles business logic
│   ├── models/              # MongoDB models
│   ├── routes/              # API endpoints
│   ├── middlewares/         # Authentication and validation
│   ├── utils/               # Helper utilities
│   └── server.js            # Entry point for backend server
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios API calls
│   │   ├── components/      # Reusable components (Header, Table, etc.)
│   │   ├── pages/           # Pages (Dashboard, Login, Register)
│   │   ├── redux/           # Redux actions, reducers, and store
│   │   └── App.js           # Root component
├── README.md                # Documentation

