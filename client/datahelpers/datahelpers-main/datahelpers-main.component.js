angular.module('angular-skynet').directive('datahelpersMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/datahelpers/datahelpers-main/datahelpers-main.html',
        // controllerAs: 'vm',
        controller: function($scope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************
            $scope.subscribe('datahelpers');


            // ***************************************************
            // METHODS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************



        }
    }
});
