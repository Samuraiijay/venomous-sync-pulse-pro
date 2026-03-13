import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client

# Page configuration
st.set_page_config(
    page_title="Venomous Sync Pulse Pro",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Apply custom styling
apply_custom_styles()

def show_home():
    """Home / Landing Page content"""
    st.title("Welcome to Venom Pulse Pro")
    st.markdown("""
        ### IT Data Management simplified.
        
        Select a module from the sidebar to get started:
        - **Dashboard**: Overview of your organization's IT health.
        - **Directory**: View and search employee profiles.
        - **Compare**: Compare data between two employees.
        - **Import**: Ingest data from external sources.
    """)
    
    # Quick Stats in the landing page
    api = get_api_client()
    employees = api.get_employees()
    hardware = api.get_hardware()
    issues = api.get_issues()
    
    cols = st.columns(3)
    with cols[0]:
        st.markdown(f"""
            <div class='stCard stat-card'>
                <div class='metric-label'>Total Employees</div>
                <div class='metric-value'>{len(employees)}</div>
                <div class='stat-badge badge-indigo'>Ready</div>
            </div>
        """, unsafe_allow_html=True)
    with cols[1]:
        st.markdown(f"""
            <div class='stCard stat-card'>
                <div class='metric-label'>Hardware Assets</div>
                <div class='metric-value'>{len(hardware)}</div>
                <div class='stat-badge badge-cyan'>Mapped</div>
            </div>
        """, unsafe_allow_html=True)
    with cols[2]:
        st.markdown(f"""
            <div class='stCard stat-card'>
                <div class='metric-label'>Open Issues</div>
                <div class='metric-value'>{len([i for i in issues if i['status'] != 'resolved'])}</div>
                <div class='stat-badge badge-rose'>Attention</div>
            </div>
        """, unsafe_allow_html=True)

# Define the pages
pages = [
    st.Page(show_home, title="Home", icon="🏠", default=True),
    st.Page("pages/01_Dashboard.py", title="Dashboard", icon="📊"),
    st.Page("pages/02_Directory.py", title="Directory", icon="👥"),
    st.Page("pages/03_Profile.py", title="Profile", icon="👤"),
    st.Page("pages/04_Compare.py", title="Compare", icon="🔄"),
    st.Page("pages/05_Import.py", title="Import", icon="📥"),
]

# Initialize navigation
pg = st.navigation(pages)

# Sidebar Logo/Title
st.sidebar.markdown("""
    <div style='display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;'>
        <div style='background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;'>
            V
        </div>
        <h2 style='margin: 0; font-size: 1.25rem;'>Pulse Pro</h2>
    </div>
""", unsafe_allow_html=True)

st.sidebar.markdown("---")

# Run the selected page
pg.run()

