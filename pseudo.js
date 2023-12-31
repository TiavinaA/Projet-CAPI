
var maxPlayers = 10;
var playerCount = 0;//Compteur de joueurs
function ajouterPseudo() {
    //Vérifie que le nombre max n'est pas atteint
    if (playerCount >= maxPlayers) {
        alert("Vous avez atteint le nombre maximal de joueurs");
        return;
    }
    //AJoute le pseudo dans la liste
    var pseudoInput = document.getElementById("pseudo");
    var pseudo = pseudoInput.value;

    //Affichage du pseudo
    if (pseudo.trim() !== "") {
        // Ligne d'affichage du pseudo
        var ligneJoueur = document.createElement("div");
        ligneJoueur.className = "ligneJoueur";
        var pseudoElement = document.createElement("p");
        pseudoElement.className = "pseudo-text";
        pseudoElement.textContent = pseudo;
        ligneJoueur.appendChild(pseudoElement);

        //Ajout du bouton supprimer
        var buttonsDiv = document.createElement("div");
        buttonsDiv.className = "player-buttons";
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.onclick = function(){
            supprimerPseudo(ligneJoueur);
        }
        buttonsDiv.appendChild(deleteButton);
        ligneJoueur.appendChild(buttonsDiv);

        //Affichage dans la liste
        var pseudosList = document.getElementById("pseudos-list");
        pseudosList.appendChild(ligneJoueur);

        // Réinitialise le formulaire
        document.getElementById("myForm").reset();

        // Incrémente le compteur de joueurs
        playerCount++;
        afficherBouton();
    } else {
        alert("Veuillez entrer un pseudo valide.");
    }
}

function supprimerPseudo(playerEntry) {
    // Supprime l'entrée du joueur de la liste
    var pseudosList = document.getElementById("pseudos-list");
    pseudosList.removeChild(playerEntry);
    //Réduit le nombre de joueurs
    playerCount--;
    afficherBouton();
}

// Si il n'y a pas de joueur isncrit, on ne peut pas continuer
function afficherBouton(){
    var nextButton = document.getElementById("nextButton");
    if (playerCount > 0){
        nextButton.style.display = "block";
    } else {
        nextButton.style.display = "none";
    }
}
// Fonction pour sauvegarder les pseudos dans localStorage
function sauvegarderPseudos() {
    var pseudosList = document.getElementById("pseudos-list");
    var pseudos = Array.from(pseudosList.children).map(function(playerEntry) {
        return playerEntry.firstChild.textContent;
    });

    localStorage.setItem('pseudos', JSON.stringify(pseudos));
}