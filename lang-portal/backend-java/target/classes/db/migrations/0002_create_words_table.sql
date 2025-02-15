-- Migration: Create words table
CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bengali TEXT,
    pronounciation TEXT,
    english TEXT,
    parts TEXT
);