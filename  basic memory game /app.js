const cardArray = [
    {
        name: 'fries',
        img: 'assets/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'assets/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'assets/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'assets/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'assets/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'assets/pizza.png'
    },
    {
        name: 'fries',
        img: 'assets/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'assets/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'assets/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'assets/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'assets/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'assets/pizza.png'
    },
]

cardArray.sort(() => 0.5 - Math.random());

let displayCard = document.querySelector('.grid');
let cardChosen = [];
let cardChosenIds = [];
let result = document.getElementById('result');
let value = 0;
let cardWon = [];

function createBoard()
{
    for(let i=0 ; i<cardArray.length ; i++)
    {
        const card = document.createElement('img');
        card.setAttribute('src','assets/blank.png');
        card.setAttribute('data-id',i);
        card.addEventListener('click',flipCard)
        displayCard.appendChild(card);
    }
}
createBoard();

function checkMatch()
{
    const cards = document.querySelectorAll('img');
    if(cardChosenIds[0] === cardChosenIds[1])
    {
        cards[cardChosenIds[0]].setAttribute('src' , 'assets/blank.png');
        alert('You have clicked the same image!');
    }
    else if(cardChosen[0] === cardChosen[1])
    {
        cards[cardChosenIds[0]].setAttribute('src' , 'assets/white.png');
        cards[cardChosenIds[1]].setAttribute('src' , 'assets/white.png');
        cards[cardChosenIds[0]].removeEventListener('click',flipCard);
        cards[cardChosenIds[1]].removeEventListener('click',flipCard);
        cardWon.push(cardChosen);
        value += 2;
        result.innerText = value;
    }
    else
    {
        cards[cardChosenIds[0]].setAttribute('src' , 'assets/blank.png');
        cards[cardChosenIds[1]].setAttribute('src' , 'assets/blank.png');
    }
    cardChosen = [];
    cardChosenIds = [];

    if(cardWon.length === cardArray.length/2)
    {
        result.innerHTML = 'Congratulations you found them all!';
    }
}

function flipCard()
{
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src' , cardArray[cardId].img);
    if(cardChosen.length === 2)
    {
        setTimeout(checkMatch , 500);
    }
}

