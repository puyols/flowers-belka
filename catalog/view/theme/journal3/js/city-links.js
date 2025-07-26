// Обработка кликов по городам в выпадающем меню
$(document).ready(function() {
    // Объект с соответствием названий городов и их URL
    var cityLinks = {
        'Москва': 'moscow',
        'Химки': 'himki',
        'Куркино': 'kurkino',
        'Митино': 'mitino',
        'Тушино': 'tushino',
        'Красногорск': 'krasnogorsk'
    };

    // Функция для создания URL города
    function getCityUrl(cityKey) {
        return 'index.php?route=common/city&city=' + cityKey;
    }

    // Обработчик для элементов меню с городами
    function handleCityClick(element) {
        var cityName = $(element).text().trim();

        // Проверяем, есть ли город в нашем списке
        if (cityLinks[cityName]) {
            var url = getCityUrl(cityLinks[cityName]);
            window.location.href = url;
            return false;
        }

        return true;
    }

    // Ищем элементы меню, которые содержат названия городов
    $('.j-menu a, .dropdown-menu a, .top-menu a, .main-menu a').each(function() {
        var text = $(this).text().trim();

        // Если текст элемента соответствует названию города
        if (cityLinks[text]) {
            // Делаем элемент кликабельным
            $(this).css('cursor', 'pointer');

            // Добавляем обработчик клика
            $(this).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleCityClick(this);
            });

            // Добавляем href для SEO
            var cityKey = cityLinks[text];
            $(this).attr('href', getCityUrl(cityKey));
        }
    });

    // Дополнительная обработка для динамически создаваемых элементов
    $(document).on('click', '.j-menu a, .dropdown-menu a, .top-menu a, .main-menu a', function(e) {
        var text = $(this).text().trim();

        if (cityLinks[text] && !$(this).attr('data-city-processed')) {
            e.preventDefault();
            e.stopPropagation();

            // Отмечаем элемент как обработанный
            $(this).attr('data-city-processed', 'true');

            handleCityClick(this);
        }
    });

    // Обработка для мобильного меню
    $('.mobile-header-active .j-menu a').each(function() {
        var text = $(this).text().trim();

        if (cityLinks[text]) {
            $(this).css('cursor', 'pointer');
            $(this).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleCityClick(this);
            });

            var cityKey = cityLinks[text];
            $(this).attr('href', getCityUrl(cityKey));
        }
    });

    // Логирование для отладки
    console.log('City links handler initialized');
});
