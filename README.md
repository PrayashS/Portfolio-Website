# 🚀 Portfolio Website

A full-stack portfolio website with a secure admin panel for dynamic content management. Built with modern web technologies and industry-standard security practices.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://portfolio-website-frontend-n9u3.onrender.com/)

## ✨ Key Features

### 🎨 Public Portfolio
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dynamic Content** - Real-time data from REST API
- **Interactive Contact Form** - Direct email integration
- **Downloadable Resume** - One-click CV download

### 🔐 Admin Dashboard
- **Secure Authentication** - JWT + bcrypt password hashing
- **Content Management** - Full CRUD operations for:
  - Profile & bio
  - Work experience
  - Projects showcase
  - Skills & technologies
  - Resume/CV uploads
- **Rate Limiting** - Protection against brute force attacks
- **Auto Session Timeout** - Enhanced security with automatic logout

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, CSS3

**Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt

**Cloud Services:** Cloudinary (file storage), MongoDB Atlas

**Security:** Express Rate Limit, Input validation, CORS

## 🛡️ Security Features

- Bcrypt password hashing (never stores plain text)
- JWT authentication with 7-day token expiration
- Rate limiting on login and API endpoints
- Server-side input validation
- Protected admin routes with authentication middleware
- Environment-based configuration

## 📁 Project Structure

```
portfolio-website/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic & request handlers
│   ├── middleware/       # Auth, rate limiting, file upload
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoint definitions
│   ├── utils/            # Helper functions & utilities
│   ├── server.js         # Express server entry point
│   ├── seed.js           # Database seeding script
│   └── package.json
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page-level components
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main App component
│   │   ├── App.css       # Global styles
│   │   └── index.js      # React entry point
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Live Demo

**Website:** [https://portfolio-website-frontend-n9u3.onrender.com/](https://portfolio-website-frontend-n9u3.onrender.com/)

## 🔧 Local Development

```bash
# Clone repository
git clone https://github.com/PrayashS/Portfolio-Website.git
cd Portfolio-Website

# Backend setup
cd backend
npm install
# Configure environment variables
npm start

# Frontend setup (in new terminal)
cd frontend
npm install
npm start
```

**Note:** Environment variables required for database connection, JWT secret, and cloud storage. Contact for configuration details.

## 🌐 API Overview

### Public Endpoints
- Profile, Experience, Projects, Skills (GET)
- Contact form submission (POST)

### Protected Endpoints (Admin Only)
- Content CRUD operations
- Resume management
- Profile updates

All protected routes require JWT authentication.

## 🎯 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- Database modeling with MongoDB
- Authentication & authorization
- Security best practices
- Cloud deployment
- Responsive UI design

## 👤 Author

**Prayash Kumar Shrestha**

MSc Computing Student 

- Portfolio: [Live Demo](https://portfolio-website-frontend-n9u3.onrender.com/)
- GitHub: [@PrayashS](https://github.com/PrayashS)

## 📝 License

MIT License - See LICENSE file for details

---
## 📝 Note on Git History

This repository was initialized with a clean commit history to remove accidentally 
committed environment files and ensure security best practices. The project was 
developed over several iterations with proper version control practices.

⭐ **Star this repo if you found it helpful!**