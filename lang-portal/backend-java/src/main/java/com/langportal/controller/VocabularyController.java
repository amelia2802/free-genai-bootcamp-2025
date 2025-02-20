package com.langportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.langportal.model.Vocabulary;
import com.langportal.service.VocabularyService;

@RestController
@RequestMapping("/api/vocabularies")
public class VocabularyController {

    @Autowired
    private VocabularyService vocabularyService;

    @GetMapping
    public List<Vocabulary> getAllVocabularies() {
        return vocabularyService.getAllVocabularies();
    }

    @PostMapping
    public Vocabulary createVocabulary(@RequestBody Vocabulary vocabulary) {
        return vocabularyService.createVocabulary(vocabulary);
    }

    @PostMapping("/import")
    public void importVocabularies(@RequestBody List<Vocabulary> vocabularies) {
        vocabularyService.importVocabularies(vocabularies);
    }
}