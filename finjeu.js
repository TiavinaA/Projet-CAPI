onload = fInit;
var tasks, results;

/**
 * Saves the results to a JSON file
 * TODO
 */
function saveJson(){
    console.log("Save to JSON");
}

function fInit(){
    tasks = JSON.parse(localStorage.getItem("tasks")).slice(1);
    results = JSON.parse(localStorage.getItem("results"));
    
    //On affiche chaque tâche et sa difficulté
    var taskList = document.getElementById("taskList");
    for(let i = 0; i < tasks.length; i++){
            var taskElement = document.createElement("div");
            taskElement.classList.add("task");
            taskElement.innerHTML = tasks[i] + " difficulté : " + results[i];
            taskList.appendChild(taskElement);
    }
}