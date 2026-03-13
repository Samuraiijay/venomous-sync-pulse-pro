import streamlit as st

def apply_custom_styles():
    st.markdown("""
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700&display=swap');

        :root {
            --primary: #818cf8; /* Lighter indigo for dark bg */
            --primary-hover: #a5b4fc;
            --bg-canvas: #0f172a; /* Deep slate dark background */
            --card-bg: #1e293b; /* Slightly lighter slate for cards */
            --border-color: rgba(255, 255, 255, 0.1);
            --text-main: #ffffff;
            --text-muted: #94a3b8;
        }

        .main {
            background-color: var(--bg-canvas) !important;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Outfit', sans-serif !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            letter-spacing: -0.02em !important;
        }

        p, span, div, li, label {
            font-family: 'Inter', sans-serif !important;
            color: #ffffff !important; /* White text as requested */
            line-height: 1.6 !important;
        }

        .stCard {
            background: var(--card-bg) !important;
            border-radius: 1rem !important;
            border: 1px solid var(--border-color) !important;
            padding: 1.5rem !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
            transition: all 0.2s ease-in-out !important;
        }

        .stCard:hover {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transform: translateY(-2px);
        }

        .stat-card {
            border-left: 4px solid var(--primary) !important;
        }

        .metric-label {
            color: var(--text-muted) !important;
            font-size: 0.875rem !important;
            font-weight: 500 !important;
        }

        .metric-value {
            color: var(--text-main) !important;
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            margin-top: 0.25rem !important;
        }

        .stat-badge {
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            padding: 0.2rem 0.6rem !important;
            border-radius: 6px !important;
            display: inline-flex !important;
            align-items: center !important;
            letter-spacing: 0.02em !important;
            text-transform: uppercase !important;
        }

        .badge-indigo { 
            background: rgba(129, 140, 248, 0.1) !important; 
            color: #818cf8 !important; 
            border: 1px solid rgba(129, 140, 248, 0.2) !important;
        }
        .badge-rose { 
            background: rgba(251, 113, 133, 0.1) !important; 
            color: #fb7185 !important; 
            border: 1px solid rgba(251, 113, 133, 0.2) !important;
        }
        .badge-cyan { 
            background: rgba(34, 211, 238, 0.1) !important; 
            color: #22d3ee !important; 
            border: 1px solid rgba(34, 211, 238, 0.2) !important;
        }
        .badge-amber { 
            background: rgba(251, 191, 36, 0.1) !important; 
            color: #fbbf24 !important; 
            border: 1px solid rgba(251, 191, 36, 0.2) !important;
        }
        .badge-emerald { 
            background: rgba(52, 211, 153, 0.1) !important; 
            color: #34d399 !important; 
            border: 1px solid rgba(52, 211, 153, 0.2) !important;
        }

        /* Custom Sidebar Styling */
        [data-testid="stSidebar"] {
            background-color: #0f172a !important; /* Match dark theme */
            border-right: 1px solid var(--border-color);
        }

        /* Sidebar Navigation Text */
        [data-testid="stSidebarNav"] span,
        [data-testid="stSidebarNav"] p {
            color: #ffffff !important; /* White text */
            font-weight: 500 !important;
        }

        /* Hover state */
        [data-testid="stSidebarNav"] a:hover span,
        [data-testid="stSidebarNav"] a:hover p {
            color: #818cf8 !important; /* Indigo light */
        }

        /* Active page */
        [data-testid="stSidebarNav"] [aria-current="page"] span,
        [data-testid="stSidebarNav"] [aria-current="page"] p {
            color: #818cf8 !important;
            font-weight: 700 !important;
        }
        .profile-avatar {
            width: 80px !important;
            height: 80px !important;
            border-radius: 1rem !important;
            object-fit: cover !important;
            border: 3px solid white !important;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
        }

        /* Glassmorphism effect for filters */
        .filter-container {
            background: rgba(30, 41, 59, 0.7) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 1rem !important;
            padding: 1.25rem !important;
            border: 1px solid var(--border-color) !important;
            margin-bottom: 2rem !important;
        }

        /* Custom Tabs */
        .stTabs [data-baseweb="tab-list"] {
            gap: 0.5rem;
            background-color: transparent;
            margin-bottom: 1rem;
        }

        .stTabs [data-baseweb="tab"] {
            height: 40px !important;
            padding: 0 1.25rem !important;
            background-color: var(--card-bg) !important;
            border-radius: 0.75rem !important;
            border: 1px solid var(--border-color) !important;
            color: var(--text-muted) !important;
            font-weight: 500 !important;
            transition: all 0.2s ease !important;
        }

        .stTabs [data-baseweb="tab"]:hover {
            border-color: var(--primary);
            color: white;
        }

        .stTabs [aria-selected="true"] {
            background-color: var(--primary) !important;
            color: #000000 !important;
            border-color: var(--primary) !important;
            font-weight: 700 !important;
        }

        /* Custom Button Styling */
        .stButton button {
            color: #000000 !important; /* Changes the text color */
            background-color: var(--primary) !important;
            border: none !important;
            border-radius: 0.75rem !important;
            font-weight: 600 !important;
            transition: all 0.2s ease !important;
        }
        /* Hover state for buttons */
        .stButton button:hover {
            background-color: var(--primary-hover) !important;
            color: #000000 !important;
            transform: scale(1.02);
        }
        </style>
    """, unsafe_allow_html=True)
