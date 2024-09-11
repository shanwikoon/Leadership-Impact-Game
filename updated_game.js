
balance these in future scenarios.";
    } else {
        return "It looks like your leadership decisions have faced some challenges. Review the decisions and try to find better balance between morale, influence, and productivity next time.";
    }
}

function startGame() {
    displayQuestion(currentQuestionIndex);
}

// Start the game when the page loads
window.onload = startGame;
