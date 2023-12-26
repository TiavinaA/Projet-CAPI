/*Gestion de la logique du planning poker*/
onload = fInit;
var currentCardId = "none";

function fInitCard(){
    document.getElementById("cardList").addEventListener("click", (event) => { // On highlight la nouvelle carte et on la garde en mémoire
        if(currentCardId != "none") document.getElementById(currentCardId).classList.remove("highlighted")
        currentCardId = event.target.id;
        document.getElementById(currentCardId).classList.add("highlighted")
    })
}

function fInit(){
    fInitCard();
}