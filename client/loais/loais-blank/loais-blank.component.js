angular.module('angular-skynet').directive('loaisBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/loais/loais-blank/loais-blank.html',
        controllerAs: 'LoaisBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
