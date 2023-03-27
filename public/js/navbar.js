function navbar_changer(nav_item) {
    let navbar_item = document.getElementById(nav_item);
    let navbar_item_Classname = document.getElementsByClassName('nav-link');
    for (let index = 0; index < navbar_item_Classname.length; index++) {
        navbar_item_Classname[index].classList.remove("active");
    }
    navbar_item.classList.add("active");
}