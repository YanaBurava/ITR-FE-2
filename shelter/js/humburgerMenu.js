const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.menu-icon');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
    menu.classList.toggle('menu-open');
    overlay.classList.toggle('overlay_show');  // Используем CSS для скрытия/показа
}

menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function handleMenuLink(e) {
    const link = e.target;

    if (link.matches('.menu__link')) {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            const targetElement = document.querySelector(href);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }

            menu.classList.remove('menu-open');
            overlay.classList.remove('overlay_show');
        }
    }
}

menu.addEventListener('click', handleMenuLink);
