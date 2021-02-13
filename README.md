# Reactnd-Project3
Third Project of Udacity's React Nanodegree Program
# Installation
- Created on a machine that had node version 15.8.0 installed
- use `npm install` to install the required packages
- use `npm run web` to run the program
- Scan the qr code or use an ios or an android emulator
# Requirements
1. [x] Use create-react-native-app to build your project.
2. [ ] Allow users to create a deck which can hold an unlimited number of cards.
3. [x] Allow users to add a card to a specific deck.
4. [x] The front of the card should display the question.
5. [x] The back of the card should display the answer.
6. [x] Users should be able to quiz themselves on a specific deck and receive a score once they're done.
7. [ ] Users should receive a notification to remind themselves to study if they haven't already for that day.
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

4. [ ] New Deck View
   - [ ] An option to enter in the title for the new deck
   - [ ] An option to submit the new deck title

5. [x] New Question View
   - [x] An option to enter in the question
   - [x] An option to enter in the answer
   - [x] An option to submit the new question
# Modifications
- Added and `id` key to every deck
- At the end of a quiz; If the percentage of the correct answers is less than 25%, it's displayed beside the number of correct answers and if it's 25% or more, it's displayed inside the progress bar