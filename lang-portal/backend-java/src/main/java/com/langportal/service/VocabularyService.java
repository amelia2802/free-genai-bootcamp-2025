package com.langportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.langportal.model.Vocabulary;
import com.langportal.repository.VocabularyRepository;

@Service
public class VocabularyService {

    @Autowired
    private VocabularyRepository vocabularyRepository;

    public List<Vocabulary> getAllVocabularies() {
        return vocabularyRepository.findAll();
    }

    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        return vocabularyRepository.save(vocabulary);
    }

    public void importVocabularies(List<Vocabulary> vocabularies) {
        vocabularyRepository.saveAll(vocabularies);
    }
}