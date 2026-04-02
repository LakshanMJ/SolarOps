### Solar Ops System

**Role:** Full Stack / Frontend Software Developer </br>
**Stack:** React, Node.js (Express), MySQL/PostgreSQL

# 📌 Project Description

Solar Ops is a full-stack solar plant monitoring and operations platform designed to provide real-time visibility into energy generation, system performance, and operational health.

The system enables operators and engineers to make data-driven decisions through intuitive dashboards, analytics, and alerting mechanisms.

This project focuses on building a scalable, performant, and user-friendly interface for managing solar infrastructure.

# 💡 Core Value
📊 Operational Visibility – Real-time insight into plant performance </br>
⚡ Performance Optimization – Identify inefficiencies instantly </br>
🚨 Proactive Monitoring – Detect issues before failures occur </br>
📈 Data-Driven Decisions – Historical analytics & trend tracking </br>

# 🧩 Platform Capabilities
 📊 Real-Time Dashboard
- Live energy production tracking
- System-wide KPI aggregation
- Instant visibility into plant performance </br>

⚡ Energy Analytics
- Daily, weekly, and historical energy insights
- Trend analysis for performance optimization
- Scalable data aggregation pipelines
  
🚨 Intelligent Alerting
- Severity-based alert classification
- Real-time anomaly detection
- Actionable system health indicators
  
🏭 Asset & Device Monitoring
- Inverter-level performance tracking
- Multi-device observability
- Designed for multi-plant scalability

# 🏗️ Architecture

```
Client (React SPA)
        ↓
API Gateway (Node.js / Express)
        ↓
Service Layer (Business Logic)
        ↓
Database (PostgreSQL)
        ↓
External Data Sources (Inverters / Simulated Feeds)
```

# 🔹 Design Principles
- Modular & scalable architecture
- Separation of concerns (UI / API / Data)
- Optimized data flow for real-time updates
- Extensible for IoT integrations

# 📡 API Design (Sample)

| Endpoint         | Description               |
| ---------------- | ------------------------- |
| `/energy/today`  | Current day energy output |
| `/energy/weekly` | Aggregated weekly data    |
| `/power/average` | Real-time average power   |
| `/alerts`        | Active system alerts      |


# 🔐 Security & Access
Token-based authentication (JWT)
Role-based access control (extensible)
Secure API communication

# ⚙️ Setup Guide

This guide will help you set up, run, and access the Solar Ops system locally.


# 📚 Table of Contents

1. [Requirements](#requirements)
2. [Clone the Repository](#clone)
3. [Install Dependencies](#install-deps)
4. [Environment Setup](#env)
5. [Database Setup](#db)
6. [Start Backend Server](#start-backend-server)  
7. [Start Frontend Server](#start-frontend-server)
8. [Access the Application](#access)
9. [Admin Login (Demo Credentials)](#admin-login) 
10. [Sample Product Images](#images)
11. [Troubleshooting](#troubleshooting)


## 1. Requirements <a name="requirements"></a>

- Node.js & npm
- PostgreSQL
- Git


## 2. Clone the Repository <a name="clone"></a>
```bash
git clone https://github.com/LakshanMJ/SolarOps.git
cd SolarOps
```


## 3. Install Dependencies <a name="install-deps"></a>
- Backend
```bash
cd backend
npm install
```
- Frontend
```bash
cd frontend
npm install
cd ..
```

## 4. Environment Setup <a name="env"></a>

Create a `.env` file in the root directory and configure the following variables:
```bash
PORT=4000
Database (PostgreSQL)
Format: postgresql://<username>:<password>@localhost:5432/solarops
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/solarops"
JWT_SECRET=your_jwt_secret

```

## 5. Database Setup <a name="db"></a>
1. Create the PostgreSQL database:
```bash
   CREATE DATABASE solarops;
```
2. Run Prisma migrations to set up the schema:
    - For production / fresh setup
   ```bash
   npx prisma migrate deploy
   ```

   - For development (if you plan to modify the schema)
    ```bash
   npx prisma migrate dev
    ```
   
4. Generate Prisma Client:
```bash  
   npx prisma generate
```

## 6. Start Backend Server <a name="start-backend-server"></a>
```bash
cd backend
npm start
```
- Server will run on: </br>
👉
[http://localhost:5000](http://localhost:4000)
---
## 7. Start Frontend Server <a name="start-frontend-server"></a>
```bash
cd frontend
npm install
cd ..
```
- App will run on: </br>
👉
[http://localhost:5173](http://localhost:5173)
---

## 8. Access the Application <a name="access"></a>
- Open in browser:
[http://localhost:5173](http://localhost:5173)
---
## 9. Initial Admin Setup <a name="admin-login"></a>

Run the seed script to create the default admin account:
```bash
npx prisma db seed
```
### Admin Credentials

| Role  | Username | Password     |
|-------|----------|-------------|
| Admin | admin    | admin@12345 |

> It is recommended to change the password after first login.
---
## 10. Sample Product Images <a name="images"></a>
<img src="sample-images/login.png" alt="Login Page" width="1000">
<img src="sample-images/dashboard 1.png" alt="Login Page" width="1000">
<img src="sample-images/dashboard 2.png" alt="Login Page" width="1000">
<img src="sample-images/sites.png" alt="Login Page" width="1000">
<img src="sample-images/inverter-details.png" alt="Login Page" width="1000">
<img src="sample-images/alerts.png" alt="Login Page" width="1000">
<img src="sample-images/report 1.png" alt="Login Page" width="1000">
<img src="sample-images/user-profile.png" alt="Login Page" width="1000">
<img src="sample-images/FleetSummaryReport.png" alt="Login Page" width="800">
<img src="sample-images/SitePerformanceReport.png" alt="Login Page" width="800">
<img src="sample-images/AlertsReport.png" alt="Login Page" width="800">

---

## 11. Troubleshooting <a name="troubleshooting"></a>
Backend not starting:

- Ensure Node.js is installed
- Run npm install again

Frontend not loading:

- Check for dependency errors
- Delete node_modules and reinstall

Database connection errors:

- Verify DB credentials in .env
- Ensure database service is running

Port conflicts:

- Change backend/frontend ports if already in use
---
