angular.module('angular-skynet').directive('hangsanxuatsBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/hangsanxuats/hangsanxuats-blank/hangsanxuats-blank.html',
        controllerAs: 'HangSanXuatsBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
