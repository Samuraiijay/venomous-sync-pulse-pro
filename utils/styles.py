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
            background: var(--card-bg);
            border-radius: 1rem;
            border: 1px solid var(--border-color);
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            transition: all 0.2s ease-in-out;
        }

        .stCard:hover {
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transform: translateY(-2px);
        }

        .stat-card {
            border-left: 4px solid var(--primary);
        }

        .metric-label {
            color: var(--text-muted);
            font-size: 0.875rem;
            font-weight: 500;
        }

        .metric-value {
            color: var(--text-main);
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 0.25rem;
        }

        .stat-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            margin-top: 0.5rem;
            display: inline-block;
        }

        .badge-indigo { background: #eef2ff; color: #4338ca; }
        .badge-rose { background: #fff1f2; color: #be123c; }
        .badge-cyan { background: #ecfeff; color: #0e7490; }
        .badge-amber { background: #fffbeb; color: #b45309; }
        .badge-emerald { background: #ecfdf5; color: #047857; }

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
            width: 80px;
            height: 80px;
            border-radius: 1rem;
            object-fit: cover;
            border: 3px solid white;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }

        /* Glassmorphism effect for filters */
        .filter-container {
            background: rgba(30, 41, 59, 0.7); /* Dark semi-transparent */
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 1.25rem;
            border: 1px solid var(--border-color);
            margin-bottom: 2rem;
        }

        /* Custom Tabs */
        .stTabs [data-baseweb="tab-list"] {
            gap: 1rem;
            background-color: transparent;
        }

        .stTabs [data-baseweb="tab"] {
            height: 40px;
            padding: 0 1.5rem;
            background-color: white;
            border-radius: 0.75rem;
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            font-weight: 500;
        }

        .stTabs [aria-selected="true"] {
            background-color: var(--text-main) !important;
            color: white !important;
            border-color: var(--text-main) !important;
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
