angular.module('angular-skynet').directive('gRecaptchar', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/directives/skynet/reCaptcha/gRecaptchar.template.html',
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        controller: function($scope, $rootScope, $timeout) {
            
            // ***************************************************
            // RECAPTCHA
            // ***************************************************

            $.getScript('https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit', function() {
            });
        }
    }
});
