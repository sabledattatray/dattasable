import sys
import os
import argparse
import io
from forge_engine import ForgeEngine
from visual_exporter import VisualExporter
from neural_summary import NeuralSummary

# Force UTF-8 Encoding for Windows Compatibility
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def run_surgical_session(file_path, custom_query=None, regen=False, output_dir=None):
    if not os.path.exists(file_path):
        print(f"[!] Error: File {file_path} not found.")
        return

    # Determine DB Path (Use same name as file but with .db)
    db_path = f"{os.path.splitext(file_path)[0]}.db"
    engine = ForgeEngine(db_path=db_path)
    exporter = VisualExporter(output_dir=output_dir) if output_dir else VisualExporter()
    neural = NeuralSummary()

    # Check if table already exists in persistent DB
    try:
        engine.con.execute("SELECT 1 FROM data LIMIT 1")
        print(f"[*] Persistent Session Found: {db_path}")
    except:
        print(f"[*] Initializing New Session: {db_path}")
        engine.upload_data(file_path)

    # --- PERFORMANCE OPTIMIZATION: INQUIRY-ONLY MODE ---
    if custom_query:
        print(f"[*] Executing Targeted Surgical Inquiry: {custom_query}")
        insights = {'kpis': {}, 'visuals': [], 'custom': None}
        try:
            insights['custom'] = engine.run_surgical_query(custom_query)
            # Add basic KPIs for context without full scan
            insights['kpis']['TOTAL RECORDS'] = engine.con.execute("SELECT COUNT(*) FROM data").fetchone()[0]
        except Exception as e:
            print(f"[!] SQL Error: {e}")
    else:
        print(f"[*] Running Full Surgical Audit {'(Regenerating...)' if regen else ''}...")
        insights = engine.auto_analyze(regen=regen)
        print("[*] Generating Neural Summary...")
        insights['summary'] = neural.generate_summary(insights)

    print("[*] Forging Adaptive Visual Dashboard...")
    project_name = os.path.splitext(os.path.basename(file_path))[0]
    dashboard_path = exporter.create_dashboard(insights, project_name=project_name)

    print("-" * 50)
    print("SUCCESS: MISSION COMPLETE")
    print(f"Insights forged: {len(insights['visuals'])} Visuals")
    print(f"Dashboard Ready: {dashboard_path}")
    print("-" * 50)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Surgical Analytics Forge")
    parser.add_argument("file", help="Path to your data file (CSV/Excel)")
    parser.add_argument("-q", "--query", help="Custom SQL query", default=None)
    parser.add_argument("-r", "--regen", help="Regenerate with different visuals", action="store_true")
    parser.add_argument("--web", help="Web mode activation", action="store_true")
    parser.add_argument("--output_dir", help="Custom output directory for dashboards", default=None)
    
    args = parser.parse_args()
    run_surgical_session(args.file, args.query, args.regen, args.output_dir)
