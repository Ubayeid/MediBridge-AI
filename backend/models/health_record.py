from sqlalchemy import Column, String, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from .base import BaseModel

class HealthRecord(BaseModel):
    """Health record model for storing medical information."""
    __tablename__ = "health_records"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    record_type = Column(String, nullable=False)  # e.g., "medical_history", "vaccination", "prescription"
    title = Column(String, nullable=False)
    description = Column(String)
    date = Column(DateTime)
    provider_name = Column(String)
    provider_id = Column(String)
    document_url = Column(String)  # URL to stored document in cloud storage
    metadata = Column(JSON)  # Additional structured data specific to record type
    
    # Relationships
    user = relationship("User", back_populates="health_records") 