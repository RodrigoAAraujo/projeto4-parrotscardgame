/*-----------Game Setup Variables-------------*/
let cards = 0;
let cardsList = []
let cardsChosenList = []
let animation = 0;
let counter = 0;
let cardTurnedinGame =0
let board  = document.querySelector("ul")
const counterBlock = document.querySelector(".counter")
const number = document.querySelector(".counter p ")
const counterId= setInterval(counterUp,1000)



let record = Infinity

/*-----------Game Behaviors Variables---------*/
let FirstCard = false
let FirstCardChosen = ""
let SecondCardChosen = ""

/*-------------Pre functions------------*/
function reset(){
    cards = 0;
    cardsList = []
    cardsChosenList = []
    animation = 0;
    counter = 0;
    cardTurnedinGame =0
    board.innerHTML =""
    counterBlock.classList.add("hidden")
}

function animationFinished(){
    animation = 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessFail(){
    cardsChosenList.pop()
    cardsChosenList.pop()
    
    SecondCardChosen.classList.remove("turned")
    FirstCardChosen.classList.remove("turned")
}

function turnCards(){
    let childNodes = document.querySelectorAll("li")
    childNodes.forEach(element => {element.classList.add("turned")});
}

function ReturnCards(){
    let childNodes = document.querySelectorAll("li")
    childNodes.forEach(element => {element.classList.remove("turned")});
}
/*------------Base functions-------------*/

function chooseCards(){
    while(true){
        cards = prompt("Com quantas carta vc quer jogar?")
        if (cards > 3 && cards < 15  && cards%2 == 0){
            break
        }
    }
    sortingCards()
}

function sortingCards(){
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
    mountingCards()
}

function mountingCards(){
    let randomizerExtriction = cardsList.length

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
    showingCards()
}

function showingCards(){
    animation=1    
    setTimeout(turnCards, 100)
    setTimeout(ReturnCards, 2500)
    setTimeout(animationFinished,3000)
    setTimeout(startCounter,3000)
}

function startCounter(){
    counter =0
    number.innerHTML = counter
    counterBlock.classList.remove("hidden")
}

function counterUp(){    
    counter ++
    number.innerHTML = counter
}

/*-----------In Game functions------------ */

function turnCard(cardChosen){

    if (animation ==0 && !FirstCard && !cardChosen.classList.contains("turned")){
        animation = 1
        cardChosen.classList.add("turned")
        setTimeout(animationFinished, 20)
        let type = cardChosen.querySelector(".back-face img")
        cardsChosenList.push(type.src)
        

        FirstCard = true
        FirstCardChosen = cardChosen
        cardTurnedinGame++
    }

    if (animation==0 && FirstCard && !cardChosen.classList.contains("turned")){
        animation = 1
        cardChosen.classList.add("turned")
        setTimeout(animationFinished, 1000)
        let type = cardChosen.querySelector(".back-face img")
        cardsChosenList.push(type.src)

        SecondCardChosen = cardChosen

        for(n=0; n <cardsChosenList.length; n+=2){
            m = n +1
            if (cardsChosenList[n] !== cardsChosenList[m] && cardsChosenList[m] !== null){
                setTimeout(guessFail, 1000)
            }
        }

        FirstCard = false
        cardTurnedinGame++

        if (cards == cardsChosenList.length){
            setTimeout(endGame,600)
        }
    }
}

function endGame(){
    animation = 1
    newRecord = cardTurnedinGame
    if (newRecord<record){
        record = newRecord
    }
    alert(`Você ganhou em ${cardTurnedinGame} jogadas e ${counter} segundos.\n Seu Recorde: ${record} jogadas.`)

    while(true){
        let answer = prompt("Gostaria de reiniciar a partida? (escreva sim ou não)")
        if(answer.toLowerCase() == "sim"){
            reset()
            chooseCards()
            break
        }else if(answer.toLowerCase() == "não"){
            alert(`Recorde: ${record} jogadas.`)
        }else{
            alert("Não é uma resposta válida.")
        }
    }
    
}

chooseCards()



