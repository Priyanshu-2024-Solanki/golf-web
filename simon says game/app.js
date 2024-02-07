let gameSeq = [];
let userSeq = [];
let btns = ["yellow" , "red" , "purple" , "green"];
const levelDisplay = document.querySelector('h2');

let started = false;
let level = 0;
let currLevel = 0;

document.addEventListener('keypress',function() {
    if(!started) {
        levelUp();
        started = true;
    }
});

function btnFlash(btn)
{
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },500);
}

function userFlash(btn)
{
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function flashUp()
{
    let randomIdx = Math.floor(Math.random()*3);
    let randomClr = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomBtn.id);
    // console.log(gameSeq); (get the hint)
    btnFlash(randomBtn);
}

function levelUp()
{
    userSeq = [];
    currLevel = 0;
    level++;
    levelDisplay.innerHTML = `Level ${level}`;
    flashUp();
}

function reset()
{
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
    currLevel = 0;
}

function checkAns()
{
    if(gameSeq[currLevel] === userSeq[currLevel])
    {
        currLevel++;
        if(currLevel ===  gameSeq.length)
        {
            levelUp();
        }
    }   
    else {
        levelDisplay.innerHTML = `GAME OVER! Your score was <b>${currLevel+1}</b><br> Press any key to start the game`;
        const body = document.querySelector('body');
        body.style.backgroundColor = 'red';
        setTimeout(function(){
            body.style.backgroundColor = 'white';
        },300);
        reset();
    }
}

function btnPress()
{
    userFlash(this);
    userSeq.push(this.id);
    checkAns();
}

let allBtn;
const allBtns = document.querySelectorAll('.btn');
for(allBtn of allBtns)
{
    allBtn.addEventListener('click',btnPress);
}