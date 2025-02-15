package com.langportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.langportal.model.Word;

public interface WordRepository extends JpaRepository<Word, Long> {
}