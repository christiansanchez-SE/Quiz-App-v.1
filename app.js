// Get references to HTML elements by their ID
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Declare variables to store shuffled questions and the current question index
let shuffledQuestions, currentQuestionIndex

// Add event listeners to buttons for starting the game and moving to the next question
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    // Increment the current question index
    currentQuestionIndex++
    // Set up the next question 
    setNextQuestion() 
} )

// Function to start the game
function startGame() {
    // Log to console that the game has started
    console.log('Started')
    // Hide the start button  
    startButton.classList.add('hide')  
    // Shuffle the questions randomly
    shuffledQuestions = questions.sort(() => Math.random() - .5)  
    // Initialize the current question index to 0
    currentQuestionIndex = 0  
    // Show the question container
    questionContainerElement.classList.remove('hide')  
    // Call function to set up the first question
    setNextQuestion()  
}

// Function to set up the next question
function setNextQuestion() {
    // Reset the state of the game (clear previous answers and UI)
    resetState()  
    // Display the current question
    showQuestion(shuffledQuestions[currentQuestionIndex])  
}

// Function to display a question and its possible answers
function showQuestion(question) {
    // Set the question text
    questionElement.innerText = question.question  
    // Iterate through the answer choices
    question.answers.forEach(answer => {  
        // Create a new button element for each answer
        const button = document.createElement('button')  
        // Set the button text to the answer text
        button.innerText = answer.text  
        // Add the 'btn' class to the button
        button.classList.add('btn')  
        // If the answer is correct, add a 'correct' data attribute to the button
        if (answer.correct) {  
            button.dataset.correct = answer.correct
        }
        // Add an event listener for selecting an answer
        button.addEventListener('click', selectAnswer)  
        // Append the button to the answer buttons container
        answerButtonsElement.appendChild(button)  
    })
}

// Function to reset the state of the game for the next question
function resetState() {
    // Clear any status classes (correct/wrong) on the body element
    clearStatusClass(document.body);  
    // Hide the 'Next' button
    nextButton.classList.add('hide');  
    // Remove all answer buttons from the previous question
    while (answerButtonsElement.firstChild) {  
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle the selection of an answer
function selectAnswer(e) { 
    // Get the button that was clicked
    const selectedButton = e.target  
    // Check if the selected answer is correct
    const correct = selectedButton.dataset.correct 
    // Set the status class on the body element (correct/wrong) 
    setStatusClass(document.body, correct)  
    // Set the status class on each answer button
    Array.from(answerButtonsElement.children).forEach(button => {  
        setStatusClass(button, button.dataset.correct)
    })
    // If there are more questions left
    if (shuffledQuestions.length > currentQuestionIndex + 1) {  
        // Show the 'Next' button
        nextButton.classList.remove('hide')  
    } else { 
        // Change the start button text to 'Restart'
        startButton.innerText = 'Restart'  
        // Show the start button to restart the game
        startButton.classList.remove('hide')  
    }
}

// Function to set the status class (correct/wrong) based on the answer
function setStatusClass(element, correct) {
    // Clear any existing status classes
    clearStatusClass(element)  
    if (correct) {
        // Add the 'correct' class if the answer is correct
        element.classList.add('correct')  
    } else {
        // Add the 'wrong' class if the answer is wrong
        element.classList.add('wrong')  
    }
}

// Function to clear the status classes (correct/wrong)
function clearStatusClass(element) {
    // Remove the 'correct' class
    element.classList.remove('correct')  
    // Remove the 'wrong' class
    element.classList.remove('wrong')  
}

// Array of question objects, each containing a question and its possible answers
const questions = [ 
    {
        question: 'What is 2 + 2?',
        answers: [ 
            { text: '4', correct: true },
            { text: '22', correct: false}
        ]
    },
    {
        question: 'Is Aprilis Athletics the best clothing brand?',
        answers: [ 
            { text: 'yes', correct: true },
            { text: 'no', correct: false}
        ]
    },
    {
        question: 'What is the capital city of England?',
        answers: [ 
            { text: 'London', correct: true },
            { text: 'Oxford', correct: false},
            { text: 'Liverpool', correct: false},
            { text: 'Manchester', correct: false}
        ]
    }
]