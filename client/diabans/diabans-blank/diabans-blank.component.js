angular.module('angular-skynet').directive('diabansBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/diabans/diabans-blank/diabans-blank.html',
        controllerAs: 'DiaBansBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
