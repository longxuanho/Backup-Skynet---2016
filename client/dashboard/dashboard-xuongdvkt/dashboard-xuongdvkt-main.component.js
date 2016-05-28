angular.module('angular-skynet').directive('dashboardXuongdvktMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-xuongdvkt/dashboard-xuongdvkt-main.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, $reactive) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************
            $("body").addClass("skynet-dark-theme-background");

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;        

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('suachuas');
            $scope.subscribe('notifies-xuongdvkt-dashboard');
            $scope.subscribe('datahelpers', () => {
                return [
                    {},
                    'xuongdvkt'
                ];
            });

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            

            // ***************************************************
            // UTILS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});