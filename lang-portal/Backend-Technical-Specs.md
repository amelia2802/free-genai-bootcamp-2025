# Backend Server Technical Specks:

## Business Goal: 

A language learning school wants to build a prototype of learning portal which will act as three things:
- Inventory of possible vocabulary that can be learned
- Act as a  Learning record store (LRS), providing correct and wrong score on practice vocabulary
- A unified launchpad to launch different learning apps

## Technical Requirements

- The backend will be built using Java
- The database will be SQLLite3
- The API will be built using  Spring Boot
- The API will always return JSON responses
- No authentication or authorization
- Everything will be treated as Single user.

## Database Schema

We have the following tables:
- words - stores vocabulary words
    - id integer
    - bengali string
    - pronounciation string
    - english string
    - parts json
- word_groups - join table for words and groups many-to-many
    - id integer
    - word_id integer
    - group_id integer
- groups - thematic groups of words
    - id integer
    - name string
- study_sessions - records of study sessions grouping word_review_items
    - id integer
    - group_id integer
    - study_activity_id integer
    - created_at datetime
- study_activities - a specific study activity, linking a study session to group
    - id integer
    - study_session_id integer
    - group_id integer
    - created_at datetime
- word_review_items - a record of word practice, wheather determining if the word was correct or not
    - word_id integer
    - study_session_id integer
    - correct boolean
    - created_at datetime

### API Endpoints

- GET /dashboard/last_study_session
- GET /dashboard/study_progress
- GET /dashboard/quick-stats
- GET /api/study_activities/:id
- GET /api/study_activities/:id/study_sessions
- GET /words
- GET /words/:id
- GET /groups
- GET /groups/:id
- GET /groups/:id/words
- POST /api/study_activities
    - required params: group_id, study_activity_id
- GET /api/words
    - pagination with 100 items per page
- GET /api/groups
    - pagination with 100 items per page
- GET /api/groups/:id
- GET /api/groups/:id/words
- GET /api/groups/:id/study_sessions
- GET /api/study_sessions
- GET /api/study_sessions/:id
- GET /api/study_sessions/:id/words
- POST /api/reset_history
- POST /api/full_reset
- POST /api/study_sessions/:study_session_id/words/:word_id/review
    - required params: correct



