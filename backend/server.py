from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os
from datetime import datetime
import uuid
from typing import Optional

# Initialize FastAPI app
app = FastAPI(title="Jeremiah M. James Portfolio API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = MongoClient(MONGO_URL)
db = client.portfolio_db
inquiries_collection = db.inquiries

# Pydantic models
class ContactInquiry(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    message: str

class InquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    service: str
    message: str
    created_at: str
    status: str

@app.get("/")
async def root():
    return {"message": "Jeremiah M. James Portfolio API is running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.post("/api/contact", response_model=InquiryResponse)
async def submit_contact_form(inquiry: ContactInquiry):
    """Submit a contact inquiry"""
    try:
        # Create inquiry document
        inquiry_doc = {
            "id": str(uuid.uuid4()),
            "name": inquiry.name,
            "email": inquiry.email,
            "phone": inquiry.phone,
            "service": inquiry.service,
            "message": inquiry.message,
            "created_at": datetime.utcnow().isoformat(),
            "status": "new"
        }
        
        # Insert into MongoDB
        result = inquiries_collection.insert_one(inquiry_doc)
        
        if result.inserted_id:
            return InquiryResponse(**inquiry_doc)
        else:
            raise HTTPException(status_code=500, detail="Failed to save inquiry")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing inquiry: {str(e)}")

@app.get("/api/services")
async def get_services():
    """Get available services"""
    services = [
        {
            "id": "web-development",
            "title": "Web Development",
            "description": "Custom websites, web applications, and e-commerce solutions",
            "icon": "🌐"
        },
        {
            "id": "computer-repair",
            "title": "Computer Repair & Maintenance",
            "description": "Hardware troubleshooting, software installation, and system optimization",
            "icon": "🔧"
        },
        {
            "id": "cctv-installation",
            "title": "CCTV Installation & Repair",
            "description": "Security camera systems for homes and businesses",
            "icon": "📹"
        },
        {
            "id": "networking",
            "title": "Computer Networking",
            "description": "Network setup, configuration, and troubleshooting",
            "icon": "🌐"
        },
        {
            "id": "it-support",
            "title": "IT Support & Consulting",
            "description": "Technical support and IT consultation for businesses",
            "icon": "💡"
        }
    ]
    return {"services": services}

@app.get("/api/inquiries")
async def get_inquiries():
    """Get all inquiries (admin endpoint)"""
    try:
        inquiries = list(inquiries_collection.find({}, {"_id": 0}))
        return {"inquiries": inquiries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching inquiries: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)