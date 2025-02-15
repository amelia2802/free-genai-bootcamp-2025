package com.langportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.langportal.model.StudyActivity;
import com.langportal.service.StudyActivityService;

@RestController
@RequestMapping("/api/study_activities")
public class StudyActivityController {

    @Autowired
    private StudyActivityService studyActivityService;

    @GetMapping
    public List<StudyActivity> getAllStudyActivities() {
        return studyActivityService.getAllStudyActivities();
    }

    @GetMapping("/{id}")
    public StudyActivity getStudyActivityById(@PathVariable Long id) {
        return studyActivityService.getStudyActivityById(id);
    }

    @PostMapping
    public StudyActivity createStudyActivity(@RequestBody StudyActivity studyActivity) {
        return studyActivityService.createStudyActivity(studyActivity);
    }
}