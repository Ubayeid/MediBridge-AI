from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .base import BaseModel

class User(BaseModel):
    """User model for storing student information."""
    __tablename__ = "users"

    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    university_id = Column(String)
    university_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Insurance information
    insurance_provider = Column(String)
    insurance_plan_id = Column(String)
    insurance_details = Column(JSON)
    
    # Relationships
    health_records = relationship("HealthRecord", back_populates="user")
    appointments = relationship("Appointment", back_populates="user")
    insurance_claims = relationship("InsuranceClaim", back_populates="user") 