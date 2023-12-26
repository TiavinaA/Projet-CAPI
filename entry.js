onload = fInit;

/*Initialise le formulaire avec un event listener qui crée des nodes tasks a chaque validation du formulaire*/
function initForm(){
    const form = document.getElementById("EntryForm1")
    form.addEventListener("submit", (event) => {
        //On empeche de submit
        event.preventDefault();
        //On crée un paragraphe qui contient la tache
        var task = form['newEntryField'].value;
        if (task != "") {
            var taskContainer = document.getElementById("entryList");
            
            var taskElement = document.createElement("p");
            taskElement.classList.add("task");
            taskElement.innerHTML = task;
            var taskModifButton = document.createElement("input");
            taskModifButton.type = "button";
            taskModifButton.value = "supprimer";
            taskModifButton.addEventListener("click", supprTask);
            taskModifButton.classList.add("taskModifButton");
            
            taskElement.appendChild(taskModifButton);
            taskContainer.appendChild(taskElement);

            form.reset();
        }
    })
    // Event listener pour sauver les tasks et passer au jeu
    document.getElementById("EntryValidation").addEventListener("click", finishEntryList);
}

function supprTask(event){
    this.parentNode.parentNode.removeChild(this.parentNode);
}

/* Prend la liste de nodes tasks et crée un array plus facile à utiliser pour le jeu*/
function finishEntryList(){
    const entryListElement = document.getElementById("entryList");
    var taskArray = Array();
    entryListElement.childNodes.forEach((task) => {
        let str = String(task.innerHTML);
        taskArray.push(str.replace("<input type=\"button\" value=\"supprimer\" class=\"taskModifButton\">", ""));
    })
    // On utilise localstorage afin de rester vanilla en ayant toujours plusieurs pages
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}


function fInit(){
    console.log(localStorage.getItem("tasks"));
    initForm();
}