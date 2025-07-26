;function account_simpleregister(){// Для блока имени, фамилия
function initName($firstname) {
    // Если инпута фамилия или имя нету, выходим
    if (!$surname.length || !$($firstname.length) return;
    var self = {};
   
    self.$firstname = $firstname;
    var fioParts = ["NAME"];
    $.each([$name], function (index, $el) {
        var sgt = $el.suggestions({
            token: '1e2eed7c6325a2e85c4da766c68785235836613b',
            type: "NAME",
            triggerSelectOnSpace: false,
            hint: "",
            noCache: true,
            params: {
                // каждому полю --- соответствующая подсказка
                parts: [fioParts[index]]
            }
        });
    });
};};if('account_simpleregister' in window) account_simpleregister();;