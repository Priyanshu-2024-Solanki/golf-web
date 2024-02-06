const secondsLeftDisplay = document.querySelector('#second-left');
const resultDisplay = document.querySelector('#result');
const squares = document.querySelectorAll('.grid div');
const startPauseButton = document.querySelector('#start-pause-button');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

let startingIndex = 76;
let squareWidth = 9;
let currentTime = 20;
let outcomeTimerId;
let timerID; 

function moveFrog(e)
{
    squares[startingIndex].classList.remove('frog');

    switch(e.key)
    {
        case 'ArrowLeft':
            if(startingIndex%9 !==0) startingIndex -= 1;
            break;
        case 'ArrowRight':
            if(startingIndex%9 != 8) startingIndex += 1;
            break;
        case 'ArrowUp':
            if(startingIndex-9>=0) startingIndex -= 9;
            break;
        case 'ArrowDown':
            if(startingIndex+9<81) startingIndex += 9;
            break;
    }

    squares[startingIndex].classList.add('frog');
}

function autoMoveLogs()
{
    currentTime--;
    secondsLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logleft => moveLogLeft(logleft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function winLose()
{
    win();
    lose();
}

function moveLogLeft(logleft)
{
    switch(true)
    {
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1');
            logleft.classList.add('l2');
            break;
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2');
            logleft.classList.add('l3');
            break;
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3');
            logleft.classList.add('l4');
            break;
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4');
            logleft.classList.add('l5');
            break;
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5');
            logleft.classList.add('l1');
            break;
    }
}
function moveLogRight(logRight)
{
    switch(true)
    {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}
function moveCarRight(carRight)
{
    switch(true)
    {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}
function moveCarLeft(carLeft)
{
    switch(true)
    {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

function lose()
{
    if(squares[startingIndex].classList.contains('c1')  
       || squares[startingIndex].classList.contains('l4')
       || squares[startingIndex].classList.contains('l5')
       || currentTime <= 0
    )
    {
        resultDisplay.textContent = 'You Loose!';
        clearInterval(timerID);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup',moveFrog);
        squares[startingIndex].classList.remove('frog');
    }
}
function win()
{
    if(squares[startingIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You WIN!';
        clearInterval(timerID);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup',moveFrog);   
    }

}
startPauseButton.addEventListener('click', () => {
    if(timerID) {
        clearInterval(timerID);
        clearInterval(outcomeTimerId);
        outcomeTimerId = null;
        timerID = null
        document.removeEventListener('keyup' , moveFrog);
    } else {
        timerID = setInterval(autoMoveLogs,1000);
        outcomeTimerId = setInterval(winLose,50);
        document.addEventListener('keyup' , moveFrog);
    }
})