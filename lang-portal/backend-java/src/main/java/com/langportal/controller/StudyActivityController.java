package com.langportal.controller;

import com.langportal.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/study-activities")
public class StudyActivityController {

    @Autowired
    private OpenAIService openAIService;

    @GetMapping("/vocabulary-quiz")
    public Map<String, Object> getVocabularyQuiz() {
        // Get the user's language preferences and level (hardcoded for now)
        String language = "Bengali"; // Replace with dynamic user preference
        String level = "Beginner"; // Replace with dynamic user level

        // Generate a vocabulary quiz using OpenAI API
        return openAIService.generateVocabularyQuiz(language, level);
    }
}