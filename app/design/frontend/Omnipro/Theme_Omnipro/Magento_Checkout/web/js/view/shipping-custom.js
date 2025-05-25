define([
    'jquery',
    'ko',
    'Magento_Checkout/js/view/shipping',
    'Magento_Checkout/js/model/quote',
    'uiRegistry',
    'Magento_Checkout/js/model/shipping-service'
], function ($, ko, Component, quote, registry, shippingService) {
    'use strict';
    
    console.log('¡El archivo shipping-custom.js se ha cargadoo!');

    return Component.extend({
        defaults: {
            template: 'Magento_Checkout/shipping-address/form',
            dataScope: 'shippingAddress',
            // Ejemplo de configuración de campos
            imports: {
                countryOptions: '${ $.parentName }.shippingAddress.shipping-address-fieldset.country_id:indexedOptions'
            }
        },

        // Observable para el país
        selectedCountry: ko.observable(''),

        // Ejemplo de observable personalizado
        miVariablePersonalizada: ko.observable(''),

        // Ejemplo de computed personalizado
        miComputedPersonalizado: ko.computed(function() {
            return this.miVariablePersonalizada() ? 'Tiene valor' : 'No tiene valor';
        }),

        // Método 1: Usando source directamente
        obtenerPaisDesdeSource: function() {
            var countryId = this.source.get('shippingAddress.country_id');
            console.log('%c Método 1 - País desde source:', 'background: #222; color: #bada55', countryId);
            return countryId;
        },

        // Método 2: Usando quote
        obtenerPaisDesdeQuote: function() {
            var shippingAddress = quote.shippingAddress();
            var countryId = shippingAddress ? shippingAddress.countryId : '';
            console.log('%c Método 2 - País desde quote:', 'background: #222; color: #ffa500', countryId);
            return countryId;
        },

        // Método 3: Usando registry
        obtenerPaisDesdeRegistry: function() {
            var address = registry.get('checkout.steps.shipping-step.shippingAddress');
            var countryId = address ? address.get('shippingAddress.country_id') : '';
            console.log('%c Método 3 - País desde registry:', 'background: #222; color: #ff69b4', countryId);
            return countryId;
        },

        // Función que muestra todos los métodos
        obtenerPaisTodosLosMetodos: function() {
            console.group('Valores del país por diferentes métodos:');
            
            // Método 1: Source
            var paisSource = this.obtenerPaisDesdeSource();
            
            // Método 2: Quote
            var paisQuote = this.obtenerPaisDesdeQuote();
            
            // Método 3: Registry
            var paisRegistry = this.obtenerPaisDesdeRegistry();
            
            // Método 4: Observable
            var paisObservable = this.selectedCountry();
            console.log('%c Método 4 - País desde observable:', 'background: #222; color: #00ff00', paisObservable);

            console.table({
                'Source': paisSource,
                'Quote': paisQuote,
                'Registry': paisRegistry,
                'Observable': paisObservable
            });

            console.groupEnd();
        },

        // Función para observar cambios en el país
        onCountryChange: function(data, event) {
            var countryId = event.target.value;
            console.group('Cambio de País Detectado');
            console.log('Nuevo valor:', countryId);
            
            this.selectedCountry(countryId);
            this.source.set('shippingAddress.country_id', countryId);
            
            // Mostrar todos los valores actualizados
            this.obtenerPaisTodosLosMetodos();
            
            console.groupEnd();
            return true;
        },

        // Ejemplo de función personalizada
        miFuncionPersonalizada: function() {
            console.log('miFuncionPersonalizada fue llamada');
            this.miVariablePersonalizada('Nuevo valor');
            console.log('País actual:', this.selectedCountry());
        },

        initialize: function () {
            this._super();
            console.group('Inicialización del Componente Shipping Custom');
            console.log('El componente se está inicializando...');
            
            // Obtener valor inicial
            var countryId = this.source.get('shippingAddress.country_id');
            if (countryId) {
                this.selectedCountry(countryId);
                console.log('Valor inicial del país encontrado:', countryId);
                this.obtenerPaisTodosLosMetodos();
            } else {
                console.log('No se encontró un valor inicial para el país');
            }
            
            console.groupEnd();
            return this;
        }
    });
}); 