import {cardsData} from "./cards.js";
const cardTemplate = document.querySelector('.card');
const gameBoardElement = document.querySelector('.game__board-area');

const gameState = {
    firstCard : null,
    secondCard : null,
    lockBoard : false,
    clearAll(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    },
    compareFirstSecond(){
        return this.firstCard.dataset.name == this.secondCard.dataset.name;
    }
}

const createCard = (card) =>{
    let clonnedCard = cardTemplate.cloneNode(true);
    clonnedCard.addEventListener('click', cardClick);
    clonnedCard.querySelector('.card__back').setAttribute('src', card.src );
    clonnedCard.querySelector('.card__front').setAttribute('src', './imgs/hextech.webp' );
    clonnedCard.dataset.name = card.name;
    return clonnedCard;
}

const createCards = ()=>{ 
    cardsData.forEach(card =>{
        gameBoardElement.appendChild(createCard(card));
        gameBoardElement.appendChild(createCard(card));
    })
    cardTemplate.style.display = 'none';
}

const shuffle = ()=> {
    let cards = gameBoardElement.querySelectorAll('.card');
    cards.forEach(card => {
        console.log(card);
        card.style.order = Math.floor(Math.random() * 12);
    });
}

function cardClick(){
    if(this.classList.contains('flip')) return;
    if(gameState.lockBoard) return;

    this.classList.toggle('flip');
    if(gameState.firstCard==null)
        gameState.firstCard=this;
    else{
        gameState.secondCard = this;
        cardMatch();
    } 
}

function unflipCards(){
    gameState.lockBoard = true;

    setTimeout(()=>{
        gameState.secondCard.classList.toggle('flip');
        gameState.firstCard.classList.toggle('flip');
        gameState.clearAll();
    }, 1500) 
}

function cardMatch(){
    if(!gameState.compareFirstSecond()){
        unflipCards();
        return;
    }
    gameState.clearAll();
}

function startGame(){
    createCards();
    shuffle();
}

startGame();

