const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.menu-icon');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
    const isOpen = menu.classList.contains('open');

    if (isOpen) {
        // Если меню открыто — закрываем его и затемнение одновременно
        menu.classList.remove('open');
        overlay.classList.remove('overlay_show');
    } else {
        // Если меню закрыто — открываем его и затемнение одновременно
        menu.classList.add('open');
        overlay.classList.add('overlay_show');
    }
}

menuIcon.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

menu.addEventListener('click', (e) => {
    const link = e.target.closest('.menu__link'); // Используем `closest` для надежности
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href');

    console.log('Клик по ссылке:', href);

    // Закрываем меню и затемнение
    menu.classList.remove('open');
    overlay.classList.remove('overlay_show');

    console.log('После клика:');
    console.log('Menu open:', menu.classList.contains('open'));
    console.log('Overlay visible:', overlay.classList.contains('overlay_show'));

    if (href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }
});
