define([
    'uiComponent',
    'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/model/step-navigator'
], function (Component, quote, stepNavigator) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Custom_CheckoutSidebar/custom-text'
        },

        /**
         * @return {Boolean}
         */
        isVisible: function () {
            var shippingAddress = quote.shippingAddress();
            return shippingAddress && 
                   shippingAddress.countryId === 'CO' && 
                   !stepNavigator.isProcessed('shipping') &&
                   !shippingAddress.customerAddressId;
        }
    });
}); 