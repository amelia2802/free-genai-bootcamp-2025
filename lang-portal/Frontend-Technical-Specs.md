## Frontend Technical Spec

## Directory Structure


## Pages

### Dashboard `/dashboard`

#### Purposes
The purpose of this page is to provide a summary of the learning and act as the default page when a user visit the webpage 


#### Components

This page contain the following components
- Last Study Session
    - shows last activity used
    - shows ehen last activity used
    - summarizes wrong vs correct from last activity
    - has a link to group

- Study Progress
    - total words study g. 3/124e
        - across all study session show the total words studied out of all possible words in our database
    - dispaly a mastery progress

- Quick Stats
    - sucess rate eg. 80%
    - total study sessions eg. 4
    - total sctive groups eg. 3
    - study streams eg. 4 days

- Start Studying Button
    - goes to study activity page

#### Needed API Endpoints

We'll need following API endoints to power this page

- GET /dashboard/last_study_session
- GET /dashboard/study_progress
- GET /dashboard/quick-stats

### Study Actvities `/study-activities`

#### Purposes
The purpose of this page is to show a collection of study activities with a thumbnail  and its name, to either launch or view the study activity.

#### Components

This page contain the following components
- Study activity Card
    - shows a thumbnail of the study activity
    - the name of the study activity
    - a launch Button to take us to the  launch page 
    - the view page to view more information about past study sessions for this study activity

#### Needed API Endpoints

We'll need following API endoints to power this page

- GET /api/study_activities

### Study Actvity Show `/study-activities/:id`

#### Purposes
The purpose of this page is to show the details of a study activity and its past study sessions.

#### Components

This page contain the following components
- Name of study activity
- thumbnail of study activity
- Description of study activity
- Launch Button
- Study activities paginated list 
    - id
    - activity name
    - group name
    - Start time
    - end time (inferred by last word_review_item submitted)
    - number of review items
#### Needed API Endpoints

We'll need following API endoints to power this page

- GET /api/study_activities/:id
- GET /api/study_activities/:id/study_sessions

### Study Actvities Launch `/study-activities/:id/launch`

#### Purposes
The purpose of this page is to launch a study activity.
#### Components

This page contain the following components
- Name of study activity
- Launch from
    - select field for group
    - launch now button 

## Behaviour
After the form is submitted a new tab opens with the study activity based on its URL provided in the database.

Also after form is submitted the page will redirect to the study activity show page.

#### Needed API Endpoints

We'll need following API endoints to power this page

- POST /api/study_activities

### Words `/words`

#### Purposes
The purpose of this page is to show all words in our database.

#### Components

This page contain the following components
- Paginated Word List
    - Columns
        - Bengali
        - Pronounciation 
        - English
        - Correct Count
        - Wrong Count
     - Pagination with 100 per page
     - Clicking the Bengali word will take us to the word show page



#### Needed API Endpoints

We'll need following API endoints to power this page

- GET /api/words

### Words Show `/words/:id`

#### Purposes
The purpose of this page is to show information about a specific word.

#### Components

This page contain the following components
- Bengali
- Pronounciation
- English
- Study Statistics 
    - Correct Count
    - Wrong Count
- Word Groups
    - show an a series of pills eg. tags
    - when group name is clicked it will take us to the group show page

#### Needed API Endpoints

We'll need following API endoints to power this page

- GET /API/words/:id

### Word Groups Index `/groups`

#### Purposes
The purpose of this page is to show a list of groups in our database.

#### Components

This page contain the following components
- Paginated Group List
    - Columns
        - Group Name
        - Word Count
    - Clicking the group name will take us to the group show page

#### Needed API Endpoints

We'll need following API endoints to power this page
- GET /api/groups

### Groups Show `/groups/:id`

#### Purposes
The purpose of this page is to show information about a specific group.

#### Components

This page contain the following components
- Group Name
- Group Statistics
    - Total Word Count
- Words in Group (Paginations List of Words)
    - Should use the same component as the words index page
- Study Sessions
    - Should use the same component as the study session index page

#### Needed API Endpoints

We'll need following API endoints to power this page
- GET /api/groups/:id(the name and group statistics)
- GET /api/groups/:id/words
- GET /api/groups/:id/study_sessions

## Study Sessions Index `/study-sessions`

#### Purposes
The purpose of this page is to show a list of study sessions in our database.

#### Components

This page contain the following components
- Paginated Study Session List
    - Columns
        - Id 
        - Activity Name
        - Group Name
        - Start Time
        - End Time
        - Number of Review Items
    - Clicking the study session id will take us to the study session show page

#### Needed API Endpoints
- GET /api/study_sessions

### Study Sessions Show `/study-sessions/:id`

#### Purposes
The purpose of this page is to show information about a specific study session.

#### Components

This page contain the following components
- Study Session Details
    - Activity Name
    - Group Name
    - Start Time
    - End Time
    - Number of Review Items
- Word Review Items (Paginated List of Word Review Items)
    - Should use the same component as the words index page

#### Needed API Endpoints

We'll need following API endoints to power this page
- GET /api/study_sessions/:id
- GET /api/study_sessions/:id/words

### Settings Page `/settings`

#### Purposes
The purpose of this page is to allow the user to change their settings.
#### Components

This page contain the following components
- Theme Selection eg. Light, Dark, System Default
- Reset History Button
     - this will delete all study sessions and word review items
- Full Reset Button
    - this will drop all tables and re-create with seed data

#### Needed API Endpoints

We'll need following API endoints to power this page
- POST /api/reset_history
- POST /api/full_reset
