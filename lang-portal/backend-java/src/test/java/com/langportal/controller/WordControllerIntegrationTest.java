package com.langportal.controller;

import com.langportal.model.Word;
import com.langportal.repository.WordRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class WordControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WordRepository wordRepository;

    @BeforeEach
    public void setup() {
        wordRepository.deleteAll();
        Word word = new Word();
        word.setBengali("শব্দ");
        word.setPronounciation("shobdo");
        word.setEnglish("word");
        word.setParts("noun");
        wordRepository.save(word);
    }

    @Test
    public void testGetAllWords() throws Exception {
        mockMvc.perform(get("/words")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{'bengali':'শব্দ','pronounciation':'shobdo','english':'word','parts':'noun'}]"));
    }
}