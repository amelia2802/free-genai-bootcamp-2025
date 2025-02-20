package com.langportal.controller;

import com.langportal.service.OpenAIService;
import com.langportal.service.VocabImporterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vocab")
public class VocabController {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private VocabImporterService vocabImporterService;

    @GetMapping("/generate")
    public String generateVocab(@RequestParam String prompt) {
        return openAIService.generateVocab(prompt);
    }

    @PostMapping("/import")
    public String importVocab(@RequestParam String source) {
        return vocabImporterService.importVocab(source);
    }
}
