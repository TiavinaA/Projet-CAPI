/*Gestion de la sauvegarde des paramètre en local*/
onload = fInit;

function InitForm() {
    const form = document.getElementById("setupForm")
    form.addEventListener("submit", (event) => {
        // On empêche la soumission par défaut du formulaire
        event.preventDefault();

        // Récupérer les valeurs du formulaire
        var mode = form["mode"].value;
        var tVote = form["tVote"].value;
        var tDebat = form["tDebat"].value;

        // Stocker les valeurs dans localStorage
        var settings = { mode: mode, tVote: tVote, tDebat: tDebat };
        localStorage.setItem("settings", JSON.stringify(settings));

        // Rediriger vers pseudo.html
        window.location.href = "pseudo.html";
    });
}

function fInit() {
    InitForm();
}
