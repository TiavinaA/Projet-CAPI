onload = fInit;

/*var $setter = $("#setter");
$setter.siblings(".wrap").css("max-width", $setter.width()+"px");
 */

function initForm(){
    const form = document.getElementById("EntryForm1")
    form.addEventListener("submit", (event) => {
        //On empeche de submit
        event.preventDefault();
        //On crée un paragraphe qui contient la tache
        var task = form['newEntryField'].value;
        var taskContainer = document.getElementById("entryList");
        
        var taskElement = document.createElement("p");
        taskElement.classList.add("task");
        taskElement.innerHTML = task;
        var taskModifButton = document.createElement("input");
        taskModifButton.type = "button";
        taskModifButton.value = "modifier";
        taskModifButton.onclick = "modifTask()";
        taskModifButton.classList.add("taskModifButton");
        
        taskElement.appendChild(taskModifButton);
        taskContainer.appendChild(taskElement);

        form.reset();
    })
}

function finishEntryList(){
}


function fInit(){
    initForm();
}

