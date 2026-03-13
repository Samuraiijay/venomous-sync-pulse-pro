import os
import requests
import streamlit as st
from datetime import datetime
from utils.mock_user_seed import MOCK_EMPLOYEES, MOCK_HARDWARE, MOCK_ISSUES

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
        # Returning rich mock data from external seed file
        return MOCK_EMPLOYEES

    def _get_mock_hardware(self, employee_id=None):
        if employee_id:
            return [h for h in MOCK_HARDWARE if h["employee_id"] == employee_id]
        return MOCK_HARDWARE

    def _get_mock_issues(self, employee_id=None):
        if employee_id:
            return [i for i in MOCK_ISSUES if i["employee_id"] == employee_id]
        return MOCK_ISSUES


@st.cache_resource
def get_api_client():
    return Base44Client()
