# OPEA Mega-service Project

## Overview
This project aims to expand knowledge and construct a Mega-service by integrating various components such as TTS services.

## Steps
1. **Understand the Existing Mega-service**: Reviewed and debugged the `handle_request` function.
2. **Reimplement the Mega-service**: Reimplemented the service from scratch and attempted to swap components.
3. **Explore TTS Service**: Learned about TTS models like SpeakT5 and RVC-Boss/GPT-SoVITS and experimented with voice cloning.
4. **Integration and Testing**: Integrated components and tested the Mega-service.
5. **Documentation and Finalization**: Documented the process and finalized the service.

## Findings
- Successfully troubleshooted and fixed issues in the `handle_request` function.
- Reimplemented the Mega-service and attempted to swap out Ollama with vLLM.
- Explored TTS models and achieved basic voice cloning with GPT-SoVITS.

## Errors Faced and Fixes

### Indentation Error in `__init__` Method
**Error**: The `__init__` method in the `TTSService` class was missing an indented block, causing an indentation error.

**Fix**: Added a `pass` statement inside the `__init__` method to avoid the indentation error.

```python
class TTSService:
    def __init__(self):
        # Initialize TTS model
        pass
```

### Hardcoded Input Text
**Error**: The input text for the TTS service was hardcoded, resulting in the same output for every run.

**Fix**: Modified the script to accept user input for the text to be converted to speech.

```python
if __name__ == "__main__":
    service = MegaService()
    text = input("Enter the text to convert to speech: ")
    request = {"text": text}
    response = service.handle_request(request)
    print(f"Voice clip saved at: {response}")
```

### Missing Import for `gTTS`
**Error**: The `gTTS` library was not imported in the `mega_service.py` file, causing a `NameError`.

**Fix**: Added the import statement for `gTTS` in the `mega_service.py` file.

```python
from gtts import gTTS
```

## Tools and Technologies Used
- **Python**: The primary programming language used for implementing the Mega-service.
- **gTTS (Google Text-to-Speech)**: A Python library and CLI tool to interface with Google Translate's text-to-speech API.
- **Logging**: Python's built-in logging module for debugging and tracking the execution flow.

## Resources
- [OPEA Documentation](https://opea.dev/)
- [GenAIExamples GitHub Repository](https://github.com/opea-project/GenAIExamples/blob/main/ChatQnA/docker_compose/intel/cpu/xeon/compose.yaml)
- [gTTS Documentation](https://gtts.readthedocs.io/en/latest/)

## Future Work
- Continue improving the voice cloning quality.
- Further integrate and test additional components.