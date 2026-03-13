import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client

# Apply custom styling
apply_custom_styles()

def show_directory():
    api = get_api_client()
    st.title("Directory")
    
    # Check for search query parameter
    search_param = st.query_params.get("search", "")
    
    # Load data
    employees = api.get_employees()
    st.markdown(f"<p style='color: #64748b; margin-top: -1rem;'>{len(employees)} total employees</p>", unsafe_allow_html=True)
    
    # Search and Filters
    with st.container():
        st.markdown("<div class='filter-container'>", unsafe_allow_html=True)
        col1, col2, col3, col4 = st.columns([2, 1, 1, 1])
        
        with col1:
            search = st.text_input("Search", value=search_param, placeholder="Name, email, or ID...", label_visibility="collapsed")
        
        departments = sorted(list(set([e['department'] for e in employees if e.get('department')])))
        with col2:
            dept_filter = st.selectbox("Department", ["All Departments"] + departments, label_visibility="collapsed")
            
        with col3:
            source_filter = st.selectbox("Source", ["All Sources", "ServiceNow", "Neon DB", "Both", "Manual"], label_visibility="collapsed")
            
        with col4:
            status_filter = st.selectbox("Status", ["All Status", "Active", "Inactive", "On Leave"], label_visibility="collapsed")
        
        st.markdown("</div>", unsafe_allow_html=True)

    # Filtering Logic
    filtered = employees
    if search:
        search = search.lower()
        filtered = [e for e in filtered if 
                    search in e['full_name'].lower() or 
                    search in e['email'].lower() or 
                    search in e.get('employee_id', '').lower() or
                    search in e.get('job_title', '').lower()]
    
    if dept_filter != "All Departments":
        filtered = [e for e in filtered if e.get('department') == dept_filter]
        
    if source_filter != "All Sources":
        src_map = {"ServiceNow": "servicenow", "Neon DB": "neon_db", "Both": "both", "Manual": "manual"}
        filtered = [e for e in filtered if e.get('source') == src_map[source_filter]]
        
    if status_filter != "All Status":
        status_map = {"Active": "active", "Inactive": "inactive", "On Leave": "on_leave"}
        filtered = [e for e in filtered if e.get('status') == status_map[status_filter]]

    # Results Header
    if len(filtered) != len(employees):
        st.markdown(f"<p style='color: #64748b; font-size: 0.875rem;'>Showing {len(filtered)} results</p>", unsafe_allow_html=True)

    # Grid Display
    if not filtered:
        st.info("No employees found matching your criteria.")
    else:
        grid_cols = st.columns(3)
        for i, emp in enumerate(filtered):
            with grid_cols[i % 3]:
                # Map status to badge class
                status_class = {
                    "active": "badge-emerald",
                    "inactive": "badge-rose",
                    "on_leave": "badge-amber"
                }.get(emp.get('status', '').lower(), "badge-indigo")
                
                st.markdown(f"""
                    <div class='stCard' style='margin-bottom: 1rem;'>
                        <div style='display: flex; gap: 1rem; align-items: start;'>
                            <img src='{emp['profile_picture_url']}' class='profile-avatar' style='width: 56px; height: 56px; margin-bottom: 0;'>
                            <div style='flex: 1; min-width: 0;'>
                                <div style='font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'>{emp['full_name']}</div>
                                <div style='font-size: 0.875rem; color: #94a3b8;'>{emp['job_title']}</div>
                                <div style='display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;'>
                                    <span class='stat-badge {status_class}' style='margin-top: 0;'>{emp.get('status', 'Unknown').title()}</span>
                                    <span class='stat-badge badge-indigo' style='margin-top: 0; opacity: 0.8;'>{emp['department']}</span>
                                </div>
                                <a href='/Profile?id={emp['id']}' target='_self' style='display: inline-block; margin-top: 12px; font-size: 12px; color: #818cf8; font-weight: 600; text-decoration: none;'>View Profile →</a>
                            </div>
                        </div>
                    </div>
                """, unsafe_allow_html=True)

if __name__ == "__main__":
    show_directory()
