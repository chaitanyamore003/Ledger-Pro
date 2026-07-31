<div align="center">

# <img width="2400" height="1599" alt="ledger-pro-logo-no-background-white" src="https://github.com/user-attachments/assets/7e27f7b5-f515-40a3-b89f-cd3ac596f05d" />
 Ledger Pro

### Modern Enterprise Ledger & Banking Platform

A production-grade full-stack financial ledger management system built with the MERN stack, featuring secure authentication, double-entry bookkeeping, transaction management, email verification, JWT authentication, and a modern responsive interface.

<p align="center">
  <img src="https://img.shields.io/badge/MERN-FullStack-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge"/>
</p>

</div>

---

# 📸 Preview

## Landing Page

<p align="center">
<img width="1426" height="786" alt="Screenshot 2026-07-31 232655" src="https://github.com/user-attachments/assets/6f4f0c2c-e226-40e4-a2b4-cd724adc394c" />

</p>

---

## Dashboard

<p align="center">
<img width="1426" height="786" alt="Screenshot 2026-07-31 232559" src="https://github.com/user-attachments/assets/b256ef4c-3078-4547-ad0c-8b7a18a00ab7" />
</p>

---

## Transactions

<p align="center">
<img width="1440" height="784" alt="Screenshot 2026-07-31 232622" src="https://github.com/user-attachments/assets/e51b610a-ec82-45cc-bf80-be7b7ccdf823" />

</p>

---

## Authentication

<p align="center">
<img width="1428" height="784" alt="Screenshot 2026-07-31 233441" src="https://github.com/user-attachments/assets/66661e59-9481-4fed-9a54-05bdad2187d3" />
</p>

---

# 🚀 Features

### Authentication

- JWT Authentication
- Refresh Token Rotation
- HTTP Only Cookies
- Email Verification (OTP)
- Secure Password Hashing (bcrypt)
- Session Management
- Protected Routes

---

### Banking System

- Double Entry Ledger System
- Account Management
- Transaction History
- Initial Fund Allocation
- Balance Calculation
- Transaction Validation
- Idempotent Transactions
- Demo Recipient Accounts

---

### Security

- JWT Access Tokens
- Refresh Tokens
- HTTP Only Cookies
- Password Hashing
- OTP Verification
- Input Validation
- CORS Protection
- MongoDB Transactions
- Atomic Database Operations

---

### Email System

- Beautiful HTML Emails
- OTP Verification Emails
- Transaction Success Emails
- Transaction Failure Emails
- Gmail OAuth2 Integration

---

### User Experience

- Responsive Design
- Dark Mode
- Modern Banking UI
- Professional Dashboard
- Loading States
- Error Handling
- Toast Notifications

---

# 🏗 Architecture

<p align="center">
<img src="docs/architecture.png" width="100%">
</p>

```
Client
        │
        ▼
React Frontend
        │
 Axios + JWT
        ▼
Express API
        │
Authentication Middleware
        │
Controllers
        │
Services
        │
MongoDB
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Axios
- Tailwind CSS
- Lucide React
- Context API
- Custom Hooks

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Cookie Parser
- CORS

---

## Database

- MongoDB Atlas

Collections

- Users
- Accounts
- Transactions
- Ledgers
- Sessions
- Email Verifications

---

# 📂 Project Structure

```text
Ledger-Pro
│
├── Frontend/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   └── routes/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   │
│   └── server.js
│
└── README.md
```

---

# 🔐 Authentication Flow

<p align="center">
<img src="docs/auth-flow.png" width="100%">
</p>

```
Register
     │
     ▼
Generate OTP
     │
     ▼
Email Verification
     │
     ▼
Login
     │
     ▼
Access Token + Refresh Token
     │
     ▼
Protected Routes
```

---

# 💳 Transaction Flow

<p align="center">
<img src="docs/transaction-flow.png" width="100%">
</p>

```
Validate Request
        │
        ▼
Check Balance
        │
        ▼
Start Mongo Session
        │
        ▼
Create Transaction
        │
        ▼
Create Ledger Entries
        │
        ▼
Commit Transaction
        │
        ▼
Send Email
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/chaitanyamore003/Ledger-Pro.git
```

---

## Backend

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Backend

```env
PORT=

MONGO_URL=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GOOGLE_USER=

GOOGLE_REFRESH_TOKEN=

CLIENT_URL=
```

Frontend

```env
VITE_API_URL=
```

---

# 📬 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/refresh

POST /api/auth/verify-email

POST /api/auth/resend-otp
```

---

## Accounts

```
GET /api/accounts

POST /api/accounts/initialize
```

---

## Transactions

```
POST /api/transactions

GET /api/transactions

GET /api/transactions/demo-recipients
```

---

# 📈 Future Improvements

- PDF Statement Generation
- Scheduled Payments
- Role Based Access Control
- Audit Logs
- Redis Caching
- Docker Support
- CI/CD Pipeline
- Unit & Integration Testing
- Multi Currency Support
- Admin Dashboard

---

# 📷 Demo

### Dashboard

<img width="1426" height="786" alt="Screenshot 2026-07-31 232559" src="https://github.com/user-attachments/assets/ebba4cfd-1418-4a53-b5d1-4271f693da5b" />


---

### Transactions

<img width="1440" height="784" alt="Screenshot 2026-07-31 232622" src="https://github.com/user-attachments/assets/0eb23ba8-8c82-4bf7-bfb7-c73a632e75b9" />


---

# 👨‍💻 Author

**Chaitanya More**

- GitHub: https://github.com/chaitanyamore003
- LinkedIn: https://www.linkedin.com/in/chaitanya-more-472203244/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.

---

<div align="center">

**Built with ❤️ using the MERN Stack**

</div>
