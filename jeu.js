/*Gestion de la logique du planning poker*/
onload = fInit;
var currentCardId = "none"; // Carte actuellement sélectionnée par le joueur
var currentTaskIndex = 0;   // Tache a voter
var currentPlayerIndex = 0; // Joueur actuel
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
            if (selectedcard.length == players.length){
                alert('Tout les joueurs ont votés');
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
//function passerTacheSuivante() {
//}

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


function ValeurCarte(){
    var valeur = parseInt(currentCardId);
    return valeur;
}

function fInit() {
    fInitPLayers();
    fInitCard();
    tasks = 
    console.log(players);

    // Assurez-vous que currentPlayerIndex est initialisé à 0
    currentPlayerIndex = 0;

    afficherCurrentPlayer();

    // Ajoutez un bouton pour démarrer le processus
    var demarrerButton = document.createElement("button");
    demarrerButton.innerText = "Démarrer";
    demarrerButton.addEventListener("click", function () {
        // Appel à passerAuJoueurSuivant() pour passer au premier joueur
        passerAuJoueurSuivant();
        demarrerButton.remove();
    });

    // Ajoutez le bouton à l'élément du DOM approprié
    document.body.appendChild(demarrerButton);
}
