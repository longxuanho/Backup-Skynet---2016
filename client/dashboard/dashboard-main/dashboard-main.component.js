angular.module('angular-skynet').directive('dashboardMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-main/dashboard-main.html',
        // controllerAs: 'vm',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('user_statistics');
            // $scope.subscribe('usersettings');


            // ***************************************************
            // METHODS
            // ***************************************************

            


            // ***************************************************
            // WATCHERS
            // ***************************************************



        }
    }
});
