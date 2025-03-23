# MediBridge AI

An AI-powered healthcare assistant for international students in the U.S., helping them manage healthcare costs, find appropriate treatment options, navigate insurance, and access university-specific health services.

## Features

- 🤖 AI-Powered Healthcare Cost Estimator
- 🏥 AI Symptom Checker & Triage
- 📅 Smart Appointment Scheduler
- 🏫 Cross-Campus Healthcare Access
- 🏥 Insurance Integration & Coverage Checker
- 💰 Cost-Saving Tips & Resource Guide
- 📋 Health Record Hub

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Python with FastAPI
- **Database**: PostgreSQL
- **AI/ML**: 
  - GPT-4/MedLM for symptom checking
  - XGBoost for appointment prediction
- **APIs**: OpenFDA, FHIR, GoodRx
- **Cloud**: AWS (HIPAA-compliant)
- **Authentication**: OAuth 2.0

## Project Structure

```
medibridge-ai/
├── frontend/                 # React frontend application
├── backend/                  # FastAPI backend application
│   ├── api/                 # API endpoints
│   ├── models/              # Database models
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── ml/                      # Machine learning models
│   ├── cost_estimator/      # Cost prediction models
│   ├── symptom_checker/     # Symptom analysis models
│   └── appointment_predictor/# Appointment scheduling models
├── docs/                    # Documentation
└── tests/                   # Test suites
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medibridge-ai.git
cd medibridge-ai
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the development servers:
```bash
# Backend
cd backend
uvicorn main:app --reload

# Frontend
cd frontend
npm start
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- OpenFDA API for drug and treatment cost data
- FHIR API for healthcare data standards
- GoodRx API for medication pricing
- University healthcare providers and insurance partners 