# MediBridge AI

MediBridge AI is an AI-powered healthcare assistant designed specifically for international students in the U.S. The platform provides comprehensive healthcare management tools and resources to help students navigate the U.S. healthcare system effectively.

## Features

- **Healthcare Cost Estimator**: Get instant estimates for common medical procedures and services
- **AI Symptom Checker**: Receive preliminary health assessments and guidance
- **Appointment Scheduler**: Easily schedule and manage medical appointments
- **Cross-Campus Healthcare Access**: Find and access healthcare facilities from partnering universities
- **Insurance Integration**: Manage and understand your health insurance coverage
- **Cost-Saving Tips**: Access personalized recommendations for healthcare cost optimization
- **Health Record Hub**: Securely store and share your health records with healthcare providers

## Tech Stack

- **Frontend**: React, TypeScript, Ant Design
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **AI/ML**: TensorFlow.js, OpenAI API
- **Authentication**: JWT, OAuth 2.0
- **Cloud Services**: AWS (EC2, S3, Lambda)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medibridge-ai.git
cd medibridge-ai
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
medibridge-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- Ant Design for the UI components
- MongoDB for the database solution
- AWS for cloud infrastructure 