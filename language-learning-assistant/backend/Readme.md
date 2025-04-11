# Language Learning Assistant - Backend

The backend of the **Language Learning Assistant** project provides essential functionality for building an interactive Bengali(IN) language learning platform. It includes modules for generating AI-driven responses and downloading YouTube video transcripts to support language learning tasks.

---

## Features

### 1. **Ollama Chat Integration**
The `chat.py` module integrates with the Ollama API to provide AI-driven conversational capabilities. It allows users to:
- Ask questions about Bengali grammar, vocabulary, and culture.
- Receive AI-generated responses based on the `tinyllama` model.
- Customize inference parameters such as temperature and token limits.

### 2. **YouTube Transcript Downloader**
The `get_transcript.py` module enables downloading and processing YouTube video transcripts. It supports:
- Extracting video IDs from YouTube URLs.
- Downloading transcripts in Bengali (`bn`) and English (`en`).
- Saving transcripts to a local file for further processing.
- Printing transcripts directly to the console for quick review.

---

## Installation

### Prerequisites
- Python 3.12 or higher
- Required Python packages:
  - `requests`
  - `youtube-transcript-api`
  - `streamlit` (optional, for web-based usage)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/language-learning-assistant.git
   cd language-learning-assistant/backend
    ```
2.Install dependencies:
```pip install -r requirements.txt```

3. Run the modules:
    - For Ollama Chat Integration:
      ```bash
      python chat.py
      ```
    - For YouTube Transcript Downloader:
      ```bash
      python get_transcript.py
      ```
## Usage
1. Chat Module
Run chat.py to start an interactive chat session:
```python chat.py```
- Type your questions in the console.
- Use /exit to quit the chat.

2. Transcript Downloader
Run get_transcript.py to download a YouTube transcript:
```python get_transcript.py```
- Provide a YouTube video URL here 
```if __name__ == "__main__":
    video_id = "https://youtu.be/SFdweZAuzsw?si=l4JQMVdbU5S3xtFp"  # Extract from URL: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    transcript = main(video_id, print_transcript=True)
```
- The transcript will be saved in the bengali-transcripts folder.

### Future Enhancements
1.  ***RAG (Retrieval-Augmented Generation) System***
Implement a system to retrieve relevant context from transcripts and generate more accurate responses.
Use vector embeddings for efficient context retrieval.
2. ***Structured Data Processing***
Extract structured data (e.g., dialogues, questions) from transcripts.
Save structured data in JSON or database formats for advanced querying.
3. ***Interactive Learning Features***
Add support for dialogue practice, vocabulary quizzes, and listening exercises.
Integrate audio synthesis for pronunciation practice.

