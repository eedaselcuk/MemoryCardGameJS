const cards = document.querySelectorAll('.memory-card');

let flippedCard = false;
let lockBoard = false;
let firstCard, secCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;       

        return;
    }
    else {
        
        secCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secCard.dataset.framework;

    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
            secCard.classList.remove('flip');

            resetBoard();

        }, 1500);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));