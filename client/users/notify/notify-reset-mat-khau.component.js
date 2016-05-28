angular.module('angular-skynet').directive('notifyResetMatKhau', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/notify/notify-reset-mat-khau.html',
        controllerAs: 'vm',
        controller: function($scope, $stateParams, $state, $rootScope) {

            // Ẩn thanh mainSideBar trong khu vực này
            $rootScope.hideMainSidebar = true;
            $rootScope.fullHeaderActive = true;
            // Ẩn topMenu - ngược?
            $rootScope.topMenuActive = true;

            // ***************************************************
            // INITIALIZE
            // ***************************************************


            // ***************************************************
            // UTILS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************

        }
    }
});
