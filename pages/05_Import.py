import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client
import time

# Apply custom styling
apply_custom_styles()

def show_import():
    st.title("Import Data")
    st.markdown("<p style='color: #64748b; margin-top: -1rem;'>Upload CSV or Excel files exported from ServiceNow or Neon DB</p>", unsafe_allow_html=True)
    
    # Import Type Selector
    types = [
        {"id": "employees", "label": "Employees", "desc": "profiles from CSV/Excel", "icon": "👥"},
        {"id": "hardware", "label": "Hardware", "desc": "asset assignments", "icon": "💻"},
        {"id": "issues", "label": "Issues", "desc": "incident/issue tickets", "icon": "⚠️"},
    ]
    
    selected_type = st.radio("Select data type to import", options=[t["id"] for t in types], 
                             format_func=lambda x: next(t["label"] for t in types if t["id"] == x),
                             horizontal=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Upload Area
    with st.container():
        st.markdown("<div class='filter-container' style='text-align: center; border-style: dashed; padding: 3rem;'>", unsafe_allow_html=True)
        uploaded_file = st.file_uploader(f"Drop your {selected_type} file here", type=["csv", "xlsx", "xls", "json"])
        
        if uploaded_file is not None:
            if st.button("Start Import"):
                with st.spinner("Processing file and extracting data..."):
                    # Simulation of extraction and bulk create
                    time.sleep(2)
                    st.success(f"Successfully imported {selected_type} from {uploaded_file.name}!")
                    st.balloons()
        
        st.markdown("</div>", unsafe_allow_html=True)

    # Tips
    st.markdown("### Tips for importing")
    with st.expander("Show guidelines", expanded=True):
        st.markdown("""
            - **ServiceNow**: Export as CSV using list views or reports.
            - **Neon DB**: Export query results as CSV or JSON.
            - **Tracking**: Set the `source` column to `servicenow` or `neon_db` to track data origin.
            - **Linking**: For hardware/issues, use the employee's ID in the `employee_id` column.
        """)

if __name__ == "__main__":
    show_import()
