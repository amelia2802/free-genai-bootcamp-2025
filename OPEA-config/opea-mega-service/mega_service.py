import logging
import os
from gtts import gTTS

class MegaService:
    def __init__(self):
        logging.basicConfig(level=logging.DEBUG)
        logging.debug("Initializing MegaService")
        self.tts_service = TTSService()
        # ...other components...

    def handle_request(self, request):
        logging.debug(f"Handling request: {request}")
        response = self.tts_service.generate_voice(request["text"])
        # ...process other components...
        logging.debug(f"Response: {response}")
        return response

class TTSService:
    def __init__(self):
        logging.debug("Initializing TTSService")
        # Initialize TTS model
        # ...initialization code...

    def generate_voice(self, text):
        logging.debug(f"Generating voice for text: {text}")
        # Generate voice from text using gTTS
        tts = gTTS(text=text, lang='en')
        file_path = self._save_voice_clip(tts)
        logging.debug(f"Generated voice clip saved at: {file_path}")
        return file_path

    def _save_voice_clip(self, tts):
        # Save the generated voice clip to a file
        file_path = "./generated_voice.mp3"
        tts.save(file_path)
        return file_path

# Example usage
if __name__ == "__main__":
    service = MegaService()
    text = input("Enter the text to convert to speech: ")
    request = {"text": text}
    response = service.handle_request(request)
    print(f"Voice clip saved at: {response}")
