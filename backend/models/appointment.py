from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class AppointmentType(enum.Enum):
    IN_PERSON = "in_person"
    TELEHEALTH = "telehealth"
    URGENT_CARE = "urgent_care"
    EMERGENCY = "emergency"

class AppointmentStatus(enum.Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"

class Appointment(BaseModel):
    """Appointment model for managing medical appointments."""
    __tablename__ = "appointments"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    provider_id = Column(String, nullable=False)
    provider_name = Column(String, nullable=False)
    appointment_type = Column(Enum(AppointmentType), nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED)
    scheduled_time = Column(DateTime, nullable=False)
    duration_minutes = Column(Integer, default=30)
    location = Column(String)  # Physical location or telehealth link
    reason = Column(String)
    notes = Column(String)
    estimated_cost = Column(JSON)  # Cost breakdown including insurance coverage
    reminder_sent = Column(DateTime)
    follow_up_notes = Column(String)
    
    # Relationships
    user = relationship("User", back_populates="appointments") 