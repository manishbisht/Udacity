/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

let sectionData = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Create navigation elements
function createNavigation() {
    let navigationNode = document.getElementById("navbar__list");
    for (let i = 0; i < sectionData.length; i++) {
        navigationNode.appendChild(createNavigationItem(sectionData[i]))
    }
}

// Create navigation item
function createNavigationItem(navigationItem) {
    let liNode = document.createElement("LI");
    let divNode = document.createElement("DIV");
    divNode.classList.add("menu__link");
    let textNode = document.createTextNode(navigationItem.dataset.nav);
    divNode.appendChild(textNode);
    liNode.appendChild(divNode);
    return liNode;
}

// Get page navigation height
function getPageHeaderHeight() {
    return document.getElementsByClassName("page__header")[0].getBoundingClientRect().height;
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
createNavigation();

// Add class 'active' to section when near top of viewport
window.onscroll = function () {
    changeSectionActiveClass();
};

// Scroll to anchor ID using scrollTO event
function scrollPage(index) {
    let sections = document.getElementsByTagName("SECTION");
    let sectionBounding = sections[index].getBoundingClientRect();
    let sectionHeightFromTop = sectionBounding.top - getPageHeaderHeight() + 1;
    window.scrollBy(0, sectionHeightFromTop)
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
function addClickEventListenerToNavigationItems() {
    let navigationItems = document.getElementsByTagName("LI");
    for (let i = 0; i < navigationItems.length; i++) {
        navigationItems[i].addEventListener("click", () => scrollPage(i));
    }
}

// Scroll to section on link click
addClickEventListenerToNavigationItems();

// Set sections as active
function changeSectionActiveClass() {
    let sections = document.getElementsByTagName("SECTION");
    let isActiveSet = false;
    for (let i = 0; i < sections.length; i++) {
        let sectionBounding = sections[i].getBoundingClientRect();
        let sectionHeight = sectionBounding.top + sectionBounding.height - getPageHeaderHeight();
        if (isActiveSet) {
            sections[i].removeAttribute("class");
        } else if (sectionHeight > 0) {
            if (sections[i].classList[0] !== "your-active-class") {
                sections[i].classList.add("your-active-class");
            }
            isActiveSet = true;
        } else {
            sections[i].removeAttribute("class");
        }
    }
}