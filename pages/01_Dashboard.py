import streamlit as st
from utils.styles import apply_custom_styles
from utils.api import get_api_client

# Apply custom styling (needed for each page in Streamlit)
apply_custom_styles()

def show_dashboard():
    api = get_api_client()
    
    st.title("Dashboard")
    st.markdown("<p style='color: #64748b; margin-top: -1rem;'>Overview of your organization's IT data</p>", unsafe_allow_html=True)
    
    # Load data
    employees = api.get_employees()
    issues = api.get_issues()
    hardware = api.get_hardware()
    
    # Process stats
    open_issues = [i for i in issues if i['status'] in ['open', 'in_progress']]
    active_hw = [h for h in hardware if h['status'] == 'active']
    departments = list(set([e['department'] for e in employees if e.get('department')]))
    
    # Main stats row
    st.markdown("### Key Metrics")
    cols = st.columns(4)
    
    metrics = [
        {"label": "Total Employees", "value": len(employees), "subtitle": f"{len([e for e in employees if e['status']=='active'])} active", "badge": "badge-indigo"},
        {"label": "Open Issues", "value": len(open_issues), "subtitle": f"{len(issues)} total", "badge": "badge-rose"},
        {"label": "Active Devices", "value": len(active_hw), "subtitle": f"{len(hardware)} total", "badge": "badge-cyan"},
        {"label": "Departments", "value": len(departments), "subtitle": "Organization-wide", "badge": "badge-amber"},
    ]
    
    for i, m in enumerate(metrics):
        with cols[i]:
            st.markdown(f"""
                <div class='stCard stat-card'>
                    <div class='metric-label'>{m['label']}</div>
                    <div class='metric-value'>{m['value']}</div>
                    <div class='stat-badge {m['badge']}'>{m['subtitle']}</div>
                </div>
            """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # Source Breakdown
    st.markdown("### Data Sources")
    src_cols = st.columns(4)
    sources = [
        {"id": "servicenow", "label": "ServiceNow", "color": "#10b981"},
        {"id": "neon_db", "label": "Neon DB", "color": "#06b6d4"},
        {"id": "both", "label": "Both Sources", "color": "#8b5cf6"},
        {"id": "manual", "label": "Manual", "color": "#94a3b8"},
    ]
    
    for i, src in enumerate(sources):
        count = len([e for e in employees if e.get('source') == src['id']])
        with src_cols[i]:
            st.markdown(f"""
                <div class='stCard' style='display: flex; align-items: center; gap: 12px; padding: 1rem !important;'>
                    <div style='width: 10px; height: 10px; border-radius: 50%; background: {src['color']}; flex-shrink: 0;'></div>
                    <div>
                        <div style='font-size: 0.875rem; font-weight: 600; color: var(--text-main);'>{src['label']}</div>
                        <div style='font-size: 0.875rem; color: var(--text-muted);'>{count} profiles</div>
                    </div>
                </div>
            """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)

    # Recent Profiles
    st.markdown("### Recent Profiles")
    recent_employees = employees[:6]
    
    grid_cols = st.columns(3)
    for i, emp in enumerate(recent_employees):
        col_idx = i % 3
        with grid_cols[col_idx]:
            initials = "".join([n[0] for n in emp['full_name'].split()]).upper()[:2]
            # Create a clickable link that navigates to Directory with search param
            # Note: Using target='_self' to stay in the same tab
            search_name = emp['full_name'].replace(" ", "%20")
            st.markdown(f"""
                <a href='/Directory?search={search_name}' target='_self' style='text-decoration: none;'>
                    <div class='stCard' style='margin-bottom: 1rem;'>
                        <div style='display: flex; gap: 1rem; align-items: start;'>
                            <img src='{emp['profile_picture_url']}' class='profile-avatar' style='width: 56px; height: 56px;'>
                            <div style='flex: 1; min-width: 0;'>
                                <div style='font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'>{emp['full_name']}</div>
                                <div style='font-size: 0.875rem; color: #94a3b8;'>{emp['job_title']}</div>
                                <div style='font-size: 0.75rem; color: #64748b; margin-top: 4px;'>{emp['department']}</div>
                            </div>
                        </div>
                    </div>
                </a>
            """, unsafe_allow_html=True)

if __name__ == "__main__":
    show_dashboard()
