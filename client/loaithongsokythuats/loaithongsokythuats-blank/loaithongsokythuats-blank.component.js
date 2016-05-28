angular.module('angular-skynet').directive('loaithongsokythuatsBlank', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/loaithongsokythuats/loaithongsokythuats-blank/loaithongsokythuats-blank.html',
        controllerAs: 'LoaiThongSoKyThuatsBlank',
        controller: function($scope, $rootScope) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = false;
            $rootScope.headerDoubleHeightActive = true;                   

        }
    }
});
