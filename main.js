var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-320px";
}

if (sidemenu) {
    sidemenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closemenu);
    });
}
