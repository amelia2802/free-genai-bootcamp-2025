# Backend Server Technical Specks:

## Business Goal: 

A language learning school wants to build a prototype of learning portal which will act as three things:
- Inventory of possible vocabulary that can be learned
- Act as a  Learning record store (LRS), providing correct and wrong score on practice vocabulary
- A unified launchpad to launch different learning apps

## Technical Requirements

- The backend will be built using Java
- The database will be SQLLite3
- Maven is the task runner
- The API will be built using  Spring Boot
- The API will always return JSON responses
- No authentication or authorization
- Everything will be treated as Single user.

## Directory Structure

```text
backend-java/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── langportal/
│   │   │           ├── config/
│   │   │           ├── controller/
│   │   │           │   └── WordController.java
│   │   │           ├── service/
│   │   │           │   └── WordService.java
│   │   │           ├── repository/
│   │   │           │   └── WordRepository.java
│   │   │           ├── model/
│   │   │           │   └── Word.java
│   │   │           └── LangPortalApplication.java
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   └── db/
│   │   │       ├── words.db
│   │   │       ├── migrations/
│   │   │       │   ├── 0001_init.sql
│   │   │       │   └── 0002_create_words_table.sql
│   │   │       └── seeds/
│   │   │           └── words.json
│   └── test/
│       └── java/
│           └── com/
│               └── langportal/
│                   ├── controller/
│                   └── LangPortalApplicationTests.java
├── pom.xml
└── README.md;
```

## Database Schema
Our database will be single sqlite database called `words.db` that will be in the root of the project folder of `backend-java`.
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

#### GET /dashboard/last_study_session

```{
  "id": 1,
  "group_id": 1,
  "study_activity_id": 1,
  "created_at": "2025-02-13T12:00:00Z",
  "words": [
    {
      "word_id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ]
}
```

#### GET /dashboard/study_progress

```{
  "total_sessions": 10,
  "total_words_reviewed": 100,
  "correct_reviews": 80,
  "incorrect_reviews": 20
}
```

#### GET /dashboard/quick-stats

```{
  "total_words": 500,
  "total_groups": 20,
  "total_study_sessions": 15
}
```
#### GET /api/study_activities/:id

```{
  "id": 1,
  "study_session_id": 1,
  "group_id": 1,
  "created_at": "2025-02-13T12:00:00Z"
}
```
#### GET /api/study_activities/:id/study_sessions

```{
  "study_sessions": [
    {
      "id": 1,
      "group_id": 1,
      "study_activity_id": 1,
      "created_at": "2025-02-13T12:00:00Z"
    }
  ]
}
```
#### GET /words

```
  {
  "words": [
    {
      "id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "items_per_page": 100
  }
}
```
#### GET /words/:id

```{
  "id": 1,
  "bengali": "শব্দ",
  "pronounciation": "shobdo",
  "english": "word",
  "parts": {}
}
```
#### GET /groups

```{
  "groups": [
    {
      "id": 1,
      "name": "Basic Vocabulary"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "items_per_page": 100
  }
}
```
#### GET /groups/:id

```{
  "id": 1,
  "name": "Basic Vocabulary"
}
```
#### GET /groups/:id/words

```{
  "words": [
    {
      "id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ],
}
```
#### POST /api/study_activities
    - required params: group_id, study_activity_id

    - Request:
```{
  "group_id": 1,
  "study_activity_id": 1
}
```
    - Response:
```{
  "id": 1,
  "group_id": 1,
  "study_activity_id": 1,
  "created_at": "2025-02-13T12:00:00Z"
}
```

#### GET /api/words
    - pagination with 100 items per page
```{
  "words": [
    {
      "id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "items_per_page": 100
  }
}
```
#### GET /api/groups
    - pagination with 100 items per page
```{
  "groups": [
    {
      "id": 1,
      "name": "Basic Vocabulary"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "items_per_page": 100
  }
}
```
- #### GET /api/groups/:id

```{
  "id": 1,
  "name": "Basic Vocabulary"
}
```
- #### GET /api/groups/:id/words

```{
  "words": [
    {
      "id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ]
}
```
- #### GET /api/groups/:id/study_sessions

```{
  "study_sessions": [
    {
      "id": 1,
      "group_id": 1,
      "study_activity_id": 1,
      "created_at": "2025-02-13T12:00:00Z"
    }
  ]
}
```

- #### GET /api/study_sessions

```{
  "study_sessions": [
    {
      "id": 1,
      "group_id": 1,
      "study_activity_id": 1,
      "created_at": "2025-02-13T12:00:00Z"
    }
  ]
}
```
-  #### GET /api/study_sessions/:id

```{
  "id": 1,
  "group_id": 1,
  "study_activity_id": 1,
  "created_at": "2025-02-13T12:00:00Z"
}
```
- #### GET /api/study_sessions/:id/words

```{
  "words": [
    {
      "word_id": 1,
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
      "parts": {}
    }
  ]
}
```
- #### POST /api/reset_history

```{
  "status": "success",
  "message": "History reset successfully"
}
```
- #### POST /api/full_reset

```{
  "status": "success",
  "message": "Full reset successfully"
}
```
- #### POST /api/study_sessions/:study_session_id/words/:word_id/review
    - required params: correct
  
    - Request:
```json
{
  "correct": true
}
```
    - Response:
```json
{
  "status": "success",
  "message": "Review recorded successfully"
}
```

## Maven Tasks

maven is a build automation tool used primarily for Java projects. It is used to build and manage any Java-based project. Maven can also be used to build and manage projects written in C#, Ruby, Scala, and other languages.
Let's list out possiblre tasks we need for our language learning portal:
### Initialize Database

This task will initialize the sqlite database called `words.db`.

### Migrate Database

This tasks will run a series of migrations sql file on the database.

Migrations live in the `migrations` folder.
The migrarion files should be run in order.
the file name should be in the format 
```sql
0001_init.sql
0002_create_words_table.sql
``` 
### Seed Database
This task will import json files and transform them into target data and insert into the database.

All seed files live in the `seeds` folder.
All seed files should be loaded.

In our task we should have DSL to define the seed files and the target table.

```json
{
  "words": [
    {
      "bengali": "শব্দ",
      "pronounciation": "shobdo",
      "english": "word",
    },
    ...
  ]
}
```
## Running Maven

To run the maven tasks, you can run the following commands:

```bash
mvn clean install
mvn spring-boot:run
```