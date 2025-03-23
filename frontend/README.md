# MediBridge AI Frontend

A modern healthcare management system for international students, built with React, TypeScript, and Ant Design.

## Features

- User Authentication
- Health Records Management
- Appointment Scheduling
- Insurance Information
- Symptom Checker
- Cost Estimator
- Health Tips

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medibridge-ai.git
cd medibridge-ai/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the necessary environment variables:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

## Testing

To run tests:

```bash
npm test
```

## Code Style

We use ESLint and Prettier for code formatting. To format the code:

```bash
npm run format
```

To check for linting issues:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── store/         # Context and state management
├── services/      # API services
├── utils/         # Utility functions
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 