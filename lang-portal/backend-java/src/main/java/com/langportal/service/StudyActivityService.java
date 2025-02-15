package com.langportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.langportal.model.StudyActivity;
import com.langportal.repository.StudyActivityRepository;

@Service
public class StudyActivityService {

    @Autowired
    private StudyActivityRepository studyActivityRepository;

    public List<StudyActivity> getAllStudyActivities() {
        return studyActivityRepository.findAll();
    }

    public StudyActivity getStudyActivityById(Long id) {
        return studyActivityRepository.findById(id).orElse(null);
    }

    public StudyActivity createStudyActivity(StudyActivity studyActivity) {
        return studyActivityRepository.save(studyActivity);
    }
}