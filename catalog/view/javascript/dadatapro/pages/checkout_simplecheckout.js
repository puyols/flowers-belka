;

function dadataCheckoutSimplecheckout() {
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='customer[firstname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['NAME', 'PATRONYMIC']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('name patronymic', suggest);
            }
        }]
    });
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='customer[lastname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['SURNAME']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('surname', suggest);
            }
        }]
    });
    UserDadata({
        type: 'email',
        delay: 777,
        reload: function(store, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='customer[email]']",
            callback: function(suggest, helper, element) {
                return helper('value', suggest);
            }
        }]
    });
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='payment_address[firstname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['NAME', 'PATRONYMIC']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('name patronymic', suggest);
            }
        }]
    });
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='payment_address[lastname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['SURNAME']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('surname', suggest);
            }
        }]
    });
    UserDadata({
        type: 'address',
        delay: 777,
        queue: [{
            awaiting: "[name='payment_address[zone_id]']",
            callback: function(suggest, helper, element) {
                return helper('region', suggest);
            }
        }, {
            awaiting: "[name='payment_address[city]']",
            clear: true,
            prefetch: function(target) {
                return {
                    locations: [JSON.parse(target.getAttribute('data-dadata'))],
                    from_bound: {
                        'value': 'city'
                    },
                    to_bound: {
                        'value': 'city'
                    },
                    restrict_value: true,
                    query: ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('city_fias_id', suggest, true) || helper('area_fias_id', suggest, true) || helper('region_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('city_with_type', suggest);
            }
        }, {
            awaiting: "[name='payment_address[address_1]']",
            clear: true,
            prefetch: function(target) {
                return {
                    'locations': [JSON.parse(target.getAttribute('data-dadata'))],
                    'from_bound': {
                        'value': 'street',
                    },
                    'to_bound': {
                        'value': 'flat',
                    },
                    'restrict_value': true,
                    'query': ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('settlement_fias_id', suggest, true) || helper('city_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('street_with_type, house_type.house, block_type-block, flat_type.flat', suggest);
            }
        }, {
            awaiting: "[name='payment_address[address_2]']",
            clear: true,
            prefetch: function(target) {
                return {
                    'locations': [JSON.parse(target.getAttribute('data-dadata'))],
                    'from_bound': {
                        'value': 'street',
                    },
                    'to_bound': {
                        'value': 'flat',
                    },
                    'restrict_value': true,
                    'query': ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('settlement_fias_id', suggest, true) || helper('city_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('street_with_type, house_type.house, block_type-block, flat_type.flat', suggest);
            }
        }, {
            awaiting: "[name='payment_address[postcode]']",
            callback: function(suggest, helper, element) {
                return helper('postal_code', suggest);
            }
        }]
    });
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='shipping_address[firstname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['NAME', 'PATRONYMIC']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('name patronymic', suggest);
            }
        }]
    });
    UserDadata({
        type: 'fio',
        delay: 777,
        onSelected: function(suggest, helper) {
            reloadAll();
        },
        queue: [{
            awaiting: "[name='shipping_address[lastname]']",
            prefetch: function(target) {
                return {
                    query: '',
                    parts: ['SURNAME']
                }
            },
            callback: function(suggest, helper, element) {
                return helper('surname', suggest);
            }
        }]
    });
    UserDadata({
        type: 'address',
        delay: 777,
        queue: [{
            awaiting: "[name='shipping_address[zone_id]']",
            callback: function(suggest, helper, element) {
                return helper('region', suggest);
            }
        }, {
            awaiting: "[name='shipping_address[city]']",
            clear: true,
            prefetch: function(target) {
                return {
                    locations: [JSON.parse(target.getAttribute('data-dadata'))],
                    from_bound: {
                        'value': 'city'
                    },
                    to_bound: {
                        'value': 'city'
                    },
                    restrict_value: true,
                    query: ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('city_fias_id', suggest, true) || helper('area_fias_id', suggest, true) || helper('region_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('city_with_type', suggest);
            }
        }, {
            awaiting: "[name='shipping_address[address_1]']",
            clear: true,
            prefetch: function(target) {
                return {
                    'locations': [JSON.parse(target.getAttribute('data-dadata'))],
                    'from_bound': {
                        'value': 'street',
                    },
                    'to_bound': {
                        'value': 'flat',
                    },
                    'restrict_value': true,
                    'query': ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('settlement_fias_id', suggest, true) || helper('city_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('street_with_type, house_type.house, block_type-block, flat_type.flat', suggest);
            }
        }, {
            awaiting: "[name='shipping_address[address_2]']",
            clear: true,
            prefetch: function(target) {
                return {
                    'locations': [JSON.parse(target.getAttribute('data-dadata'))],
                    'from_bound': {
                        'value': 'street',
                    },
                    'to_bound': {
                        'value': 'flat',
                    },
                    'restrict_value': true,
                    'query': ''
                }
            },
            callback: function(suggest, helper, element) {
                let res = (helper('settlement_fias_id', suggest, true) || helper('city_fias_id', suggest, true));
                element.setAttribute('data-dadata', res);
                return helper('street_with_type, house_type.house, block_type-block, flat_type.flat', suggest);
            }
        }]
    });
};