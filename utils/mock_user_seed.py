"""
Mock seed data for the IT Data Management app.
Contains employee profiles, hardware assets, and support issues.
"""

MOCK_EMPLOYEES = [
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

MOCK_HARDWARE = [
    {"id": "h1", "employee_id": "1", "device_name": "MacBook Pro 16\"", "device_type": "Laptop", "serial_number": "FVFXX001", "assigned_date": "2024-01-15", "status": "active"},
    {"id": "h2", "employee_id": "1", "device_name": "Dell UltraSharp 32\"", "device_type": "Monitor", "serial_number": "CN0GH002", "assigned_date": "2024-01-16", "status": "active"},
    {"id": "h3", "employee_id": "2", "device_name": "MacBook Pro 14\"", "device_type": "Laptop", "serial_number": "FVFXX003", "assigned_date": "2024-02-01", "status": "active"},
    {"id": "h4", "employee_id": "3", "device_name": "ThinkPad P15", "device_type": "Laptop", "serial_number": "PF2X0004", "assigned_date": "2024-02-15", "status": "active"}
]

MOCK_ISSUES = [
    {"id": "i1", "employee_id": "1", "title": "VPN Connection Drops", "status": "resolved", "category": "Network", "priority": "medium", "created_date": "2024-03-05"},
    {"id": "i2", "employee_id": "1", "title": "Software Update Failure", "status": "open", "category": "Software", "priority": "low", "created_date": "2024-03-12"},
    {"id": "i3", "employee_id": "2", "title": "Broken Screen", "status": "in_progress", "category": "Hardware", "priority": "high", "created_date": "2024-03-10"}
]
