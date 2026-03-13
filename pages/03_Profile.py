import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client
from datetime import datetime

# Apply custom styling
apply_custom_styles()

def show_profile():
    api = get_api_client()
    
    # Get employee ID from query params
    query_params = st.query_params
    employee_id = query_params.get("id")
    
    if not employee_id:
        st.warning("No employee selected.")
        st.info("Please go to the Directory to select an employee.")
        if st.button("Go to Directory"):
            st.switch_page("pages/02_Directory.py")
        return

    # Load data
    employees = api.get_employees()
    employee = next((e for e in employees if e["id"] == employee_id), None)
    
    if not employee:
        st.error(f"Employee with ID {employee_id} not found.")
        return

    hardware = api.get_hardware(employee_id)
    issues = api.get_issues(employee_id)

    # Back button
    if st.button("← Back to Directory"):
        st.switch_page("pages/02_Directory.py")

    # Header
    st.markdown(f"""
        <div style='background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); height: 120px; border-radius: 1rem 1rem 0 0; margin-bottom: -50px;'></div>
        <div style='padding: 0 2rem; display: flex; align-items: end; gap: 1.5rem; margin-bottom: 2rem;'>
            <img src='{employee['profile_picture_url']}' style='width: 100px; height: 100px; border-radius: 1.25rem; border: 4px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); background: white;'>
            <div style='padding-bottom: 10px;'>
                <h1 style='margin: 0; font-size: 2rem;'>{employee['full_name']}</h1>
                <p style='margin: 0; color: #64748b;'>{employee['job_title']} · {employee['department']}</p>
            </div>
        </div>
    """, unsafe_allow_html=True)

    # Quick Stats Row
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown(f"""
            <div class='stCard' style='text-align: center; padding: 1rem;'>
                <div style='font-size: 1.5rem; font-weight: 700;'>{len([h for h in hardware if h['status']=='active'])}</div>
                <div style='font-size: 0.75rem; color: #64748b;'>Active Devices</div>
            </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown(f"""
            <div class='stCard' style='text-align: center; padding: 1rem;'>
                <div style='font-size: 1.5rem; font-weight: 700;'>{len([i for i in issues if i['status']!='resolved'])}</div>
                <div style='font-size: 0.75rem; color: #64748b;'>Open Issues</div>
            </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown(f"""
            <div class='stCard' style='text-align: center; padding: 1rem;'>
                <div style='font-size: 1.5rem; font-weight: 700;'>{len(issues)}</div>
                <div style='font-size: 0.75rem; color: #64748b;'>Total Issues</div>
            </div>
        """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # Tabs for Details, Hardware, Issues
    tab_details, tab_hardware, tab_issues = st.tabs(["Details", f"Hardware ({len(hardware)})", f"Issues ({len(issues)})"])
    
    with tab_details:
        details = [
            ("Email", employee.get('email')),
            ("Department", employee.get('department')),
            ("Job Title", employee.get('job_title')),
            ("Location", employee.get('location')),
            ("Employee ID", employee.get('employee_id')),
            ("Source", employee.get('source', 'manual').replace('_', ' ').title()),
        ]
        
        details_list = ["<div class='stCard'>", "<h3>Contact & General Information</h3>"]
        for label, value in details:
            if value:
                details_list.append(
                    f"<div style='display: flex; border-bottom: 1px solid var(--border-color); padding: 12px 0;'>"
                    f"<div style='width: 140px; color: var(--text-muted); font-size: 0.875rem;'>{label}</div>"
                    f"<div style='font-weight: 500; color: white;'>{value}</div>"
                    f"</div>"
                )
        details_list.append("</div>")
        
        st.markdown("".join(details_list), unsafe_allow_html=True)


    with tab_hardware:
        if not hardware:
            st.info("No hardware assignments found.")
        for hw in hardware:
            st.markdown(f"""
                <div class='stCard' style='margin-bottom: 1rem;'>
                    <div style='display: flex; justify-content: space-between; align-items: center;'>
                        <div>
                            <div style='font-weight: 700;'>{hw['device_name']}</div>
                            <div style='font-size: 0.75rem; color: #64748b;'>SN: {hw['serial_number']} · Assigned: {hw['assigned_date']}</div>
                        </div>
                        <div class='stat-badge {"badge-emerald" if hw["status"]=="active" else "badge-amber"}'>{hw['status'].title()}</div>
                    </div>
                </div>
            """, unsafe_allow_html=True)

    with tab_issues:
        if not issues:
            st.info("No issues recorded.")
        for issue in issues:
            priority_color = {"high": "badge-rose", "medium": "badge-amber", "low": "badge-indigo"}.get(issue['priority'], "badge-indigo")
            st.markdown(f"""
                <div class='stCard' style='margin-bottom: 1rem;'>
                    <div style='display: flex; justify-content: space-between; align-items: start;'>
                        <div>
                            <div style='font-weight: 700;'>{issue['title']}</div>
                            <div style='font-size: 0.75rem; color: #64748b;'>Category: {issue['category']} · Created: {issue['created_date']}</div>
                        </div>
                        <div style='display: flex; flex-direction: column; align-items: end; gap: 4px;'>
                            <div class='stat-badge {priority_color}'>{issue['priority'].upper()}</div>
                            <div style='font-size: 10px; color: #94a3b8;'>{issue['status'].replace('_', ' ').title()}</div>
                        </div>
                    </div>
                </div>
            """, unsafe_allow_html=True)

if __name__ == "__main__":
    show_profile()
