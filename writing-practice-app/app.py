import streamlit as st
import requests
import json
import random
import io
import base64
import os
from PIL import Image
from google.cloud import vision
import openai

# Configuration
API_URL = "http://localhost:5000/api/groups"

# Extract group_id from query parameters
query_params = st.query_params()
GROUP_ID = query_params.get("group_id", ["1"])[0]  # Default to "1" if not provided

# State management
if 'app_state' not in st.session_state:
    st.session_state.app_state = "setup"
if 'current_sentence' not in st.session_state:
    st.session_state.current_sentence = ""
if 'bengali_words' not in st.session_state:
    st.session_state.bengali_words = []
if 'review_data' not in st.session_state:
    st.session_state.review_data = None
if 'group_id' not in st.session_state:
    st.session_state.group_id = GROUP_ID  # Store the group_id in session state

# Initialize Google Vision API client
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./credentials.json"  
vision_client = vision.ImageAnnotatorClient()

# Initialize OpenAI client
openai.api_key = "your-openai-api-key"  # Replace with your OpenAI API key

# Functions
def fetch_bengali_words():
    """Fetch Bengali words from the API using the group_id from query string"""
    try:
        group_id = st.session_state.group_id
        response = requests.get(f"{API_URL}/{group_id}/raw")
        data = response.json()
        st.session_state.bengali_words = data
        return data
    except Exception as e:
        st.error(f"Error fetching words: {str(e)}")
        return []

def generate_sentence(word):
    """Generate a simple sentence using the provided word"""
    prompt = f"""Generate a simple sentence using the following word: {word}
    The grammar should be scoped to Bangla grammar.
    You can use the following vocabulary to construct a simple sentence:
    - simple objects e.g. book, car, harmonium, poetry
    - simple verbs, to drink, to eat, to meet
    - simple times e.g. tomorrow, today, yesterday
    
    Return ONLY the English sentence."""
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful assistant that generates simple sentences."},
                 {"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def transcribe_image(image_bytes):
    """Transcribe Bengali text from the uploaded image using Google Vision API"""
    image = vision.Image(content=image_bytes)
    response = vision_client.text_detection(image=image)
    texts = response.text_annotations
    
    if texts:
        return texts[0].description
    return ""

def translate_bengali_to_english(bengali_text):
    """Translate the Bengali text to English using LLM"""
    prompt = f"Provide a literal translation of the following Bengali text to English: {bengali_text}"
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful assistant that translates Bengali to English accurately."},
                 {"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def grade_submission(original_sentence, translated_text):
    """Grade the submission using LLM"""
    prompt = f"""
    Grade this Bengali language practice submission:
    
    Original English sentence: "{original_sentence}"
    Translated user's Bengali writing: "{translated_text}"
    
    Provide:
    1. A letter grade (S, A, B, C, D, F) where S is the highest rank
    2. A brief explanation of whether the attempt was accurate to the English sentence
    3. Suggestions for improvement
    
    Format your response like this:
    Grade: [letter]
    Explanation: [your explanation]
    Suggestions: [your suggestions]
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are a helpful Bengali language teacher providing feedback."},
                 {"role": "user", "content": prompt}]
    )
    
    feedback = response.choices[0].message.content.strip()
    
    # Parse the feedback
    grade_lines = feedback.split('\n')
    grade = grade_lines[0].replace("Grade:", "").strip() if len(grade_lines) > 0 else "N/A"
    explanation = grade_lines[1].replace("Explanation:", "").strip() if len(grade_lines) > 1 else "N/A"
    suggestions = grade_lines[2].replace("Suggestions:", "").strip() if len(grade_lines) > 2 else "N/A"
    
    return {
        "grade": grade,
        "explanation": explanation,
        "suggestions": suggestions
    }

def process_image_submission(image_file, original_sentence):
    """Process the submitted image and grade it"""
    try:
        # Read the uploaded image
        image_bytes = image_file.getvalue()
        
        # Transcribe the image
        transcription = transcribe_image(image_bytes)
        
        # Translate the transcription
        translation = translate_bengali_to_english(transcription)
        
        # Grade the submission
        grading = grade_submission(original_sentence, translation)
        
        return {
            "transcription": transcription,
            "translation": translation,
            "grading": grading
        }
    except Exception as e:
        st.error(f"Error processing submission: {str(e)}")
        return None

def generate_new_question():
    """Generate a new practice sentence"""
    if not st.session_state.bengali_words:
        fetch_bengali_words()
    
    if st.session_state.bengali_words:
        random_word = random.choice(st.session_state.bengali_words)
        bengali_word = random_word.get("bengali", "")
        english_word = random_word.get("english", "")
        
        # Generate a sentence using the selected word
        sentence = generate_sentence(english_word)
        st.session_state.current_sentence = sentence
        st.session_state.app_state = "practice"
    else:
        st.error("Could not load Bengali words. Please try again.")

def submit_for_review():
    """Submit the uploaded image for review"""
    if st.session_state.uploaded_image:
        review_data = process_image_submission(st.session_state.uploaded_image, st.session_state.current_sentence)
        st.session_state.review_data = review_data
        st.session_state.app_state = "review"
    else:
        st.error("Please upload an image before submitting.")

# Initial word fetching
if not st.session_state.bengali_words:
    fetch_bengali_words()

# App header
st.title("Bengali Language Practice")
st.write("Practice writing Bengali sentences based on English prompts.")

# Display the group ID (optional - can be removed in production)
st.sidebar.write(f"Group ID: {st.session_state.group_id}")

# UI based on state
if st.session_state.app_state == "setup":
    st.write("Click the button below to start practicing!")
    if st.button("Generate Sentence"):
        generate_new_question()

elif st.session_state.app_state == "practice":
    st.subheader("Write this sentence in Bengali:")
    st.write(st.session_state.current_sentence)
    
    # Image upload
    st.session_state.uploaded_image = st.file_uploader("Upload your handwritten Bengali sentence", type=["jpg", "jpeg", "png"])
    
    if st.button("Submit for Review"):
        submit_for_review()

elif st.session_state.app_state == "review":
    st.subheader("Original Sentence:")
    st.write(st.session_state.current_sentence)
    
    if st.session_state.review_data:
        review = st.session_state.review_data
        
        st.subheader("Your Submission Review:")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**Transcription:**")
            st.write(review["transcription"])
        
        with col2:
            st.write("**Translation:**")
            st.write(review["translation"])
        
        st.subheader("Grading:")
        grade = review["grading"]["grade"]
        
        # Display the grade with appropriate styling
        grade_color = {
            "S": "green",
            "A": "green",
            "B": "blue",
            "C": "orange",
            "D": "red",
            "F": "red"
        }.get(grade, "gray")
        
        st.markdown(f"<h3 style='color: {grade_color};'>Grade: {grade}</h3>", unsafe_allow_html=True)
        
        st.write("**Explanation:**")
        st.write(review["grading"]["explanation"])
        
        st.write("**Suggestions:**")
        st.write(review["grading"]["suggestions"])
    
    if st.button("Next Question"):
        generate_new_question()

# Footer
st.markdown("---")
st.markdown("Bengali Language Practice App | Learn by writing")