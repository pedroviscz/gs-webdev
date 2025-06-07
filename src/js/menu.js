export const mobileMenu = () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const toggleMenu = () => {
        navMenu.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    }

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });
}