$(function () {
    $(document).ready(function ($) {
            function innMask() {
                const innInput = $('#input-yandex-taxi-supplier-inn');

                if (innInput.val().replace(/\D/g, "").length <= 10) {
                    innInput.inputmask('9999-99999-9[9]');
                } else {
                    innInput.inputmask('9999-999999-99');
                }
            }

            innMask();
            $('#input-yandex-taxi-supplier-inn').on('input', function () {
                innMask();
            });

            $('.country-related-link').click(function () {
            const link = $(this);
            const source = link.data('source');
            const country = $("select[name='shipping_yandextaxi_country']").val();

            if (country in source) {
                link.attr("href", source[country]);
                return;
            }

            link.attr("href", source.default);
        });

        const useOrderPriceForFreeSelect = $('[name="shipping_yandextaxi_free_shipping_enabled"]');

        handleUseOrderPriceForFreeSelectState(useOrderPriceForFreeSelect);

        useOrderPriceForFreeSelect.change(function() {
            handleUseOrderPriceForFreeSelectState($(this));
        });

        const fixedPriceIsOnSelect = $('[name="shipping_yandextaxi_fixed_shipping_enabled"]');

        handleFixedPriceIsOnSelectState(fixedPriceIsOnSelect);

        fixedPriceIsOnSelect.change(function() {
            handleFixedPriceIsOnSelectState($(this));
        });

        const discountIsOnSelect = $('[name="shipping_yandextaxi_discount_shipping_enabled"]');

        handleDiscountIsOnSelectState(discountIsOnSelect);

        discountIsOnSelect.change(function() {
            handleDiscountIsOnSelectState($(this));
        });


        function handleUseOrderPriceForFreeSelectState(select) {
            const input = $('[name="shipping_yandextaxi_free_shipping_value"]');

            if(select.val() == 1) {
                input.prop('disabled', false);
            } else {
                input.prop('disabled', true);
            }
        }

        function handleFixedPriceIsOnSelectState(select) {
            const input = $('[name="shipping_yandextaxi_fixed_shipping_value"]');

            if(select.val() == 1) {
                input.prop('disabled', false);
            } else {
                input.prop('disabled', true);
            }
        }

        function handleDiscountIsOnSelectState(select) {
            const input1 = $('[name="shipping_yandextaxi_discount_shipping_value"]');
            const input2 = $('[name="shipping_yandextaxi_discount_shipping_from"]');

            if(select.val() == 1) {
                input1.prop('disabled', false);
                input2.prop('disabled', false);
            } else {
                input1.prop('disabled', true);
                input2.prop('disabled', true);
            }
        }
    });
});

