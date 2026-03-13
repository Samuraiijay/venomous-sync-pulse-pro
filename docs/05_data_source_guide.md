# Data Source Connection Guide

This document explains how **Venomous Sync Pulse Pro** connects to data sources, manages mock data, and how to transition to live API environments.

## Architecture Overview

The application utilizes a centralized data fetching layer located in [utils/api.py](file:///Users/jwilliams/venomous-sync-pulse-pro/utils/api.py). All components (Dashboard, Directory, etc.) interact with this client rather than making direct HTTP requests.

### The `Base44Client`
The `Base44Client` class is responsible for:
1. **Authentication**: Managing API tokens and headers.
2. **Standardization**: Normalizing data from different sources (ServiceNow, Neon DB) into a consistent format.
3. **Caching**: Leveraging Streamlit's `@st.cache_resource` for performance.

## Current State: Mock Data

By default, the application is in **Development Mode**, meaning it serves pre-defined mock data to ensure the UI remains functional without an active backend.

- **Mock Data File**: [utils/mock_user_seed.py](file:///Users/jwilliams/venomous-sync-pulse-pro/utils/mock_user_seed.py)
- **Modifying Mock Data**: Simply edit the `MOCK_EMPLOYEES`, `MOCK_HARDWARE`, or `MOCK_ISSUES` lists in the seed file. Changes will reflect immediately on the next app refresh.

## Transitioning to Live API

To connect the application to a real Base44 or custom backend, follow these steps:

### 1. Configure Environment Variables
The client looks for the following environment variables. You can set these in a `.env` file or export them in your shell:

```bash
VITE_BASE44_APP_ID="your_ext_app_id"
VITE_BASE44_APP_BASE_URL="https://your-api-url.base44.app"
ACCESS_TOKEN="your_secure_access_token"
```

### 2. Enable Live Fetching
In [utils/api.py](file:///Users/jwilliams/venomous-sync-pulse-pro/utils/api.py), the `get_employees` method (and others) currently has the live request commented out for safety:

```python
# To enable live API, uncomment the following lines in api.py:
# response = requests.get(url, headers=self._get_headers(), params=params)
# return response.json().get('data', [])
```

### 3. Data Source Attribution
The application tracks the origin of each record via the `source` field. Valid values used by the UI are:
- `servicenow`: Displayed as ServiceNow (Green)
- `neon_db`: Displayed as Neon DB (Cyan)
- `both`: Displayed as Both Sources (Purple)
- `manual`: Default fallback (Slate)

## Authentication Requirements
The client supports `X-Base44-App-Id` and `Authorization` bearer tokens. Ensure your API gateway is configured to accept these headers.

---
*For further assistance with integration, please contact the development team.*
