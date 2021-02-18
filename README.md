# Reactnd-Project3
Third Project of Udacity's React Nanodegree Program

# Installation
- This application was created and run on a machine that had node version 15.8.0 installed
- use `npm install` to install the required packages
- Incase there were legacy dependancies, use the --legacy-peer-deps flag to install the packages as I haven't faced any issues due to peer dependancies in this project
- use `npm run web` to run the program
- Scan the qr code to run the application on an android device using Expo Go app, or use the application's link 'exp://LOCALIP:PORT' where LOCALIP is the local IP of the device hosting the application and PORT is the host on which the application is hosted (19000 by default), or use an ios or an android emulator.

# Requirements
1. [x] Use create-react-native-app to build your project.
2. [x] Allow users to create a deck which can hold an unlimited number of cards.
3. [x] Allow users to add a card to a specific deck.
4. [x] The front of the card should display the question.
5. [x] The back of the card should display the answer.
6. [x] Users should be able to quiz themselves on a specific deck and receive a score once they're done.
7. [x] Users should receive a notification to remind themselves to study if they haven't already for that day.

# Views
1. [x] Deck List View (Default View)
   - [x] displays the title of each Deck
   - [x] displays the number of cards in each deck
2. [x] Individual Deck View
   - [x] displays the title of the Deck
   - [x] displays the number of cards in the deck
   - [x] displays an option to start a quiz on this specific deck
   - [x] An option to add a new question to the deck
3. [x] Quiz View
   - [x] displays a card question
   - [x] an option to view the answer (flips the card)
   - [x] a "Correct" button
   - [x] an "Incorrect" button
   - [x] the number of cards left in the quiz
   - [x] Displays the percentage correct once the quiz is complete
4. [x] New Deck View
   - [x] An option to enter in the title for the new deck
   - [x] An option to submit the new deck title
5. [x] New Question View
   - [x] An option to enter in the question
   - [x] An option to enter in the answer
   - [x] An option to submit the new question

# Modifications/Additions
- At the end of a quiz; If the percentage of the correct answers is less than 25%, it's displayed beside the number of correct answers and if it's 25% or more, it's displayed inside the progress bar
- [x] Users are able to enable/disable the daily reminder notification and choose the time at which they receive it
- [x] An option to delete a deck
- Creating a new Deck and Adding a new Card/Question were implemented as modals, not standalone views - I have implemented them as separate views at first, then decided to refactor them into modals

# Basic Application Testing
This application was tested on 2 devices:
- Sony Xperia Z5 running **Android 7.1.1**
- iPhone 11 Pro running **14.4**

# Patches
1. After the first submission, fixed the following:
   - [x] Users can create a card with no question or answer. Add some form validation to avoid that, like disabling the submit button.
   - [x] The "correct" and "incorrect" buttons should appear at all times, not only with the question.
   - [x] Same as the question: users can create a deck with no name.
   - ~~[x] The API for notifications is ready, but you are not calling the methods when the user finishes a quiz.~~ Also, on iPhone the toggle generates an error.
     - I'm calling the function `checkIn()` once the user finishes the quiz, this function stores the date at which the user last answered a quiz, the application compared this date against the next notification
     - As for the error that appear on IOS, I couldn't recreate the issue, it's working just fine on the tested device mentioned in [this section](#basic-application-testing)