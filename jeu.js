/*Gestion de la logique du planning poker*/
onload = fInit;
var currentCardId = "none"; // Carte actuellement sélectionnée par le joueur
var currentTaskIndex = 0;   // Tache a voter
var currentPlayerIndex = 0; // Joueur actuel
var settings = [];          // Dictionaire des paramètres sous ce format [mode: "mode", tVote: "nombre", tDebat: "nombre"]
var tasks = [];             // Liste des tâches
var selectedcard = [];      // Cartes choisises pendant le tour en cours
var results = [];           // Contient les difficultés trouvées pour chaque tâches

/**
 * Crée un eventListener dans la liste de carte qui modifie le currentCardID
 */
function fInitCard(){
    document.getElementById("cardList").addEventListener("click", (event) => { // On highlight la nouvelle carte et on la garde en mémoire
        if(currentCardId != "none") document.getElementById(currentCardId).classList.remove("highlighted")
        currentCardId = event.target.id;
        document.getElementById(currentCardId).classList.add("highlighted");
        console.log(currentCardId);
        afficherBoutonTourSuivant();
    });
    
}

/**
 * Cette fonction permet de créer dynamiquement un cercle ou sont positionnés les joueurs
 * l'item pseudos doit être déjà créé (ce qui ce fait sur la page pseudos)
 */
function fInitPLayers(){
    var theta = [];
    players = localStorage.getItem("pseudos");  // Stringified array
    players = JSON.parse(players).slice(1);     // Parsed array with title removed

    var setup = function (n, rx, ry, id) {
        var main = document.getElementById(id);
        var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
        var playerArray = [];
        var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 
        'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 
        'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red', 'green', 'purple', 'black', 
        'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 
        'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna'];
        for (var i = 0; i < n; i++) {
            var player = document.createElement('div');
            player.className = 'player number' + i;
            playerArray.push(player);
            playerArray[i].innerHTML = players[i];
            playerArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px';
            playerArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px';
            playerArray[i].style.position = "absolute";
            playerArray[i].style.color = colors[i];
            playerArray[i].style.top = ((mainHeight / 2) - parseInt(playerArray[i].posy.slice(0, -2))) + 'px';
            playerArray[i].style.left = ((mainHeight / 2) + parseInt(playerArray[i].posx.slice(0, -2))) + 'px';
            main.appendChild(playerArray[i]);
        }
    };

    var generate = function (n, rx, ry, id) {
        var frags = 360 / n;
        for (var i = 0; i <= n; i++) {
            theta.push((frags / 180) * i * Math.PI);
        }
        setup(n, rx, ry, id)
    }
    generate(players.length, 150, 75, 'playerList');
}
/**
 * Cette fonction permet d'afficher le bouton "Tour Suivant" lorsque la carte est sélectionnée.
 */
function afficherBoutonTourSuivant() {
    // Vérifiez si une carte est sélectionnée
    if (currentCardId !== "none" && !(document.getElementById("tourSuivantButton"))) {
        // Créez le bouton "Tour Suivant"
        var boutonTourSuivant = document.createElement("button");
        boutonTourSuivant.innerText = "Tour Suivant";
        boutonTourSuivant.id = "tourSuivantButton";

        // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
        boutonTourSuivant.addEventListener("click", function () {
            passerAuJoueurSuivant();
            var valeurCarte = ValeurCarte();
            selectedcard.push(valeurCarte);
            console.log(selectedcard);
            reinitialiserSelectionCarte();
            if (selectedcard.length >= players.length){
                alert('Tout les joueurs ont votés');
                passerTacheSuivante();
                selectedcard = [];
                return;
            }
        });

        // Ajoutez le bouton à l'élément du DOM approprié (par exemple, le corps du document)
        document.body.appendChild(boutonTourSuivant);
    }
}

/**
 * Fonction pour passer au joueur suivant
 */
function passerAuJoueurSuivant() {
    // Vérifiez si le tableau des joueurs est défini et n'est pas vide
    if (players && players.length > 0) {
        // Affiche le nom du joueur à qui est le tour dans la console (vous pouvez ajuster cela selon vos besoins)
        console.log("C'est le tour de :", players[currentPlayerIndex]);
        afficherCurrentPlayer();
        
        // Ajoutez ici la logique pour passer au joueur suivant
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        
    }
}
function afficherCurrentPlayer() {
    if (players && players.length > 0) {
        var currentPlayerElement = document.getElementById("currentPlayer");
        if (currentPlayerElement) {
            currentPlayerElement.innerText = "C'est le tour de : " + players[currentPlayerIndex];
        }
    }
}

