from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="MediBridge AI",
    description="AI-powered healthcare assistant for international students in the U.S.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Error handling
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": str(exc)},
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Import and include routers
# from api.routes import cost_estimator, symptom_checker, appointments, insurance, health_records
# app.include_router(cost_estimator.router, prefix="/api/v1", tags=["cost-estimator"])
# app.include_router(symptom_checker.router, prefix="/api/v1", tags=["symptom-checker"])
# app.include_router(appointments.router, prefix="/api/v1", tags=["appointments"])
# app.include_router(insurance.router, prefix="/api/v1", tags=["insurance"])
# app.include_router(health_records.router, prefix="/api/v1", tags=["health-records"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    ) 