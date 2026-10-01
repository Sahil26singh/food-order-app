# 🍔 CraveCraft Express — Full-Stack Food Ordering Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](LICENSE)

> A modern, high-performance, full-stack food ordering application engineered with **Java Spring Boot**, **React.js**, **Tailwind CSS**, **Spring Security JWT**, and **REST APIs**. Designed with modern glassmorphism aesthetics, live order tracking, interactive cart customization, and an integrated restaurant administrator dashboard.

---

## 📌 Repository Quick Summary (For GitHub About Section)

**Short Description**:
`A full-stack food ordering platform built with Java Spring Boot 3, React 19, Tailwind CSS, and REST APIs. Features live order tracking, menu customization, JWT auth, and an admin dashboard.`

**Topics / Tags**:
`spring-boot` • `reactjs` • `tailwindcss` • `food-ordering-app` • `jwt-authentication` • `rest-api` • `java17` • `h2-database` • `fullstack`

---

## ✨ Features Breakdown

### 🛒 Customer Experience
* **Interactive Menu & Category Filtering**: Instantly browse gourmet dishes (Burgers, Wood-Fired Pizza, Healthy Bowls, Asian Fusion, Desserts, Drinks) with real-time search.
* **Granular Item Customization**: Choose portion sizes (*Regular*, *Large*, *Feast Portion*), select extra toppings (*Extra Cheese*, *Bacon*, *Truffle Mayo*), and attach special dietary notes.
* **Dynamic Shopping Basket**: Slide-over drawer with instant subtotal, tax calculation, free shipping thresholds, and promo code support (`SPRING20` for 20% OFF).
* **Multi-Step Express Checkout**: Delivery address recorder, payment gateway simulation (Credit/Debit Card, UPI/QR Code, Cash on Delivery), and celebration confetti animation.
* **Real-Time Order Tracking**: 5-step status progression timeline (*Placed* ➔ *Confirmed* ➔ *Preparing in Kitchen* ➔ *Out for Delivery* ➔ *Delivered*), assigned driver card, and status simulator.
* **JWT User Authentication**: Login and registration with instant demo account toggles (*Customer* & *Admin*).

### 🛡️ Restaurant Administrator Panel
* **Analytics Header**: Monitor total revenue, active orders count, menu items total, and customer satisfaction metrics.
* **Menu Offering Manager**: Add new culinary dishes (with title, category, price, image URL, spicy/veg flags) or remove existing items.
* **Live Order Stream**: One-click order status dropdown to update customers in real-time as chefs prepare items.

---

## 🏗️ Architecture & Tech Stack

```
           +---------------------------------------------------+
           |            React 19 + Tailwind CSS                |
           |   (Vite, Lucide Icons, Glassmorphic Design)      |
           +-------------------------+-------------------------+
                                     |
                             REST APIs / JSON
                                     |
           +-------------------------v-------------------------+
           |             Java Spring Boot 3.2 Backend          |
           |  (Spring Web, Spring Security JWT, Validation)    |
           +-------------------------+-------------------------+
                                     |
                             Spring Data JPA
                                     |
           +-------------------------v-------------------------+
           |       H2 Database (Dev) / MySQL / MongoDB         |
           +---------------------------------------------------+
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Lucide React, Canvas Confetti |
| **Backend** | Java 17, Spring Boot 3.2, Spring Security, JJWT, Spring Validation |
| **Persistence** | Spring Data JPA, H2 In-Memory Database, MySQL Driver |
| **Architecture** | 3-Tier Architecture (Controller ➔ Service ➔ Repository ➔ Entity) |

---

## ⚡ Quick Start Guide

### 1. Run Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
Open browser at: **`http://localhost:5173/`**

### 2. Run Backend (Java Spring Boot)
*Prerequisite: JDK 17+ & Maven*
```bash
cd backend
mvn clean spring-boot:run
```
Backend API will start on: **`http://localhost:8080/api`**  
H2 DB Console available at: **`http://localhost:8080/h2-console`**

---

## 📡 Key REST API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/food` | Fetch menu items (supports `?category=burgers`) | Public |
| `POST` | `/api/food` | Create a new food dish | Admin |
| `DELETE` | `/api/food/{id}` | Delete a food dish | Admin |
| `GET` | `/api/orders` | Retrieve all customer orders | Admin / Sync |
| `POST` | `/api/orders` | Place a new customer order | Public |
| `PUT` | `/api/orders/{id}/status` | Update live order status | Admin |

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
