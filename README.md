# Food Ordering App

A full-stack food ordering application built with **Java Spring Boot** and **React**. It lets customers browse dishes, customize items, manage their cart, and track orders in real time. It also includes an admin dashboard for managing the menu and updating order statuses.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Java 17, Spring Boot 3.2, Spring Security, JWT
- **Database**: H2 (In-Memory for development), MySQL ready
- **Build Tools**: Maven (Backend), npm (Frontend)

---

## ✨ Key Features

### For Customers
- **Menu & Filtering**: Search dishes and filter by categories (Burgers, Pizza, Bowls, Asian, Desserts, Drinks).
- **Item Customization**: Choose portion sizes, add extra toppings, and include special instructions.
- **Cart & Promo Codes**: Manage item quantities, apply promo codes (`SPRING20` for 20% off), and view price breakdown.
- **Checkout**: Multi-step checkout with address details and payment options (Card, UPI/QR, Cash on Delivery).
- **Live Order Tracker**: Follow order progress from placement to kitchen prep and delivery.
- **User Authentication**: Login and registration powered by JWT.

### For Admins
- **Dashboard Overview**: View total revenue, active orders, and menu count.
- **Menu Management**: Add new dishes or remove existing ones.
- **Order Stream**: Update customer order status (Placed ➔ Confirmed ➔ Preparing ➔ Out for Delivery ➔ Delivered) in real time.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Java JDK 17+ & Maven

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

App will run on `http://localhost:5173`.

### Running the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend API will run on `http://localhost:8080/api`.  
H2 Console available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:foodorderdb`, User: `sa`, Password: leave blank).

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login & JWT token generation |
| `GET` | `/api/food` | Get all food items |
| `POST` | `/api/food` | Add new food item (Admin) |
| `DELETE` | `/api/food/{id}` | Delete food item (Admin) |
| `GET` | `/api/orders` | Get all orders |
| `POST` | `/api/orders` | Place a new order |
| `PUT` | `/api/orders/{id}/status` | Update order status (Admin) |

---

## 📝 License

This project is licensed under the MIT License.
