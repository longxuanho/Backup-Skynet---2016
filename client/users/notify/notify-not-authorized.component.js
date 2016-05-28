angular.module('angular-skynet').directive('notifyNotAuthorized', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/notify/notify-not-authorized.html',
        controllerAs: 'vm',
        controller: function($scope, $state, $stateParams, $timeout, skynetHelpers, iNotifier, $rootScope) {

            // Ẩn thanh mainSideBar trong khu vực này
            $rootScope.hideMainSidebar = true;
            $rootScope.fullHeaderActive = true;
            // Ẩn topMenu - ngược?
            $rootScope.topMenuActive = true;

            // ***************************************************
            // INITIALIZE
            // ***************************************************
            $scope.message = '';  

            // ***************************************************
            // METHODS
            // ***************************************************
           

        }
    }
});