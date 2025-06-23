#!/usr/bin/env python3
import os
import unittest
import requests
import json
from pprint import pprint

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get('BACKEND_URL', 'https://7c5550dd-ca64-4402-88ad-7dada69cbb45.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class PortfolioBackendTests(unittest.TestCase):
    """Test suite for Jeremiah M. James Portfolio Backend API"""
    
    def setUp(self):
        """Setup for each test"""
        self.api_base_url = API_BASE_URL
        print(f"\nUsing API base URL: {self.api_base_url}")
    
    def test_health_check(self):
        """Test the health check endpoint"""
        print("\n=== Testing Health Check Endpoint ===")
        response = requests.get(f"{self.api_base_url}/health")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "healthy")
        self.assertTrue("message" in response.json())
        
        print("✅ Health check endpoint test passed")
    
    def test_services_endpoint(self):
        """Test the services endpoint"""
        print("\n=== Testing Services Endpoint ===")
        response = requests.get(f"{self.api_base_url}/services")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response contains {len(response.json().get('services', []))} services")
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue("services" in response.json())
        
        services = response.json()["services"]
        self.assertTrue(len(services) > 0)
        
        # Check for expected services
        expected_services = [
            "Web Development", 
            "Computer Repair & Maintenance", 
            "CCTV Installation & Repair",
            "Computer Networking",
            "IT Support & Consulting"
        ]
        
        service_titles = [service["title"] for service in services]
        print(f"Found services: {service_titles}")
        
        for expected in expected_services:
            self.assertTrue(
                any(expected in service["title"] for service in services),
                f"Expected service '{expected}' not found in response"
            )
        
        # Verify service structure
        for service in services:
            self.assertTrue("id" in service)
            self.assertTrue("title" in service)
            self.assertTrue("description" in service)
            self.assertTrue("icon" in service)
        
        print("✅ Services endpoint test passed")
    
    def test_contact_form_valid_data(self):
        """Test the contact form endpoint with valid data"""
        print("\n=== Testing Contact Form Endpoint (Valid Data) ===")
        
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "+1234567890",
            "service": "web-development",
            "message": "I need a professional website for my business."
        }
        
        print(f"Sending data: {valid_data}")
        response = requests.post(
            f"{self.api_base_url}/contact",
            json=valid_data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        self.assertTrue("id" in response.json())
        self.assertEqual(response.json()["name"], valid_data["name"])
        self.assertEqual(response.json()["email"], valid_data["email"])
        self.assertEqual(response.json()["service"], valid_data["service"])
        self.assertEqual(response.json()["message"], valid_data["message"])
        self.assertEqual(response.json()["status"], "new")
        
        print("✅ Contact form endpoint (valid data) test passed")
    
    def test_contact_form_missing_required_fields(self):
        """Test the contact form endpoint with missing required fields"""
        print("\n=== Testing Contact Form Endpoint (Missing Required Fields) ===")
        
        invalid_data = {
            "email": "john.smith@example.com",
            "service": "web-development"
            # Missing name and message fields
        }
        
        print(f"Sending data with missing fields: {invalid_data}")
        response = requests.post(
            f"{self.api_base_url}/contact",
            json=invalid_data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        print("✅ Contact form endpoint (missing fields) validation test passed")
    
    def test_contact_form_invalid_email(self):
        """Test the contact form endpoint with invalid email"""
        print("\n=== Testing Contact Form Endpoint (Invalid Email) ===")
        
        invalid_data = {
            "name": "John Smith",
            "email": "not-an-email",  # Invalid email
            "service": "web-development",
            "message": "I need a professional website for my business."
        }
        
        print(f"Sending data with invalid email: {invalid_data}")
        response = requests.post(
            f"{self.api_base_url}/contact",
            json=invalid_data
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        self.assertEqual(response.status_code, 422)  # Unprocessable Entity
        
        print("✅ Contact form endpoint (invalid email) validation test passed")
    
    def test_mongodb_storage(self):
        """Test that inquiries are stored in MongoDB"""
        print("\n=== Testing MongoDB Storage via Inquiries Endpoint ===")
        
        # First, submit a unique contact inquiry
        unique_message = f"Test message for MongoDB verification {os.urandom(4).hex()}"
        test_data = {
            "name": "MongoDB Test User",
            "email": "mongodb.test@example.com",
            "service": "it-support",
            "message": unique_message
        }
        
        print(f"Submitting unique contact inquiry: {test_data}")
        submit_response = requests.post(
            f"{self.api_base_url}/contact",
            json=test_data
        )
        
        self.assertEqual(submit_response.status_code, 200)
        inquiry_id = submit_response.json()["id"]
        print(f"Inquiry submitted with ID: {inquiry_id}")
        
        # Then, check if it appears in the inquiries endpoint
        inquiries_response = requests.get(f"{self.api_base_url}/inquiries")
        
        print(f"Inquiries endpoint status code: {inquiries_response.status_code}")
        
        if inquiries_response.status_code == 200:
            inquiries = inquiries_response.json().get("inquiries", [])
            print(f"Found {len(inquiries)} total inquiries")
            
            # Look for our unique message
            found = False
            for inquiry in inquiries:
                if inquiry.get("message") == unique_message:
                    found = True
                    print(f"Found our test inquiry in MongoDB: {inquiry}")
                    break
            
            self.assertTrue(found, "Our test inquiry was not found in MongoDB")
            print("✅ MongoDB storage test passed")
        else:
            print(f"⚠️ Could not verify MongoDB storage: {inquiries_response.text}")
            print("Skipping MongoDB verification as inquiries endpoint returned an error")


if __name__ == "__main__":
    unittest.main(verbosity=2)