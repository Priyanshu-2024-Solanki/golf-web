let displayUserChoice = document.getElementById('user-choice');
let displayComputerChoice = document.getElementById('computer-choice');
let displayResult = document.getElementById('result');
let possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener('click' , (e) => {
    userChoice = e.target.id;
    displayUserChoice.innerText = userChoice;
    generateComputerChoice();
    getResult();
}))

function generateComputerChoice() {
    const randonNum = Math.floor(Math.random()*3) + 1;

    if(randonNum === 1)
    {
        computerChoice = 'rock';
    }
    else if(randonNum === 2) 
    {
        computerChoice = 'scissor';
    }
    else {
        computerChoice = 'paper';
    }

    displayComputerChoice.innerHTML = computerChoice;
}

function getResult()
{
    if(computerChoice === userChoice)
    {
        result = 'draw';
    }
    else if(computerChoice==='rock')
    {
        if(userChoice === 'paper') result = 'you win';
        else result = 'you loose';
    }
    else if(computerChoice === 'scissor')
    {
        if(userChoice === 'rock') result = 'you win';
        else result = 'you loose';
    }
    else 
    {
        if(userChoice === 'scissor') result = 'you win';
        else result = 'you loose';
    }

    displayResult.innerText = result;
}