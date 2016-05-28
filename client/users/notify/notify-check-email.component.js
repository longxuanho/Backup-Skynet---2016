angular.module('angular-skynet').directive('notifyCheckEmail', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/notify/notify-check-email.html',
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
