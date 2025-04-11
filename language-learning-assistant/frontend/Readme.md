# Language Learning Assistant - Frontend

The frontend of the **Language Learning Assistant** project provides an interactive web-based interface for Bengali(IN) language learners. Built using Streamlit, it integrates with the backend to enable features like AI-driven chat, YouTube transcript processing, structured data extraction, and interactive learning modules.

---

## Features

### 1. **Chat with Ollama**
- Engage in conversations with the Ollama AI model (`tinyllama`) to learn Bengali grammar, vocabulary, and cultural nuances.
- Ask questions and receive AI-generated responses in real-time.
- Explore example questions to understand the capabilities of the AI.

### 2. **YouTube Transcript Processing**
- Download and process YouTube video transcripts for Bengali lessons.
- View raw transcripts and analyze statistics such as total characters, Bengali characters, and total lines.
- Download processed transcripts for offline use.

### 3. **Structured Data Extraction**
- Extract structured data (e.g., dialogues, questions) from transcripts.
- Save structured data in a format suitable for advanced querying and further processing.

### 4. **RAG (Retrieval-Augmented Generation) System**
- Retrieve relevant context from transcripts to generate accurate responses.
- Test the system by entering queries and viewing retrieved contexts and generated responses.

### 5. **Interactive Learning**
- Practice Bengali through dialogue scenarios, vocabulary quizzes, and listening exercises.
- Receive feedback and improve your language skills interactively.

---

## Installation

### Prerequisites
- Python 3.12 or higher
- Required Python packages:
  - `streamlit`
  - `requests`
  - `youtube-transcript-api`

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/language-learning-assistant.git
   cd language-learning-assistant/frontend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the Streamlit app:
    ```bash
    streamlit run app.py
    ```
## Usage
1. ***Chat with Ollama***
Select the "Chat with Ollama" stage from the sidebar.
Type your questions in the chat input box and receive responses from the AI.
Use example questions from the sidebar to explore the AI's capabilities.
2. ***YouTube Transcript Processing***
Select the "Raw Transcript" stage from the sidebar.
Enter a YouTube video URL and download the transcript.
View and analyze the transcript, and download it for offline use.
3. ***Structured Data Extraction***
Select the "Structured Data" stage from the sidebar.
Upload a transcript file and extract structured data such as dialogues and questions.
Save the structured data for further use.
4. ***RAG System***
Select the "RAG Implementation" stage from the sidebar.
Enter a query to test the retrieval-augmented generation system.
View the retrieved context and generated response.
5. ***Interactive Learning***
Select the "Interactive Learning" stage from the sidebar.
Choose a practice type (e.g., dialogue practice, vocabulary quiz, listening exercise).
Engage in interactive exercises and receive feedback.
## Future Enhancements
1. ***RAG System***
Implement vector embeddings for efficient context retrieval.
Improve the accuracy of generated responses by integrating advanced retrieval mechanisms.
2. ***Enhanced Interactive Learning***
Add more practice types, such as grammar correction and sentence formation.
Integrate audio synthesis for pronunciation practice.


