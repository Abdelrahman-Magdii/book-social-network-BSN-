Perfect 👍 You want a polished **README for the backend** part of your Book Social Network project. Here’s a clean, professional version that is GitHub-friendly, structured, and easy for contributors/users to follow:

---

# 📚 Book Social Network - Backend

## 📝 Overview

The **backend** of the Book Social Network project is responsible for handling all **server-side operations**, including:

* User authentication & authorization
* Book management & borrowing logic
* REST API endpoints for the frontend

It is built with **Spring Boot 3** and **Spring Security 6**, following best practices for **secure, scalable, and maintainable applications**.

---

## 🛠️ Technologies Used

* **Spring Boot 3** – Core framework for building Java applications
* **Spring Security 6** – Authentication & authorization
* **JWT Token Authentication** – Secure client-server communication
* **Spring Data JPA** – Database persistence with JPA
* **JSR-303 + Spring Validation** – Input validation via annotations
* **OpenAPI + Swagger UI** – API documentation
* **Docker** – Containerization for deployment

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abdelrahman-Magdii/book-social-network-BSN-.git
```

### 2️⃣ Run Docker Services

Start required services (database, etc.):

```bash
docker-compose up -d
```

### 3️⃣ Navigate to Backend Directory

```bash
cd book-social-network
```

### 4️⃣ Install Dependencies

(Requires **Maven**)

```bash
mvn clean install
```

### 5️⃣ Run the Application

Replace `x.x.x` with the current version from `pom.xml`:

```bash
java -jar target/book-network-api-x.x.x.jar
```

### 6️⃣ Access API Documentation

Swagger UI is available at:
👉 [http://localhost:8088/swagger-ui/index.html](http://localhost:8088/swagger-ui/index.html)

---

## 📜 License

This project is licensed under the **Apache License 2.0** – see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

* [Abdelrahman-Magdii](https://github.com/Abdelrahman-Magdii.git)
