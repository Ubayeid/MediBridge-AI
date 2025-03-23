# MediBridge AI Backend

This is the backend service for MediBridge AI, a healthcare management system designed specifically for international students. It provides a comprehensive API for managing appointments, health records, and insurance information.

## Features

- User authentication and authorization
- Appointment management
- Health record management
- Insurance information management
- Secure file uploads
- Real-time notifications
- API rate limiting and security measures

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medibridge-ai.git
cd medibridge-ai/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/medibridge
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=30d
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the server with hot-reload enabled.

## Production

To build and start the production server:

```bash
npm run build
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when running the server.

### Main Endpoints

- Authentication:
  - POST `/api/v1/auth/register` - Register a new user
  - POST `/api/v1/auth/login` - Login user
  - POST `/api/v1/auth/logout` - Logout user

- Users:
  - GET `/api/v1/users/me` - Get current user profile
  - PATCH `/api/v1/users/updateMe` - Update user profile
  - PATCH `/api/v1/users/updateMyPassword` - Update user password

- Appointments:
  - GET `/api/v1/appointments` - Get all appointments
  - POST `/api/v1/appointments` - Create new appointment
  - GET `/api/v1/appointments/:id` - Get appointment details
  - PATCH `/api/v1/appointments/:id` - Update appointment
  - DELETE `/api/v1/appointments/:id` - Delete appointment

- Health Records:
  - GET `/api/v1/health-records` - Get all health records
  - POST `/api/v1/health-records` - Create new health record
  - GET `/api/v1/health-records/:id` - Get health record details
  - PATCH `/api/v1/health-records/:id` - Update health record
  - DELETE `/api/v1/health-records/:id` - Delete health record

- Insurance:
  - GET `/api/v1/insurance` - Get all insurance policies
  - POST `/api/v1/insurance` - Create new insurance policy
  - GET `/api/v1/insurance/:id` - Get insurance policy details
  - PATCH `/api/v1/insurance/:id` - Update insurance policy
  - DELETE `/api/v1/insurance/:id` - Delete insurance policy

## Testing

To run tests:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 