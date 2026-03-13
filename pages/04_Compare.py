import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client

# Apply custom styling
apply_custom_styles()

def show_compare():
    api = get_api_client()
    st.title("Compare Profiles")
    st.markdown("<p style='color: #64748b; margin-top: -1rem;'>Compare data between two employees side by side</p>", unsafe_allow_html=True)
    
    # Load data
    employees = api.get_employees()
    employee_names = {e["id"]: e["full_name"] for e in employees}
    
    # Selectors
    col1, col2 = st.columns(2)
    with col1:
        emp_a_id = st.selectbox("Select first employee", options=[None] + list(employee_names.keys()), 
                                format_func=lambda x: employee_names.get(x, "Select..."))
    with col2:
        emp_b_id = st.selectbox("Select second employee", options=[None] + list(employee_names.keys()),
                                format_func=lambda x: employee_names.get(x, "Select..."))

    if not emp_a_id or not emp_b_id:
        st.info("Select two employees from the dropdowns above to compare them.")
        return

    # Load details
    a = next(e for e in employees if e["id"] == emp_a_id)
    b = next(e for e in employees if e["id"] == emp_b_id)
    
    hw_a = api.get_hardware(emp_a_id)
    hw_b = api.get_hardware(emp_b_id)
    
    iss_a = api.get_issues(emp_a_id)
    iss_b = api.get_issues(emp_b_id)

    # Profile Cards Row
    c1, c2 = st.columns(2)
    for i, emp in enumerate([a, b]):
        with [c1, c2][i]:
            st.markdown(f"""
                <div class='stCard'>
                    <div style='display: flex; gap: 1rem; align-items: center;'>
                        <img src='{emp['profile_picture_url']}' class='profile-avatar' style='width: 48px; height: 48px;'>
                        <div style='flex: 1; min-width: 0;'>
                            <div style='font-weight: 700; color: #0f172a;'>{emp['full_name']}</div>
                            <div style='font-size: 0.875rem; color: #64748b;'>{emp['job_title']}</div>
                        </div>
                    </div>
                </div>
            """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # Comparison Table
    st.markdown("### Profile Comparison")
    
    fields = [
        ("Email", "email"),
        ("Department", "department"),
        ("Job Title", "job_title"),
        ("Location", "location"),
        ("Employee ID", "employee_id"),
        ("Status", "status"),
        ("Source", "source"),
    ]
    
    # Header
    cols = st.columns([1, 1, 1])
    cols[0].markdown("**Field**")
    cols[1].markdown(f"**{a['full_name']}**")
    cols[2].markdown(f"**{b['full_name']}**")
    st.markdown("---")
    
    for label, key in fields:
        val_a = a.get(key, "—")
        val_b = b.get(key, "—")
        match = val_a == val_b
        
        c1, c2, c3 = st.columns([1, 1, 1])
        c1.markdown(f"<span style='color: #64748b; font-size: 0.875rem; font-weight: 500;'>{label}</span>", unsafe_allow_html=True)
        c2.markdown(f"<span style='color: {'#64748b' if match else '#0f172a'}; font-weight: {'400' if match else '600'}; font-size: 0.875rem;'>{val_a}</span>", unsafe_allow_html=True)
        c3.markdown(f"<span style='color: {'#64748b' if match else '#0f172a'}; font-weight: {'400' if match else '600'}; font-size: 0.875rem;'>{val_b}</span>", unsafe_allow_html=True)
        st.markdown("<div style='border-bottom: 1px solid #f1f5f9; margin: 8px 0;'></div>", unsafe_allow_html=True)

    # Activity Metrics
    metrics = [
        ("Active Devices", len([h for h in hw_a if h['status']=='active']), len([h for h in hw_b if h['status']=='active'])),
        ("Open Issues", len([i for i in iss_a if i['status']!='resolved']), len([i for i in iss_b if i['status']!='resolved'])),
        ("Total Issues", len(iss_a), len(iss_b)),
    ]
    
    for label, val_a, val_b in metrics:
        match = val_a == val_b
        c1, c2, c3 = st.columns([1, 1, 1])
        c1.markdown(f"<span style='color: #64748b; font-size: 0.875rem; font-weight: 500;'>{label}</span>", unsafe_allow_html=True)
        c2.markdown(f"<span style='color: {'#64748b' if match else '#0f172a'}; font-weight: {'400' if match else '600'}; font-size: 0.875rem;'>{val_a}</span>", unsafe_allow_html=True)
        c3.markdown(f"<span style='color: {'#64748b' if match else '#0f172a'}; font-weight: {'400' if match else '600'}; font-size: 0.875rem;'>{val_b}</span>", unsafe_allow_html=True)
        st.markdown("<div style='border-bottom: 1px solid #f1f5f9; margin: 8px 0;'></div>", unsafe_allow_html=True)

if __name__ == "__main__":
    show_compare()
