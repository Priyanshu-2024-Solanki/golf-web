const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');
let currentShootingIndex = 202;
let width = 15;
let invaderID;
let direction = 1;
let goingRight = 1;
let aliensRemoved = [];
let results = 0;

for(let i=0 ; i<225 ; i++)
{
    const square = document.createElement('div');
    grid.appendChild(square);
}

const alienInvader = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

const squares = Array.from(document.querySelectorAll('.grid div'))

function draw()
{
    for(let i=0 ; i<alienInvader.length ; i++)
    {
        if( !aliensRemoved.includes(i))
           squares[alienInvader[i]].classList.add('invader');
    }
}
function remove()
{
    for(let i=0 ; i<alienInvader.length ; i++)
    {
        squares[alienInvader[i]].classList.remove('invader');
    }
}
draw();

squares[currentShootingIndex].classList.add('shooter');

function moveShooter(e)
{
    squares[currentShootingIndex].classList.remove('shooter');
    switch(e.key)
    {
        case 'ArrowLeft':
            if(currentShootingIndex % width != 0) currentShootingIndex -= 1;
            break;
        case 'ArrowRight':
            if(currentShootingIndex%width < width-1) currentShootingIndex += 1;
            break;
    }
    squares[currentShootingIndex].classList.add('shooter');
}
document.addEventListener('keydown' , moveShooter);

function moveInvader()
{
    remove();

    let leftEdge = alienInvader[0]%width === 0;
    let rightEdge = alienInvader[alienInvader.length-1]%width === width-1;
    let f = 0;

    if(rightEdge && goingRight)
    {
        for(let i=0 ; i<alienInvader.length ; i++)
        {
            alienInvader[i] += width-1;
            direction = -1;
            goingRight = false;
        }
    }
    if(leftEdge && !goingRight)
    {
        for(let i=0 ; i<alienInvader.length ; i++)
        {
            alienInvader[i] += width+1;
            direction = 1;
            goingRight = true;
        }
    }

    for(let i=0 ; i<alienInvader.length ; i++)
    {
        alienInvader[i] += direction;
    }
    draw();

    if(squares[currentShootingIndex].classList.contains('invader','shooter'))
    {
        resultDisplay.textContent = 'GAME OVER!';
        clearInterval(invaderID);
        document.removeEventListener('keydown',moveShooter);
    }

    for(let i=0 ; i<alienInvader.length ; i++)
    {
        if(alienInvader[i]+width>squares.length-1)
        {
            resultDisplay.textContent = 'GAME OVER!';
            clearInterval(invaderID);
            document.removeEventListener('keydown',moveShooter);
        }
    }

    if(aliensRemoved.length === alienInvader.length)
    {
        clearInterval(invaderID);
        resultDisplay.innerHTML = 'YOU WON!';
    }
}
invaderID = setInterval(moveInvader,1000);

function shoot(e)
{
    let laserId;
    let currentLaserIndex = currentShootingIndex;
    function moveLaser()
    {
        squares[currentLaserIndex].classList.remove('laser');
        if(currentLaserIndex - width >= 0)
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if(squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom') , 300);
            clearInterval(laserId);

            const alienRemoved = alienInvader.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML = results;
        }
    }
    switch(e.key)
    {
        case 'ArrowUp':
            laserId = setInterval(moveLaser,100);
    }
}

document.addEventListener('keydown',shoot);