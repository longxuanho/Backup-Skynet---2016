angular.module('angular-skynet').directive('generalToolBar', function() {
    var controller = function($scope, Skynet, $state, $meteor) {
        // $scope.page_ui = Skynet.settings.donvies.ui;

        $scope.logout = function() {
            $meteor.logout().then(function() {
                
                toastr.info('Bye : )')
                console.log('Logout success');
                $state.go('user_login');

            }, function(err) {
                toastr.info('Có lỗi xảy ra. Chưa thể đăng xuất khỏi hệ thống.')
                console.log('logout error - ', err);
            });
        }

    };
    return {
        restrict: 'E',
        scope: {
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_general_toolbar.html'
    };
});
