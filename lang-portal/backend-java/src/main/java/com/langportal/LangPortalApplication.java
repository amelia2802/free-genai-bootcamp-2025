package com.langportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class LangPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(LangPortalApplication.class, args);
    }
    
    @Bean
    public VocabularyGenerator vocabularyGenerator() {
        return new VocabularyGenerator();
    }
}

// Separate configuration for VocabularyGenerator
@Configuration
class VocabularyGenerator {
    public VocabularyGenerator() {
        System.out.println("Vocabulary Generator initialized!");
        // Add any logic specific to vocabulary generation
    }
}
