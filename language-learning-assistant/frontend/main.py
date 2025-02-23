import sys
import os
import streamlit as st
from typing import Dict
import json
from collections import Counter
import re
import requests

from backend.get_transcript import YouTubeTranscriptDownloader
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


class OllamaChat:
    def __init__(self, model_id: str = "tinyllama", base_url: str = "http://localhost:11434"):
        """Initialize Ollama chat client"""
        self.base_url = base_url
        self.model_id = model_id
        self.api_endpoint = f"{self.base_url}/api/chat"

    def generate_response(self, message: str) -> str:
        """Generate a response using Ollama"""
        try:
            payload = {
                "model": self.model_id,
                "messages": [{"role": "user", "content": message}],
                "stream": False
            }

            response = requests.post(self.api_endpoint, json=payload)
            response.raise_for_status()
            
            data = response.json()
            return data['message']['content']
            
        except Exception as e:
            st.error(f"Error generating response: {str(e)}")
            return None


# Page config
st.set_page_config(
    page_title="Bangla(IN) Learning Assistant",
    page_icon="✒️",
    layout="wide"
)

# Initialize session state
if 'transcript' not in st.session_state:
    st.session_state.transcript = None
if 'messages' not in st.session_state:
    st.session_state.messages = []

def render_header():
    """Render the header section"""
    st.title("✒️ Bangla Learning Assistant")
    st.markdown("""
    Transform YouTube transcripts into interactive Bangla(IN) learning experiences.
    
    This tool demonstrates:
    - Base LLM Capabilities using Ollama
    - RAG (Retrieval Augmented Generation)
    - Agent-based Learning Systems
    - Interactive Language Learning
    """)

def render_sidebar():
    """Render the sidebar with component selection"""
    with st.sidebar:
        st.header("Development Stages")
        
        selected_stage = st.radio(
            "Select Stage:",
            [
                "1. Chat with Ollama",
                "2. Raw Transcript",
                "3. Structured Data",
                "4. RAG Implementation",
                "5. Interactive Learning"
            ]
        )
        
        stage_info = {
            "1. Chat with Ollama": """
            **Current Focus:**
            - Basic Bangla learning
            - Understanding LLM capabilities
            - Identifying limitations
            """,
            
            "2. Raw Transcript": """
            **Current Focus:**
            - YouTube transcript download
            - Raw text visualization
            - Initial data examination
            """,
            
            "3. Structured Data": """
            **Current Focus:**
            - Text cleaning
            - Dialogue extraction
            - Data structuring
            """,
            
            "4. RAG Implementation": """
            **Current Focus:**
            - Text embeddings
            - Vector storage
            - Context retrieval
            """,
            
            "5. Interactive Learning": """
            **Current Focus:**
            - Scenario generation
            - Audio synthesis
            - Interactive practice
            """
        }
        
        st.markdown("---")
        st.markdown(stage_info[selected_stage])
        
        return selected_stage

def render_chat_stage():
    """Render an improved chat interface"""
    st.header("Chat with Ollama")

    # Initialize OllamaChat instance if not in session state
    if 'ollama_chat' not in st.session_state:
        st.session_state.ollama_chat = OllamaChat()

    # Introduction text
    st.markdown("""
    Start by exploring Ollama's Bangla(IN) language capabilities. Try asking questions about Bangla grammar, 
    vocabulary, or cultural aspects.
    """)

    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"], avatar="🧑‍💻" if message["role"] == "user" else "🤖"):
            st.markdown(message["content"])

    # Chat input area
    if prompt := st.chat_input("Ask about Bangla(IN) language..."):
        # Process the user input
        process_message(prompt)

    # Example questions in sidebar
    with st.sidebar:
        st.markdown("### Try These Examples")
        example_questions = [
            "How do I say 'Where is the train station?' in Bangla?",
            "Explain the difference between প্রতিশব্দ and জব্দ",
            "What's the polite form of স্বাগত?",
            "How do I count objects in Bangla?",
            "What's the difference between প্রশ্ন and উত্তর ?",
            "How do I ask for directions politely?"
        ]
        
        for q in example_questions:
            if st.button(q, use_container_width=True, type="secondary"):
                # Process the example question
                process_message(q)
                st.rerun()

    # Add a clear chat button
    if st.session_state.messages:
        if st.button("Clear Chat", type="primary"):
            st.session_state.messages = []
            st.rerun()

def process_message(message: str):
    """Process a message and generate a response"""
    # Add user message to state and display
    st.session_state.messages.append({"role": "user", "content": message})
    with st.chat_message("user", avatar="🧑‍💻"):
        st.markdown(message)

    # Generate and display assistant's response
    with st.chat_message("assistant", avatar="🤖"):
        response = st.session_state.ollama_chat.generate_response(message)
        if response:
            st.markdown(response)
            st.session_state.messages.append({"role": "assistant", "content": response})

