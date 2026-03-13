# ⚡ Venomous Sync Pulse Pro - Streamlit Edition

A premium, high-performance IT Data Management platform built with **Python** and **Streamlit**. This application centralizes data from across your organization, providing a unified view of employees, hardware assets, and issue tracking.

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.8+**
- Git

### Installation
1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd venomous-sync-pulse-pro
   ```

2. **Setup Virtual Environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install streamlit requests
   ```

### Running the Platform
Launch the development server:
```bash
streamlit run streamlit_app.py
```

---

## 🛠 Configuration

The application uses environment variables for secure configuration. Create a `.env` file in the root directory:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_BASE44_APP_ID` | Base44 Application ID | `cbef744a8545c389ef439ea6` |
| `VITE_BASE44_APP_BASE_URL` | API Endpoint URL | `https://api.base44.app` |
| `ACCESS_TOKEN` | Bearer Token for API Auth | `hidden_token_value` |

---

## 🏗 Architecture & Features

### Core Components
- **Dashboard**: High-level metrics with real-time data source attribution (ServiceNow, Neon DB).
- **Directory**: Advanced employee search with multi-dimensional filtering.
- **Profile Engine**: Detailed telemetry for employees, including hardware history and issue logs.
- **Comparison Tool**: Side-by-side data diffing to identify organizational discrepancies.

### Tech Stack
- **Frontend/Logic**: [Streamlit](https://streamlit.io/)
- **Data Layer**: Custom `Base44Client` with caching and normalization.
- **Styling**: Premium Glassmorphism UI tokens in `utils/styles.py`.

---

## 📖 Detailed Documentation

For deep-dives into the development process and technical guides, visit the [docs/](./docs/README.md) directory:

- [**IT Management Rewrite**](./docs/01_streamlit_rewrite.md) - The journey from React to Streamlit.
- [**Navigation & Data Architecture**](./docs/02_navigation_and_data.md) - Sidebar logic and data decoupling.
- [**UI & Premium Styling**](./docs/03_ui_and_styling.md) - Dark-mode aesthetic and CSS architecture.
- [**Data Source & API Guide**](./docs/05_data_source_guide.md) - How to connect to live organizaion data.

---
*Developed by Antigravity*
