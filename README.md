**Venomous Sync Pulse Pro - Streamlit Edition**

## About
This project has been rewritten from a React application into a premium, high-performance **Python Streamlit** application. It provides a centralized dashboard for managing IT entities like employees, hardware, and issues.

## 🚀 Getting Started

### Prerequisites
1. **Python 3.8+**
2. Clone the repository
3. Create a virtual environment: `python -m venv .venv`
4. Activate the environment and install dependencies:
   ```bash
   pip install streamlit requests
   ```

### Running the App
Launch the application locally:
```bash
streamlit run streamlit_app.py
```

## 📖 Documentation
Detailed records of the development process and technical guides can be found in the [docs/](./docs/README.md) directory:

- [**Initial Rewrite Walkthrough**](./docs/01_streamlit_rewrite.md)
- [**Navigation & Data Architecture**](./docs/02_navigation_and_data.md)
- [**UI & Premium Styling**](./docs/03_ui_and_styling.md)
- [**Dashboard Refinement**](./docs/04_dashboard_refinement.md)
- [**Data Source & API Guide**](./docs/05_data_source_guide.md)

## Project Structure
- `streamlit_app.py`: Main entry & Navigation
- `pages/`: Individual application modules
- `utils/`: Shared utilities (API Client, CSS Styles)
- `docs/`: Technical documentation and walkthroughs

---
*Created by Antigravity*
