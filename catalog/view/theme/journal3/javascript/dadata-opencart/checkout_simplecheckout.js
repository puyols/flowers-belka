function checkout_simplecheckout(){// Ваш api ключ из лк дадаты https://dadata.ru/#registration_popup
var token = "1e2eed7c6325a2e85c4da766c68785235836613b";
// Для блока адресс
function checkAddress($city, $address, $postcode, $region) {
    // Если инпут города нету выходим
    alert('Оповещение');
    if (!$city.length) return;
    var type = 'ADDRESS';
    $city.suggestions({
        token: token,
        type: type,
        bounds: "city-settlement",
        geoLocation: false,
        onSelect: enforceCity,
        onSelectNothing: enforceCity,
        formatSelected: formatCitySelected
    });

    $address.suggestions({
        token: token,
        type: type,
        onSelect: restrictAddressValue,
        formatSelected: formatSelected
    });

    // Если на поле адрес есть перезагрузка поля
    var p = $postcode.val() || "";
    var a = $address.val() || "";
      
    $city.on("suggestions-fixdata",
      function(e, suggestion) {
        //console.log(suggestion);
        $address.val(a);
      	$postcode.val(p)
      }
    );

    $city.suggestions().fixData();

    function setConstraints(sgt, kladr_id) {
        var restrict_value = false;
        var locations = null;
        if (kladr_id) {
            locations = {
                kladr_id: kladr_id
            };
            restrict_value = true;
        }
        sgt.setOptions({
            constraints: {
                locations: locations
            },
            restrict_value: restrict_value
        });
    }

    function enforceCity(suggestion) {
        var sgt = $address.suggestions();
        sgt.clear();
        if (suggestion) {
            setConstraints(sgt, suggestion.data.kladr_id);
            formatRegion(suggestion.data);
        } else {
            setConstraints(sgt, null);
        }
    }

    function formatCitySelected(suggestion) {
        var address = suggestion.data;
        if (address.city_with_type === address.region_with_type) {
            return address.settlement || address.city || "";
        } else {
            return join([
                address.city,
                address.settlement
            ]);
        }
    }

    function formatRegion(address) {
        $postcode.val(address.postal_code || '');
        if ($region.length) {
            var result = address.region.replace(/\s{0,1}[-\/].+/gi, '').toLowerCase();
            $region.find('option').each(function (i, o) {
                if ($(o).text().toLowerCase().search(result) >= 0) $(this).attr('selected', true);
                else $(this).attr('selected', false);
            });
        }
    }

    function restrictAddressValue(suggestion) {
        var citySgt = $city.suggestions();
        var addressSgt = $address.suggestions();
        if (!citySgt.currentValue) {
            citySgt.setSuggestion(suggestion);
            var city_kladr_id = suggestion.data.kladr_id.substr(0, 13);
            setConstraints(addressSgt, city_kladr_id);
        }
    }

    function formatSelected(suggestion) {
        var addressValue = makeAddressString(suggestion.data);
        return addressValue;
    }

    function makeAddressString(address) {
        formatRegion(address);

        return join([
            address.street_with_type,
            join([address.house_type, address.house,
                address.block_type, address.block
            ], " "),
            join([address.flat_type, address.flat], " ")
        ]);
    }

    function join(arr /*, separator */ ) {
        var separator = arguments.length > 1 ? arguments[1] : ", ";
        return arr.filter(function (n) {
            return n
        }).join(separator);
    }
}
// Для блока адресс берем в переменные нужные инпуты
var $city = $('#shipping_address_city');
var $address = $('#shipping_address_address_1');
var $postcode = $('#shipping_address_postcode');
var $zoneId = $('#shipping_address_zone_id');
// Для блока адресс вызов
checkAddress($city, $address, $postcode, $zoneId);

// Для блока имени, фамилия
function initName($surname, $name) {
    // Если инпута фамилия или имя нету, выходим
    alert("!!!");
    if (!$surname.length || !$name.length) return;
    
    var self = {};
    self.$surname = $surname;
    self.$name = $name;
    var fioParts = ["SURNAME", "NAME"];
    $.each([$surname, $name], function (index, $el) {
        var sgt = $el.suggestions({
            token: token,
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
}
// Для блока имени, фамилия вызов
var $surname = $("#shipping_address_lastname");
var $name = $("#shipping_address_firstname");

initName($surname, $name);

// Для блока email с проверкой есть ли данный инпут
var $email = $("#customer_email");
if ($email.length) {
    $email.suggestions({
        token: token,
        type: "EMAIL",
    });
}}