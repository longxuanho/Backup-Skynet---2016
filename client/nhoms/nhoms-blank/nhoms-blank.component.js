angular.module('angular-skynet').directive('nhomsBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/nhoms/nhoms-blank/nhoms-blank.html',
        controllerAs: 'NhomsBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
