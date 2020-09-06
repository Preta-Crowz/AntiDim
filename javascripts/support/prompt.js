const prompt = function(message, after){
    var diag = $("#prompt")[0];
    diag.setAttribute("style", "display: block; width: 20em; height: 12em; z-index: 10000;");
    diag.children[0].textContent = message;
    diag.children[1].value = "";
    diag.children[2].onclick = () => {
        diag.setAttribute("style", "display: none;");
        after(diag.children[1].value);
    };
    diag.children[3].onclick = () => {
        diag.setAttribute("style", "display: none;");
    };
}

this.prompt = prompt;
global.prompt = prompt;
window.prompt = prompt;