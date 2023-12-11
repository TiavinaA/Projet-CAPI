onload = fInit;

InitForm(){
    const form = document.getElementById("setupForm")
    form.addEventListener("submit", (event) => {
        //On empeche de submit
        event.preventDefault();
    })
}

function Init(){
    fInitForm();
}