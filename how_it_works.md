# How It Works - Venomous Sync Pulse Pro (Streamlit)

This document explains the technical architecture, data flow, and styling mechanism of the rewritten Python Streamlit application.

## 1. Project Architecture

The application is structured into three main layers to ensure maintainability and separation of concerns:

### Entry Point (`streamlit_app.py`)
- Configures the global page settings (Layout, Icons).
- Handles the high-level navigation and sidebar logic.
- Serves as the landing page with overview metrics.

### Feature Modules (`pages/`)
- **Multi-Page App**: Streamlit automatically detects files in the `pages/` directory and turns them into sidebar navigation links.
- **Isolation**: Each page (Dashboard, Directory, etc.) is a standalone script that imports shared utilities. This makes the app very stable—if one page has an error, the others still work.

### Utility Layer (`utils/`)
- **`api.py`**: A centralized `Base44Client` class. All data fetching (Employees, Hardware, Issues) goes through this client, making it easy to swap mock data for real API calls in one place.
- **`styles.py`**: A custom global injector that applies a premium CSS theme (Dark Mode, Typography, Glassmorphism) across all pages.

## 2. Data Flow & Communication

### API Integration
1. A page (e.g., `03_Profile.py`) requests data from the `get_api_client()` utility.
2. The `Base44Client` fetches data from the backend (or returns mock data if the backend is unavailable).
3. The client formats the raw JSON into Python dictionaries/lists for the UI to consume.

### Interactive Navigation
The app uses **URL Query Parameters** to pass state between pages:
- **Dashboard → Directory**: When clicking a profile card, we append `?search=UserName` to the URL. The Directory page reads this parameter on load and filters the list automatically.
- **Directory → Profile**: Clicking "View Profile" appends `?id=EmployeeID` to the URL. The Profile page uses this ID to fetch that specific user's hardware and issues.

## 3. Styling & User Experience

### Custom CSS Injection
Since Streamlit has limited native styling, we use the `apply_custom_styles()` function from `utils/styles.py`. This function:
- Imports custom Google Fonts (**Inter** and **Outfit**).
- Overrides Streamlit's default theme with a premium Dark Mode.
- Implements custom HTML/CSS for "Cards," "Badges," and "Profile Avatars" to match a React-like premium aesthetic.

### Responsive Layout
The app uses `st.columns` to create a responsive grid. 
- On larger screens: Displays 3-4 cards per row.
- On smaller screens: Streamlit automatically stacks these columns for a mobile-friendly view.

## 4. How to Extend
- **To add a new page**: Simply create a new `.py` file in the `pages/` folder.
- **To change colors**: Update the `--primary` or `--bg-canvas` variables in `utils/styles.py`.
- **To connect real data**: Update the `base_url` and `app_id` in `utils/api.py`.
