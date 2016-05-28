angular.module('angular-skynet').directive('chungloaisBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/chungloais/chungloais-blank/chungloais-blank.html',
        controllerAs: 'ChungLoaisBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
