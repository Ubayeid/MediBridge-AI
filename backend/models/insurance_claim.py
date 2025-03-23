from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Enum, Numeric
from sqlalchemy.orm import relationship
import enum
from .base import BaseModel

class ClaimStatus(enum.Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    PROCESSING = "processing"
    APPROVED = "approved"
    REJECTED = "rejected"
    PAID = "paid"

class InsuranceClaim(BaseModel):
    """Insurance claim model for tracking claims and coverage."""
    __tablename__ = "insurance_claims"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    claim_number = Column(String, unique=True, nullable=False)
    status = Column(Enum(ClaimStatus), default=ClaimStatus.PENDING)
    service_date = Column(DateTime, nullable=False)
    provider_id = Column(String, nullable=False)
    provider_name = Column(String, nullable=False)
    service_type = Column(String, nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    covered_amount = Column(Numeric(10, 2))
    out_of_pocket_amount = Column(Numeric(10, 2))
    submission_date = Column(DateTime)
    processing_date = Column(DateTime)
    approval_date = Column(DateTime)
    payment_date = Column(DateTime)
    denial_reason = Column(String)
    notes = Column(String)
    documents = Column(JSON)  # URLs to claim-related documents
    
    # Relationships
    user = relationship("User", back_populates="insurance_claims") 