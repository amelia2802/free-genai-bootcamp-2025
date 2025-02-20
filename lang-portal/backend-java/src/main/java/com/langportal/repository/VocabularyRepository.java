package com.langportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.langportal.model.Vocabulary;

public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
}