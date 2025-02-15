package com.langportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.langportal.model.StudyActivity;

public interface StudyActivityRepository extends JpaRepository<StudyActivity, Long> {
}