angular.module('angular-skynet').directive('quocgiasBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/quocgias/quocgias-blank/quocgias-blank.html',
        controllerAs: 'QuocGiasBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
