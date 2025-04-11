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
## Screenshot
| 1    | 2|
| -------- | ------- |
| ![Screenshot (167)](https://github.com/user-attachments/assets/6bcdcee1-9819-4ab7-8286-716c8f17c560) | ![Screenshot (168)](https://github.com/user-attachments/assets/927f8de4-0fb4-48ec-920f-54a9bf811d85)  |
| ![Screenshot (170)](https://github.com/user-attachments/assets/eac01ec1-a7e4-4412-9c0d-9afc48d59e22) | ![Screenshot (171)](https://github.com/user-attachments/assets/d6c3e05a-b58f-4721-b35a-b0fc48f9b27a)    |
[transcript (1).txt](https://github.com/user-attachments/files/19714996/transcript.1.txt)[মিউজিক]
মন একে একে
দুই এককার
তুই আর না
চোখ
ফিরিয়ে একটু হাস
[মিউজিক]
নেই মনে কি
কিছুই তোর ঠোঁটের
ডানা
ছুই মিলবে
সব
জীবনের ক্যালকুলাস
স্মৃতিরা গেছে
পরবাস কথা হয়ে
নিঝুম এ বুকে তবু বারো
[মিউজিক]
মাস
ভালোবাসারই
মোরশুন
ভালোবাসার মোরশুন
ডাক নামে ডেকে যাই
সে
আগের তোকে
চাই সে যে
সে
তাকালে
[মিউজিক]
সর্বনাশ সাক্ষী থাকুক শাল অসত্য বটের
পেয়াদারা সাক্ষী থাকুক ছাতিন পলাশ বুনো
ফুলের ঘ্রাণ সাক্ষী থাকুক কাঁদায় আঁকা
আহত একটা থাবা সাক্ষী থাকুক হাজার বছর
হাওয়ার গরুস্থান সাক্ষী থাকুক মৃগনাভীর
কস্তুরী ভোরবেলা সাক্ষী থাকুক সাঁওতালী
ক্ষোভ যক্ষ পিশাচ দল সাক্ষী থাকুক বাদর
ময়ূর উলুর ধ্বনির খেলা সাক্ষী থাকুক
পাতার
পুরুত হোমের দাবানল
ঝড় এলে তুই
থাকলে কি ভয়ে
तो
ठिकाना
पाठला
[মিউজিক]
हृदय
प्रेम होले
एक सुरेगा গান
বেজে
যায়
সে যখন
তবু
সে তো ভে যায়
ব্যথারা ফিরেছে
পাশ বালিশে জমে ভাঙ্গা
ঘোষ এ বুকে তবু বার
মাস
ভালোবাসার
[মিউজিক]
মোরশুন
ভালোবাসার
মোরশুন দিন বদলে যাবে
ফের হাত ধরে
সময়ে ফুটবে
ঠিক মন
মাফিক মন
[মিউজিক]
পলাশ ফুটবে
ঠিক মন
মাফিক মন
[মিউজিক]
পলাশ ফুটবে
ঠিক মন মাফিক
মন
[মিউজিক]
পলাশ
ভালোবাসার
মোরশুন
ভালোবাসার মোরশুন
[মিউজিক]






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