def count_characters(transcript_data):
    """Count Bangla and total characters in transcript"""
    if not transcript_data:
        return 0, 0
        
    def is_Bangla(char):
        return '\u0980' <= char <= '\u09FF'  # Bangla
    
    # If transcript_data is a list of dicts, extract text
    if isinstance(transcript_data, list):
        text = ' '.join(entry['text'] for entry in transcript_data)
    else:
        text = str(transcript_data)
    
    bn_chars = sum(1 for char in text if is_Bangla(char))
    return bn_chars, len(text)

def format_transcript_for_display(transcript_data):
    """Format transcript data for display"""
    if not transcript_data:
        return ""
    if isinstance(transcript_data, list):
        return '\n'.join(entry['text'] for entry in transcript_data)
    return str(transcript_data)

def render_transcript_stage():
    """Render the raw transcript stage"""
    st.header("Raw Transcript Processing")
    
    # URL input
    url = st.text_input(
        "YouTube URL",
        placeholder="Enter a Bangla lesson YouTube URL"
    )
    
    # Download button and processing
    if url:
        if st.button("Download Transcript"):
            try:
                downloader = YouTubeTranscriptDownloader()
                transcript = downloader.get_transcript(url)
                if transcript:
                    st.session_state.transcript = transcript
                    st.success("Transcript downloaded successfully")
                else:
                    st.error("Could not download transcript. Please check the URL and try again.")
            except Exception as e:
                st.error(f"Error downloading transcript: {str(e)}")

    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Raw Transcript")
        if st.session_state.transcript:
            formatted_transcript = format_transcript_for_display(st.session_state.transcript)
            st.text_area(
                label="Raw text",
                value=formatted_transcript,
                height=400,
                disabled=True
            )
            
            # Add download button for formatted transcript
            if st.download_button(
                "Download Transcript",
                formatted_transcript,
                file_name="transcript.txt",
                mime="text/plain"
            ):
                st.success("Transcript downloaded!")
        else:
            st.info("No transcript loaded yet")
    
    with col2:
        st.subheader("Transcript Stats")
        if st.session_state.transcript:
            # Calculate stats
            bn_chars, total_chars = count_characters(st.session_state.transcript)
            formatted_transcript = format_transcript_for_display(st.session_state.transcript)
            total_lines = len(formatted_transcript.split('\n'))
            
            # Display stats
            st.metric("Total Characters", total_chars)
            st.metric("Bangla Characters", bn_chars)
            st.metric("Total Lines", total_lines)
            
            # Display additional transcript information
            if isinstance(st.session_state.transcript, list):
                total_duration = sum(float(entry.get('duration', 0)) for entry in st.session_state.transcript)
                st.metric("Total Duration (seconds)", f"{total_duration:.1f}")
        else:
            st.info("Load a transcript to see statistics")
def render_structured_stage():
    """Render the structured data stage"""
    st.header("Structured Data Processing")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Dialogue Extraction")
        st.info("Dialogue extraction will be implemented here")
        
    with col2:
        st.subheader("Data Structure")
        st.info("Structured data view will be implemented here")

def render_rag_stage():
    """Render the RAG implementation stage"""
    st.header("RAG System")
    
    # Query input
    query = st.text_input(
        "Test Query",
        placeholder="Enter a question about Bangla..."
    )
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Retrieved Context")
        st.info("Retrieved contexts will appear here")
        
    with col2:
        st.subheader("Generated Response")
        st.info("Generated response will appear here")

def render_interactive_stage():
    """Render the interactive learning stage"""
    st.header("Interactive Learning")
    
    # Practice type selection
    practice_type = st.selectbox(
        "Select Practice Type",
        ["Dialogue Practice", "Vocabulary Quiz", "Listening Exercise"]
    )
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("Practice Scenario")
        st.info("Practice scenario will appear here")
        
        # Placeholder for multiple choice
        options = ["Option 1", "Option 2", "Option 3", "Option 4"]
        selected = st.radio("Choose your answer:", options)
        
    with col2:
        st.subheader("Audio")
        st.info("Audio will appear here")
        
        st.subheader("Feedback")
        st.info("Feedback will appear here")

def main():
    render_header()
    selected_stage = render_sidebar()
    
    # Render appropriate stage
    if selected_stage == "1. Chat with Ollama":
        render_chat_stage()
    elif selected_stage == "2. Raw Transcript":
        render_transcript_stage()
    elif selected_stage == "3. Structured Data":
        render_structured_stage()
    elif selected_stage == "4. RAG Implementation":
        render_rag_stage()
    elif selected_stage == "5. Interactive Learning":
        render_interactive_stage()
    
    # Debug section at the bottom
    with st.expander("Debug Information"):
        st.json({
            "selected_stage": selected_stage,
            "transcript_loaded": st.session_state.transcript is not None,
            "chat_messages": len(st.session_state.messages)
        })

if __name__ == "__main__":
    main()