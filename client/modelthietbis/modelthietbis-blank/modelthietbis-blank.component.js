angular.module('angular-skynet').directive('modelthietbisBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/modelthietbis/modelthietbis-blank/modelthietbis-blank.html',
        controllerAs: 'ModelThietBisBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
