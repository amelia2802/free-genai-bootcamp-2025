import re
from typing import List, Dict, Optional
import requests
from dataclasses import dataclass
import os

@dataclass
class ListeningQuestion:
    introduction: str
    conversation: str
    question: str
    order: int

class BengaliQuestionExtractor:
    def __init__(self, model_id: str = "tinyllama", base_url: str = "http://localhost:11434"):
        """Initialize with Ollama configuration"""
        self.model_id = model_id
        self.api_endpoint = f"{base_url}/api/chat"

    def _query_ollama(self, prompt: str) -> Optional[str]:
        """Query Ollama model"""
        try:
            payload = {
                "model": self.model_id,
                "messages": [{"role": "user", "content": prompt}],
                "stream": False
            }
            response = requests.post(self.api_endpoint, json=payload)
            response.raise_for_status()
            return response.json()['message']['content']
        except Exception as e:
            print(f"Error querying Ollama: {str(e)}")
            return None

    def _create_extraction_prompt(self, text: str) -> str:
        """Create prompt for Ollama to extract question components"""
        return f"""Analyze this Bengali listening practice text and extract:
1. Introduction (context setting)
2. Conversation (the dialogue)
3. Question (the actual question asked)

Text:
{text}

Format your response exactly like this:
INTRODUCTION:
[introduction text]
CONVERSATION:
[conversation text]
QUESTION:
[question text]

Only include these three sections with their headings. No other text."""

    def read_transcript_file(self, filepath: str) -> List[Dict]:
        """Read transcript from file and convert to list of dictionaries"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            # Convert lines to transcript format
            transcript = []
            for line in lines:
                if line.strip():  # Skip empty lines
                    transcript.append({'text': line.strip()})
            return transcript
        except Exception as e:
            print(f"Error reading transcript file: {str(e)}")
            return []

    def extract_questions(self, transcript: List[Dict]) -> List[ListeningQuestion]:
        """Extract questions from transcript"""
        questions = []
        current_text = []
        question_count = 0
        
        # Combine transcript entries into potential question blocks
        for entry in transcript:
            text = entry['text'].strip()
            current_text.append(text)
            
            # Check if this might be the end of a question
            if any(marker in text.lower() for marker in ['question', 'প্রশ্ন', '?', '।']):
                # Join the accumulated text
                full_text = ' '.join(current_text)
                
                # Use Ollama to extract structured components
                ollama_response = self._query_ollama(
                    self._create_extraction_prompt(full_text)
                )
                
                if ollama_response:
                    # Parse Ollama response
                    parts = {}
                    current_section = None
                    current_content = []
                    
                    for line in ollama_response.split('\n'):
                        if line.startswith('INTRODUCTION:'):
                            current_section = 'introduction'
                        elif line.startswith('CONVERSATION:'):
                            if current_section:
                                parts[current_section] = '\n'.join(current_content).strip()
                            current_section = 'conversation'
                            current_content = []
                        elif line.startswith('QUESTION:'):
                            if current_section:
                                parts[current_section] = '\n'.join(current_content).strip()
                            current_section = 'question'
                            current_content = []
                        elif current_section and line.strip():
                            current_content.append(line.strip())
                    
                    if current_section:
                        parts[current_section] = '\n'.join(current_content).strip()
                    
                    # Create question object if all parts are present
                    if all(key in parts for key in ['introduction', 'conversation', 'question']):
                        question_count += 1
                        questions.append(ListeningQuestion(
                            introduction=parts['introduction'],
                            conversation=parts['conversation'],
                            question=parts['question'],
                            order=question_count
                        ))
                
                # Reset for next question
                current_text = []
        
        return questions

    def save_structured_data(self, questions: List[ListeningQuestion], filename: str) -> bool:
        """Save structured questions to file"""
        try:
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            with open(filename, 'w', encoding='utf-8') as f:
                for q in questions:
                    f.write(f"Question {q.order}\n")
                    f.write("="*50 + "\n")
                    f.write(f"Introduction:\n{q.introduction}\n\n")
                    f.write(f"Conversation:\n{q.conversation}\n\n")
                    f.write(f"Question:\n{q.question}\n\n")
                    f.write("-"*50 + "\n\n")
            return True
        except Exception as e:
            print(f"Error saving structured data: {str(e)}")
            return False

def main():
    # Initialize extractor
    extractor = BengaliQuestionExtractor()
    
    # Define the transcript directory
    transcript_dir = "bengali-transcripts"
    
    # Ensure the directory exists
    if not os.path.exists(transcript_dir):
        print(f"Directory not found: {transcript_dir}")
        return
        
    # Process all transcript files
    for filename in os.listdir(transcript_dir):
        if filename.endswith('.txt') and not filename.endswith('_structured.txt'):
            # Get video ID from filename
            video_id = filename.replace('.txt', '')
            
            # Read transcript
            transcript_path = os.path.join(transcript_dir, filename)
            transcript = extractor.read_transcript_file(transcript_path)
            
            if transcript:
                # Extract questions
                questions = extractor.extract_questions(transcript)
                
                # Save structured data
                if questions:
                    output_filename = os.path.join(transcript_dir, f"{video_id}_structured.txt")
                    if extractor.save_structured_data(questions, output_filename):
                        print(f"Structured data saved to {output_filename}")
                        
                        # Print example
                        print("\nExample question structure:")
                        print(f"Total questions found: {len(questions)}")
                        if questions:
                            q = questions[0]
                            print("\nFirst question:")
                            print(f"Introduction:\n{q.introduction}\n")
                            print(f"Conversation:\n{q.conversation}\n")
                            print(f"Question:\n{q.question}")
                    else:
                        print(f"Failed to save structured data for {filename}")
                else:
                    print(f"No questions extracted from {filename}")
            else:
                print(f"Failed to read transcript: {filename}")

if __name__ == "__main__":
    main()