const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let time = 10;
let hitPosition;
let timerId = null;

function randomSquare()
{
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomPlace = squares[Math.floor(Math.random() * 9)];
    randomPlace.classList.add('mole');
    hitPosition = randomPlace.id;
}
function moveMole()
{
    timerId = setInterval(randomSquare , 500);
}
moveMole();

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id === hitPosition)
        {
            result++;
            score.textContent = result;
        }
    })
})

function countDown()
{
    time--;
    timeLeft.textContent = time;

    if(time === 0)
    {
        clearInterval(countDownTimer);
        alert('GAME OVER! Your final score is ' + result);
        clearInterval(timerId);
    }
}

let countDownTimer = setInterval(countDown , 1000);