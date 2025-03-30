# Todo-Auth Application

A modern task management application built with React, Node.js, Express, and MongoDB. This application provides user authentication and CRUD operations for managing tasks.

## Features

### User Authentication
- Register/Login
- Password reset with email OTP verification
- Secure cookie-based sessions
- Profile management

### Task Management
- Create, edit, and delete tasks
- Mark tasks as complete
- Set due dates and times for tasks
- Task categorization (Today, Upcoming, Overdue)
- Filter and sort tasks

### Responsive Design
- Mobile-friendly UI
- Modern UI with Tailwind CSS
- Intuitive user experience

## Getting Started

### Prerequisites
- Node.js 
- MongoDB
- SMTP server credentials (for email functionality)

### Installation

#### Clone the Repository
```sh
git clone https://github.com/yourusername/todo-auth.git
cd todo-auth
```

#### Server Setup
```sh
cd server
npm install
```

#### Client Setup
```sh
cd client
npm install
```

### Environment Variables

#### Server
Create a `.env` file in the `server` directory with the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
```

#### Client
Create a `.env` file in the `client` directory with:
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Start the Server
```sh
cd server
npm start
```

#### Start the Client
```sh
cd client
npm run dev
```

## API Endpoints

API Documentation : https://documenter.getpostman.com/view/26811015/2sB2cPk5ws
