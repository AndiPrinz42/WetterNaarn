let dropdownHeaders = document.querySelectorAll(".iocn-link");
for (var i = 0; i < dropdownHeaders.length; i++) {
    dropdownHeaders[i].addEventListener("click", (e) => {
        let dropdownParent = e.target.closest('li');

        dropdownParent.classList.toggle("showMenu");

        dropdownHeaders.forEach(element => {
            if (element != e.target.closest('.iocn-link')) {
                element.closest('li').classList.remove("showMenu");
            }
        });
    });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".menu");
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    sidebarBtn.classList.toggle("close");
    sidebarBtn.classList.toggle("bx-menu");
    sidebarBtn.classList.toggle("bx-x");
});

addEventListener('resize', () => {
    sidebar.classList.add("close");
    sidebarBtn.classList.add("close");
    sidebarBtn.classList.remove("bx-x");
    sidebarBtn.classList.add("bx-menu");
});


function deleteAll() {
    document.body.innerHTML = "";
}
