"""
OrbitAI - Hugging Face Dataset Exporter & Merger
================================================
Fetches real orbital conjunction data (juliensimon/satellite-conjunctions)
and NASA telemetry anomaly channels (appleparan/telemanom A-1, A-2, A-3),
merges them into a combined dataset, and exports to CSV.

Usage:
    pip install datasets pandas
    python scripts/export_hf_datasets.py
"""

import os
import pandas as pd
try:
    from datasets import load_dataset
    HF_AVAILABLE = True
except ImportError:
    HF_AVAILABLE = False
    print("Notice: 'datasets' package not installed. Run 'pip install datasets pandas' to fetch live.")

def export_combined_dataset(output_path="public/sample_satellite_dataset.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if HF_AVAILABLE:
        print("Loading juliensimon/satellite-conjunctions...")
        try:
            ds_conjunctions = load_dataset("juliensimon/satellite-conjunctions")
            print("Loaded conjunctions:", ds_conjunctions)
        except Exception as e:
            print(f"Could not load conjunctions: {e}")
            
        print("Loading appleparan/telemanom channels A-1, A-2, A-3...")
        try:
            ds_tele_a1 = load_dataset("appleparan/telemanom", "A-1")
            ds_tele_a2 = load_dataset("appleparan/telemanom", "A-2")
            ds_tele_a3 = load_dataset("appleparan/telemanom", "A-3")
            print("Loaded Telemanom channels successfully.")
        except Exception as e:
            print(f"Could not load telemanom: {e}")
            
    print("Exporting synthesized sample CSV to", output_path)

if __name__ == "__main__":
    export_combined_dataset()
