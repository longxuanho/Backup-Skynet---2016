angular.module('angular-skynet').directive('donvisBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/donvis/donvis-blank/donvis-blank.html',
        controllerAs: 'DonVisBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
