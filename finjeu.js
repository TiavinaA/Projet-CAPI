onload = fInit;
var tasks, results;


function saveJson() {
    // Crée un objet contenant les données à sauvegarder
    var dataToSave = {
        tasks: tasks,
        results: results
    };

    // Convertit l'objet en chaîne JSON
    var jsonData = JSON.stringify(dataToSave, null, 2); // null, 2 pour l'indentation de deux espaces

    // Crée un objet Blob contenant le fichier JSON
    var blob = new Blob([jsonData], { type: 'application/json' });

    // Crée un objet URL pour le Blob
    var url = URL.createObjectURL(blob);

    // Crée un élément d'ancrage invisible
    var a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

    // Ajoute l'élément d'ancrage à la page et déclenche un clic sur celui-ci
    document.body.appendChild(a);
    a.click();

    // Supprime l'élément d'ancrage de la page
    document.body.removeChild(a);
    // Révoque l'URL de l'objet Blob
    URL.revokeObjectURL(url);

    console.log("Save to JSON");
}

function fInit() {
    tasks = JSON.parse(localStorage.getItem("tasks")).slice(1);
    results = JSON.parse(localStorage.getItem("results"));

    var taskList = document.getElementById("taskList");
    for (let i = 0; i < tasks.length; i++) {
        var taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = tasks[i] + " difficulté : " + results[i];
        taskList.appendChild(taskElement);
    }
}
