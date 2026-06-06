document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ПЛАВНЫЕ АККОРДЕОНЫ ДЛЯ ПРЕИМУЩЕСТВ
    // ==========================================
    const benefitItems = document.querySelectorAll('.benefits__item');

    benefitItems.forEach(item => {
        const summary = item.querySelector('.benefits__summary');
        const content = item.querySelector('.benefits__content');

        summary.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Закрываем все остальные открытые вкладки (эффект "одиночного аккордеона")
            benefitItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.benefits__content').style.maxHeight = null;
                }
            });

            // Переключаем текущую вкладку
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                // scrollHeight динамически вычисляет точную высоту текста в пикселях
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
    // ==========================================
    // Находим все элементы, у которых есть класс .anim-fade
    const scrollAnimationElements = document.querySelectorAll('.anim-fade');

    const observerOptions = {
        root: null, // следим относительно области видимости экрана
        threshold: 0.1, // анимация сработает, когда 10% блока покажутся на экране
        rootMargin: "0px 0px -50px 0px" // срабатывает чуть раньше, чем блок дойдет до низа экрана
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Отключаем слежку за элементом после того, как он один раз плавно появился
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnimationElements.forEach(element => {
        appearanceObserver.observe(element);
    });

    // ==========================================
    // 3. УЛУЧШЕНИЕ СВАЙПОВ НА МОБИЛКАХ (Scroll Snap)
    // ==========================================
    // Поскольку мы использовали CSS Scroll Snap, карточки уже идеально свайпаются пальцем.
    // Добавим легкий JS-фикс: если пользователь кликнет на карточку преподавателя на ПК,
    // она плавно отцентрируется (удобно для демонстрации заказчику мышкой).
    const sliders = document.querySelectorAll('.teachers__slider, .reviews__slider');
    
    sliders.forEach(slider => {
        const cards = slider.children;
        Array.from(cards).forEach(card => {
            card.addEventListener('click', () => {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
        });
    });
});