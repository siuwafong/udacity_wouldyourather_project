# Would You Rather? Project

This is the second project from Udacity's React Nanodegree program. Users can log in with different accounts.  They can answer and create different "Would you rather?" questions. There is also a leaderboard that ranks users according to the total number of questions they've answered and created. The only file provided prior to its development is the DATA.js file to simulate writing to the back end.

# Libraries/Frameworks

This webapp was created with create-react-app. Material-UI was used for styling and Chartjs was used for creating graphs.

# Instructions

* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## How to Use

* The app opens with a login page.  Choose one of users to sign in. No authentication is required.
* The home page shows all questions that are available. By default, it will show the unanswered questions. Click on the 'answered questions' tab to navigate to questions that are already answered
* For both the answered and unanswered questions, click on `View Poll` to either answer the question (if it is unanswered) or to view the results (if it is answered)
* Click on `New Question` to create a new question
* Click on `Leader Board` to view the highest scoring users
* If you sign out (through clicking the `sign out` button), you can sign back in as the same or a different user and the question data will still persist
