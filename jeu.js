/*Gestion de la logique du planning poker*/
onload = fInit;
var currentCardId = "none"; // Carte actuellement sélectionnée par le joueur

/**
 * Crée un eventListener dans la liste de carte qui modifie le currentCardID
 */
function fInitCard(){
    document.getElementById("cardList").addEventListener("click", (event) => { // On highlight la nouvelle carte et on la garde en mémoire
        if(currentCardId != "none") document.getElementById(currentCardId).classList.remove("highlighted")
        currentCardId = event.target.id;
        document.getElementById(currentCardId).classList.add("highlighted");
    })
}

/**
 * Cette fonction permet de créer dynamiquement un cercle ou sont positionnés les joueurs
 * l'item pseudos doit être déjà créé (ce qui ce fait sur la page pseudos)
 */
function fInitPLayers(){
    var theta = [];
    var players = localStorage.getItem("pseudos");  // Stringified array
    players = JSON.parse(players).slice(1);         // Parsed array with title removed

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
    console.log(players.length);
}

function fInit(){
    fInitPLayers();
    fInitCard();
}