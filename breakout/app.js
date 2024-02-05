const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');
const blockWidth = 100;
const blockHeight = 20;
const boardWeight =  570;
const boardHeight = 300;

const userStart = [230 , 10];
let ballPosition = [270 , 40];
let currentPosition = userStart;
let ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;
let score = 0;

// create block
class Block {
    constructor(xAxis , yAxis) {
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis+blockWidth,yAxis];
        this.topLeft = [xAxis,yAxis+blockHeight];
        this.topRight = [xAxis+blockWidth,yAxis+blockHeight];
    }
}

// draw all blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

// draw my block
function addBlock()
{
    for(let i=0 ; i<blocks.length ; i++)
    {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlock();

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

const user = document.createElement('div');
user.classList.add('purple');
drawUser();
grid.appendChild(user);

// move user 
function moveUser(e)
{
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < 570 - 100) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown' , moveUser);

// draw the ball

function drawBall()
{
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
}

const ball = document.createElement('div');
drawBall();
ball.classList.add('ball');
grid.appendChild(ball)

// move ball

function moveBall()
{
    ballPosition[0] += xDirection;
    ballPosition[1] += yDirection;
    drawBall();
    checkForCollision();
}
let timerId = setInterval(moveBall,30);

// check for collisons

function checkForCollision()
{
    // check for block collision 
    for(let i=0 ; i<blocks.length ; i++)
    {
        if(
            (ballPosition[0]>blocks[i].bottomLeft[0] && ballPosition[0]<blocks[i].bottomRight[0]) && 
            ((ballPosition[1]+ballDiameter)>blocks[i].bottomLeft[1] && ballPosition[1]<blocks[i].topLeft[1]) 
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            score++;
            scoreDisplay.textContent = score;
            changeDirection();

            if(blocks.length === 0)
            {
                scoreDisplay.innerHTML = 'YOU WIN!';
                clearInterval(timerId);
                document.addEventListener('keydown' , moveUser);
            }
        }
    }

    // check for user collision

    if((ballPosition[0]>currentPosition[0] && ballPosition[0]<currentPosition[0]+blockWidth) &&
        ballPosition[1]>currentPosition[1] && ballPosition[1]<currentPosition[1]+blockHeight
    ) {
        changeDirection();
    }
    if(ballPosition[0] >= (boardWeight - ballDiameter)
       || ballPosition[1] >= (boardHeight - ballDiameter)
       || ballPosition[0] <= 0
    ) {
        changeDirection();
    }

    // game over 
    if(ballPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose!';
        document.removeEventListener('keydown',moveUser);
    }
}

function changeDirection()
{
    if(xDirection===2 && yDirection===2)
    {
        yDirection = -2;
        return;
    }
    
    if(xDirection===2 && yDirection===-2)
    {
        xDirection = -2;
        return;
    }

    if(xDirection===-2 && yDirection===2) {
        xDirection = 2;
        return;
    }

    if(xDirection===-2 && yDirection===-2) {
        yDirection = 2;
        return;
    }
}