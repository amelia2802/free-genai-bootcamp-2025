import streamlit as st
import requests
import json

API_URL = "http://localhost:8080/api/vocabularies"

st.title("Vocabulary Generator")

# Generate vocabulary using LLM
if st.button("Generate Vocabulary"):
    try:
        response = requests.get(f"{API_URL}/generate")
        response.raise_for_status()
        vocabularies = response.json()
        st.write(vocabularies)
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")

# Export vocabulary to JSON
if st.button("Export to JSON"):
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        vocabularies = response.json()
        with open("vocabularies.json", "w") as f:
            json.dump(vocabularies, f)
        st.write("Exported to vocabularies.json")
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")

# Import vocabulary from JSON
uploaded_file = st.file_uploader("Choose a JSON file")
if uploaded_file is not None:
    try:
        vocabularies = json.load(uploaded_file)
        response = requests.post(f"{API_URL}/import", json=vocabularies)
        response.raise_for_status()
        st.write("Imported successfully")
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")
    except json.JSONDecodeError as e:
        st.error(f"Error decoding JSON: {e}")