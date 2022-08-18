const cardsList = []
let cards = 0;

function chooseCards(){
    while(true){
        cards = prompt("Com quantas carta vc quer jogar?")
        if (cards > 3 && cards < 15  && cards%2 == 0){
            break
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SortingCards(){
    let cardsPossible = ["bobrossparrot","explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot","tripletsparrot", "unicornparrot"]

    for(let i = 0; i < cards/2 ; i++){
        let temp = "";
        let randomizerExtriction = cardsPossible.length -1
        random = getRandomInt(0,randomizerExtriction);

        cardsList.push(cardsPossible[random])       
        cardsList.push(cardsPossible[random])

        temp = cardsPossible[random]
        cardsPossible[random] = cardsPossible[cardsPossible.length-1]
        cardsPossible[cardsPossible.length-1] = temp
        cardsPossible.pop()
    }
}

function MountingCards(){
    let randomizerExtriction = cardsList.length
    let board  = document.querySelector("ul")

    for(let i = 0; i < cards; i++){

        let random = getRandomInt(0,randomizerExtriction -1);
        randomizerExtriction--

        board.innerHTML += `
        <li onclick="turnCard(this)">
            <div class="front-face">
                <img src="images/front.png">
            </div>
            <div class="back-face">
                <img src="images/parrots/${cardsList[random]}.gif">
            </div>
        </li>
        `
        temp = cardsList[random]
        cardsList[random] = cardsList[cardsList.length-1]
        cardsList[cardsList.length-1] = temp
        cardsList.pop()


    }

}

function turnCard(cardChosen){
    cardChosen.classList.add("turned")
    
}

chooseCards()
SortingCards()
MountingCards()
