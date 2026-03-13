import os
import requests
import streamlit as st
from datetime import datetime

class Base44Client:
    def __init__(self):
        # In a real app, these would come from environment variables or a config file
        # For this rewrite, we'll try to find them or use placeholders if needed
        # Since we're in a Streamlit app, we can also use st.secrets
        self.app_id = os.getenv("VITE_BASE44_APP_ID", "cbef744a8545c389ef439ea6")
        self.base_url = os.getenv("VITE_BASE44_APP_BASE_URL", "https://my-to-do-list-81bfaad7.base44.app")
        # In the React app, requiresAuth was false and token was also used
        self.token = os.getenv("ACCESS_TOKEN", "")
        
    def _get_headers(self):
        headers = {
            "Content-Type": "application/json",
            "X-Base44-App-Id": self.app_id
        }
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        return headers

    def get_employees(self, limit=200, sort="-created_date"):
        # This is a placeholder for the actual API call logic
        # Based on React code: base44.entities.Employee.list('-created_date', 50)
        url = f"{self.base_url}/api/entities/Employee"
        params = {"limit": limit, "sort": sort}
        try:
            # For demonstration, we'll return mock data if the API fails or is unreachable
            # In a real implementation, you'd handle the response
            # response = requests.get(url, headers=self._get_headers(), params=params)
            # return response.json().get('data', [])
            return self._get_mock_employees()
        except Exception:
            return self._get_mock_employees()

    def get_hardware(self, employee_id=None):
        try:
            return self._get_mock_hardware(employee_id)
        except Exception:
            return []

    def get_issues(self, employee_id=None):
        try:
            return self._get_mock_issues(employee_id)
        except Exception:
            return []

    def _get_mock_employees(self):
        # Returning rich mock data to match the UI requirements
        return [
            {
                "id": "1",
                "full_name": "Jordan Williams",
                "email": "jordan.w@company.com",
                "department": "Engineering",
                "job_title": "Senior Frontend Engineer",
                "status": "active",
                "source": "both",
                "location": "New York, USA",
                "city": "New York",
                "country": "USA",
                "employee_id": "EMP-001",
                "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
                "created_date": "2024-01-15T10:00:00Z"
            },
            {
                "id": "2",
                "full_name": "Sarah Chen",
                "email": "s.chen@company.com",
                "department": "Design",
                "job_title": "Product Designer",
                "status": "active",
                "source": "servicenow",
                "location": "San Francisco, USA",
                "city": "San Francisco",
                "country": "USA",
                "employee_id": "EMP-002",
                "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                "created_date": "2024-02-01T09:30:00Z"
            },
            {
                "id": "3",
                "full_name": "Alex Rivera",
                "email": "a.rivera@company.com",
                "department": "IT Support",
                "job_title": "IT Specialist",
                "status": "active",
                "source": "neon_db",
                "location": "Austin, USA",
                "city": "Austin",
                "country": "USA",
                "employee_id": "EMP-003",
                "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                "created_date": "2024-02-15T11:45:00Z"
            },
            {
                "id": "4",
                "full_name": "Elena Rodriguez",
                "email": "e.rodriguez@company.com",
                "department": "Engineering",
                "job_title": "DevOps Engineer",
                "status": "on_leave",
                "source": "manual",
                "location": "Madrid, Spain",
                "city": "Madrid",
                "country": "Spain",
                "employee_id": "EMP-004",
                "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
                "created_date": "2024-03-01T14:20:00Z"
            }
        ]

    def _get_mock_hardware(self, employee_id=None):
        hw = [
            {"id": "h1", "employee_id": "1", "device_name": "MacBook Pro 16\"", "device_type": "Laptop", "serial_number": "FVFXX001", "assigned_date": "2024-01-15", "status": "active"},
            {"id": "h2", "employee_id": "1", "device_name": "Dell UltraSharp 32\"", "device_type": "Monitor", "serial_number": "CN0GH002", "assigned_date": "2024-01-16", "status": "active"},
            {"id": "h3", "employee_id": "2", "device_name": "MacBook Pro 14\"", "device_type": "Laptop", "serial_number": "FVFXX003", "assigned_date": "2024-02-01", "status": "active"},
            {"id": "h4", "employee_id": "3", "device_name": "ThinkPad P15", "device_type": "Laptop", "serial_number": "PF2X0004", "assigned_date": "2024-02-15", "status": "active"}
        ]
        if employee_id:
            return [h for h in hw if h["employee_id"] == employee_id]
        return hw

    def _get_mock_issues(self, employee_id=None):
        issues = [
            {"id": "i1", "employee_id": "1", "title": "VPN Connection Drops", "status": "resolved", "category": "Network", "priority": "medium", "created_date": "2024-03-05"},
            {"id": "i2", "employee_id": "1", "title": "Software Update Failure", "status": "open", "category": "Software", "priority": "low", "created_date": "2024-03-12"},
            {"id": "i3", "employee_id": "2", "title": "Broken Screen", "status": "in_progress", "category": "Hardware", "priority": "high", "created_date": "2024-03-10"}
        ]
        if employee_id:
            return [i for i in issues if i["employee_id"] == employee_id]
        return issues

@st.cache_resource
def get_api_client():
    return Base44Client()
