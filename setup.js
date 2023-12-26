/*Gestion de la sauvegarde des paramètre en local*/
onload = fInit;

function InitForm(){
    const form = document.getElementById("setupForm")
    form.addEventListener("submit", (event) => {
        //On empeche de submit
        event.preventDefault();
        var settings = Array();
        settings.push(form["mode"])
        settings.push(form["tVote"])
        settings.push(form["tDebat"])
        localStorage.setItem("settings", JSON.stringify(settings))
    })
}

function fInit(){
    InitForm();
}