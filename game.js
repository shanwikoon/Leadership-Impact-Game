
// Game state
let gameState = {
    morale: 50,
    collaboration: 50,
    productivity: 50,
    score: 0
};

// Questions array
const questions = [
    {
        question: "Delegate responsibility or micromanage?",
        choices: [
            { text: "Delegate", action: () => makeDecision(10, 5, 5, 5) },
            { text: "Micromanage", action: () => makeDecision(-15, -5, 10, -5) }
        ]
    },
    {
        question: "Address employee burnout or push for higher targets?",
        choices: [
            { text: "Address burnout", action: () => makeDecision(20, 0, -10, 7) },
            { text: "Push for higher targets", action: () => makeDecision(-10, -5, 20, -3) }
        ]
    },
    {
        question: "Implement remote work or keep teams onsite?",
        choices: [
            { text: "Implement remote work", action: () => makeDecision(15, -5, 0, 5) },
            { text: "Keep teams onsite", action: () => makeDecision(-5, 10, 0, 2) }
        ]
    },
    {
        question: "Support employee learning programs or cut costs?",
        choices: [
            { text: "Support learning", action: () => makeDecision(10, 10, 5, 6) },
            { text: "Cut costs", action: () => makeDecision(-10, -10, 15, -2) }
        ]
    }
];

let currentQuestionIndex = 0;

function makeDecision(moraleChange, collaborationChange, productivityChange, scoreChange) {
    gameState.morale += moraleChange;
    gameState.collaboration += collaborationChange;
    gameState.productivity += productivityChange;
    gameState.score += scoreChange;
    
    // Ensure metrics are within 0-100 range
    gameState.morale = Math.max(0, Math.min(100, gameState.morale));
    gameState.collaboration = Math.max(0, Math.min(100, gameState.collaboration));
    gameState.productivity = Math.max(0, Math.min(100, gameState.productivity));
    
    updateDisplay();
    provideFeedback(moraleChange, collaborationChange, productivityChange);
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endGame();
    }
}

function updateDisplay() {
    document.getElementById('morale').textContent = gameState.morale;
    document.getElementById('collaboration').textContent = gameState.collaboration;
    document.getElementById('productivity').textContent = gameState.productivity;
    document.getElementById('score').textContent = gameState.score;
}

function provideFeedback(moraleChange, collaborationChange, productivityChange) {
    let feedback = "Decision Outcome:
";
    if (moraleChange !== 0) feedback += `Employee Morale ${moraleChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(moraleChange)}
`;
    if (collaborationChange !== 0) feedback += `Team Collaboration ${collaborationChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(collaborationChange)}
`;
    if (productivityChange !== 0) feedback += `Productivity ${productivityChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(productivityChange)}`;
    
    document.getElementById('feedback').textContent = feedback;
}

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    document.getElementById('question').textContent = question.question;
    
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = choice.action;
        choicesContainer.appendChild(button);
    });
}

function endGame() {
    let finalFeedback = "";
    if (gameState.score >= 30) {
        finalFeedback = "Outstanding Leadership! You maintained excellent balance and achieved high morale, collaboration, and productivity.";
    } else if (gameState.score >= 15) {
        finalFeedback = "Good Leadership, but room for improvement in balancing your team's morale and collaboration.";
    } else {
        finalFeedback = "Challenging Leadership Experience. There was a lack of balance, and your decisions led to challenges in the workplace.";
    }
    
    document.getElementById('question').textContent = "Game Over!";
    document.getElementById('feedback').textContent = finalFeedback;
    document.getElementById('choices').innerHTML = "";
}

// Start the game
window.onload = () => {
    displayQuestion(currentQuestionIndex);
};
