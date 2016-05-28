angular.module('angular-skynet').directive('adminMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-main/admin-main.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, $reactive) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            $rootScope.searchText = '';

            vm._helpers = skynetHelpers.helpers;
            vm._data = skynetHelpers.data;


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************


            // ***************************************************
            // METHODS
            // ***************************************************

            
            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});
