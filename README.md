# 🌱 MindGarden Backend API

This is the backend API for **MindGarden**, a mental fitness tracker built with **Express.js**, **Sequelize**, and **MySQL**.

---

## 🔧 Features

- User registration & login
- Email verification via Gmail SMTP
- JWT authentication
- Role-based access (admin, user)
- Middleware for email verification & subscription status
- Subscription system (to be extended with Stripe or Midtrans)
- Modular folder structure

---

## 🚀 Technologies Used

- Node.js + Express.js
- Sequelize ORM + MySQL
- Nodemailer (for email)
- JWT for secure auth
- dotenv for config
- bcrypt for password hashing

---

## 📦 Installation

```bash
git clone https://github.com/your-username/mindgarden-backend.git
cd mindgarden-backend
npm install
