# Dental Clinic Backend API

A RESTful API backend for the Dental Clinic website built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication
- 👤 User management (Admin/Staff roles)
- 📅 Appointment management
- 🦷 Services CRUD
- 👨‍⚕️ Team members management
- ⭐ Testimonials with approval workflow
- ❓ FAQ management
- 🖼️ Gallery management
- 📧 Contact form submissions
- 📊 Appointment statistics

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) - Local installation or MongoDB Atlas account
- **npm** or **yarn**

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   
   Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```
   
   Then update the values in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/dental-clinic
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB:**
   
   Make sure MongoDB is running on your system.

5. **Seed the database (optional but recommended):**
   ```bash
   npm run seed
   ```
   
   This will populate the database with sample data including:
   - Admin user (email: `admin@dentalclinic.com`, password: `admin123`)
   - All services from the frontend
   - Team members
   - Testimonials
   - FAQs
   - Gallery items

6. **Start the server:**
   
   Development mode (with hot reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

The API will be running at `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| GET | `/api/auth/logout` | Logout user | Private |
| PUT | `/api/auth/updatedetails` | Update user details | Private |
| PUT | `/api/auth/updatepassword` | Update password | Private |

### Appointments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/appointments` | Get all appointments | Private |
| GET | `/api/appointments/stats` | Get appointment statistics | Private |
| GET | `/api/appointments/:id` | Get single appointment | Private |
| POST | `/api/appointments` | Create appointment | Public |
| PUT | `/api/appointments/:id` | Update appointment | Private |
| DELETE | `/api/appointments/:id` | Delete appointment | Admin |

### Services
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/services` | Get all services | Public |
| GET | `/api/services/:id` | Get single service | Public |
| GET | `/api/services/slug/:slug` | Get service by slug | Public |
| POST | `/api/services` | Create service | Admin |
| PUT | `/api/services/:id` | Update service | Admin |
| DELETE | `/api/services/:id` | Delete service | Admin |

### Team Members
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/team` | Get all team members | Public |
| GET | `/api/team/:id` | Get single team member | Public |
| POST | `/api/team` | Create team member | Admin |
| PUT | `/api/team/:id` | Update team member | Admin |
| DELETE | `/api/team/:id` | Delete team member | Admin |

### Testimonials
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/testimonials` | Get all testimonials | Public |
| GET | `/api/testimonials/featured` | Get featured testimonials | Public |
| GET | `/api/testimonials/:id` | Get single testimonial | Public |
| POST | `/api/testimonials` | Submit testimonial | Public |
| PUT | `/api/testimonials/:id` | Update testimonial | Admin |
| PUT | `/api/testimonials/:id/approve` | Approve testimonial | Admin |
| DELETE | `/api/testimonials/:id` | Delete testimonial | Admin |

### FAQs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/faqs` | Get all FAQs | Public |
| GET | `/api/faqs/grouped` | Get FAQs grouped by category | Public |
| GET | `/api/faqs/:id` | Get single FAQ | Public |
| POST | `/api/faqs` | Create FAQ | Admin |
| PUT | `/api/faqs/:id` | Update FAQ | Admin |
| DELETE | `/api/faqs/:id` | Delete FAQ | Admin |

### Gallery
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/gallery` | Get all gallery items | Public |
| GET | `/api/gallery/grouped` | Get gallery items grouped | Public |
| GET | `/api/gallery/:id` | Get single gallery item | Public |
| POST | `/api/gallery` | Create gallery item | Admin |
| PUT | `/api/gallery/:id` | Update gallery item | Admin |
| DELETE | `/api/gallery/:id` | Delete gallery item | Admin |

### Contact Messages
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/contact` | Get all messages | Admin |
| GET | `/api/contact/:id` | Get single message | Admin |
| POST | `/api/contact` | Send message | Public |
| PUT | `/api/contact/:id` | Update message | Admin |
| PUT | `/api/contact/:id/read` | Mark as read | Admin |
| DELETE | `/api/contact/:id` | Delete message | Admin |

## Query Parameters

### Filtering
Many endpoints support query parameters for filtering:

```
GET /api/appointments?status=pending
GET /api/services?active=true
GET /api/testimonials?service=cosmetic&approved=true
GET /api/faqs?category=general
```

### Pagination
```
GET /api/appointments?page=2&limit=10
```

### Sorting
```
GET /api/appointments?sort=-createdAt
GET /api/services?sort=order
```

## Authentication

Use JWT tokens for protected routes:

1. Login to get a token:
   ```bash
   POST /api/auth/login
   {
     "email": "admin@dentalclinic.com",
     "password": "admin123"
   }
   ```

2. Include the token in request headers:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## Connecting Frontend

Update your frontend to use the API:

1. Create an API service file in your frontend
2. Set the base URL to `http://localhost:5000/api`
3. Include the JWT token in the Authorization header for protected routes

Example using fetch:
```javascript
const API_URL = 'http://localhost:5000/api';

// Public endpoint
const getServices = async () => {
  const response = await fetch(`${API_URL}/services`);
  return response.json();
};

// Protected endpoint
const getAppointments = async (token) => {
  const response = await fetch(`${API_URL}/appointments`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

// Create appointment (public)
const createAppointment = async (data) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── appointmentController.js
│   ├── authController.js
│   ├── contactController.js
│   ├── faqController.js
│   ├── galleryController.js
│   ├── serviceController.js
│   ├── teamController.js
│   └── testimonialController.js
├── middleware/
│   ├── asyncHandler.js    # Async error wrapper
│   ├── auth.js            # JWT authentication
│   └── errorHandler.js    # Error handling
├── models/
│   ├── Appointment.js
│   ├── ContactMessage.js
│   ├── FAQ.js
│   ├── GalleryItem.js
│   ├── Service.js
│   ├── TeamMember.js
│   ├── Testimonial.js
│   └── User.js
├── routes/
│   ├── appointments.js
│   ├── auth.js
│   ├── contact.js
│   ├── faqs.js
│   ├── gallery.js
│   ├── services.js
│   ├── team.js
│   └── testimonials.js
├── seeds/
│   └── seedData.js        # Database seeder
├── utils/
│   └── sendEmail.js       # Email utilities
├── .gitignore
├── env.example
├── package.json
├── README.md
└── server.js              # Entry point
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run seed` | Seed database with sample data |
| `npm run seed -- -d` | Delete all data from database |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `SMTP_HOST` | Email server host | - |
| `SMTP_PORT` | Email server port | - |
| `SMTP_EMAIL` | Email address | - |
| `SMTP_PASSWORD` | Email password | - |
| `FROM_EMAIL` | Sender email | - |
| `FROM_NAME` | Sender name | - |

## License

ISC
