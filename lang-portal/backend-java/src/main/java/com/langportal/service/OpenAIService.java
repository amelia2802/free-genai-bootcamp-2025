package com.langportal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;


import java.util.Map;

@Service
public class OpenAIService {

     private static final Logger logger = LoggerFactory.getLogger(OpenAIService.class);
    private final WebClient webClient;

    public OpenAIService(@Value("${openai.api.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public Map<String, Object> generateVocabularyQuiz(String language, String level) {
        String prompt = String.format(
            "Generate a vocabulary quiz for learning %s at the %s level. " +
            "Provide questions with options and correct answers in JSON format.",
            language, level
        );

        try {
            return webClient.post()
                    .uri("/completions")
                    .bodyValue(new CompletionRequest("gpt-4", prompt, 300))
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                    .block();
        } catch (Exception e) {
            logger.error("Failed to generate vocabulary quiz", e);
            throw new RuntimeException("Failed to generate vocabulary quiz: " + e.getMessage());
        }
    }

    private static class CompletionRequest {
        private final String model;
        private final String prompt;
        private final int max_tokens;

        public CompletionRequest(String model, String prompt, int max_tokens) {
            this.model = model;
            this.prompt = prompt;
            this.max_tokens = max_tokens;
        }
    }
}