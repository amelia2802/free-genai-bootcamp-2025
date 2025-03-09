from gtts import gTTS
import os

class TTSService:
    def __init__(self):
        # Initialize TTS model
        # Add this line to avoid indentation error
        pass

    def generate_voice(self, text):
        # Generate voice from text using gTTS
        tts = gTTS(text=text, lang='en')
        file_path = self._save_voice_clip(tts)
        return file_path

    def _save_voice_clip(self, tts):
        # Save the generated voice clip to a file
        file_path = "./generated_voice.mp3"
        tts.save(file_path)
        return file_path