/**
 * Gère le passage aux prochaines tâches
 * si le vote est ok on passe, sinon on gère la phase de négociation
 */
function passerTacheSuivante() {
    if (tasks && tasks.length > 0) {
        if (currentTaskIndex >= tasks.length){ // On gère la fin du jeu
            terminerJeu();
            console.log("Terminer jeu");
        }else{
            if(currentTaskIndex > 0){ // Si on est pas sur le premier tours on gère la fin du tour
                if(settings["mode"] == "Unanimité"){
                    // On passe en mode débat dès que 
                    if(!selectedcard.every(val => val === selectedcard[0])){
                        demarrerDebat();
                    }else{
                        if(selectedcard[0] == 102) { // Tout le monde demande une pause café
                            alert("Vous avez choisis de faire une pause");
                        }else{
                            results.push(selectedcard[0]); // On ajoute et on passe le tour
                            // On change la task en cours;
                            var currentTaskElement = document.getElementById("currentTask");
                            if (currentTaskElement){
                                currentTaskElement.innerHTML = tasks[currentTaskIndex];
                                currentTaskIndex += 1;
                            }
                        }
                    }
                }else if(settings["mode"] == "Majorité"){ // On teste si il y a une majorité
                    var count = {1 : 0, 2 : 0, 3 : 0, 5 : 0, 8 : 0, 13 : 0, 20 : 0, 40 : 0, 100 : 0, 101 : 0, 102 : 0}; 
                    var winner = -1;
                    selectedcard.forEach( (card) => {
                        count[card] += 1;
                    })
                    for(let key in count){
                        if(count[key] >= selectedcard.length / 2 + 1 && key != 101 && key != 102)
                            winner = key;
                    }
                    if(winner == -1){ // Si il n'y a pas de majorité
                        demarrerDebat();
                    }else{
                        results.push(winner);
                        // On change la task en cours;
                    var currentTaskElement = document.getElementById("currentTask");
                    if (currentTaskElement){
                        currentTaskElement.innerHTML = tasks[currentTaskIndex];
                        currentTaskIndex += 1;
                    }
                    }
                }
            }else{ // Sinon on passe juste au premier tour
                // On change la task en cours;
                var currentTaskElement = document.getElementById("currentTask");
                if (currentTaskElement){
                    currentTaskElement.innerHTML = tasks[currentTaskIndex];
                    currentTaskIndex += 1;
                }
            }
        }
    }
}

/**
 * Fonction pour réinitialiser la sélection de carte
 */
function reinitialiserSelectionCarte() {
    // Réinitialisez la carte sélectionnée et la mise en surbrillance
    if (currentCardId !== "none") {
        document.getElementById(currentCardId).classList.remove("highlighted");
        currentCardId = "none";
    }

    // Masquez le bouton "Tour Suivant" une fois le tour suivant commencé
    var boutonTourSuivant = document.getElementById("tourSuivantButton");
    if (boutonTourSuivant) {
        boutonTourSuivant.remove();
    }
}

// TODO
function demarrerDebat(){
    alert("Débat");
    console.log(selectedcard);
}

//TODO
function terminerJeu(){
    alert("jeu terminé");
}

function ValeurCarte(){
    if(currentCardId == "cint") return 101;
    if(currentCardId == "ccafe") return 102;
    return parseInt(currentCardId);;
}

function fInit() {
    fInitPLayers();
    fInitCard();
    tasks = JSON.parse(localStorage.getItem("tasks")).slice(1);
    settings = JSON.parse(localStorage.getItem("settings"));
    console.log(settings);

    // Assurez-vous que currentPlayerIndex est initialisé à 0
    currentPlayerIndex = 0;

    afficherCurrentPlayer();

    // Ajoutez un bouton pour démarrer le processus
    var demarrerButton = document.createElement("button");
    demarrerButton.innerText = "Démarrer";
    demarrerButton.addEventListener("click", function () {
        // Appel à passerAuJoueurSuivant() pour passer au premier joueur
        passerAuJoueurSuivant();
        passerTacheSuivante(); // On démarre la première tâche
        demarrerButton.remove();
    });

    // Ajoutez le bouton à l'élément du DOM approprié
    document.body.appendChild(demarrerButton);
}
