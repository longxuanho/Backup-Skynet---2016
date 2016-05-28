angular.module('angular-skynet').directive('usersProfileSettingsUserInterface', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/settings/user-interface/users-profile-settings-user-interface.html',
        controllerAs: 'usersProfileSettingsUserInterface',
        scope: {},
        controller: function($scope, $rootScope, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************
            
            $scope.notificationStyles = [{
                name: 'uikit',
                desc: 'Hiện đại',
                message: 'Tôi tuy không cao, nhưng ai cũng phải ngước nhìn.',
                status: 'warning'
            }, {
                name: 'toastr',
                desc: 'Sắc màu',
                message: 'Có hai nơi mà mọi điều đều có thể: Giấc mơ và Tình yêu.',
                status: 'success'
            }, {
                name: 'windows10',
                desc: 'Cổ điển',
                message: 'Tôi thấy một bầu trời sao trong mắt em.',
                status: 'info'
            }];
            
            if (!localStorage.getItem("notification_style")) {
                localStorage.setItem("notification_style", 'uikit');
            }

            $scope.notificationStyle = localStorage.getItem("notification_style");



            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.changeNotificationStyle = () => {
                if ($scope.notificationStyle == '')
                    localStorage.removeItem('notification_style');
                else
                    localStorage.setItem("notification_style", $scope.notificationStyle);

                $scope.notificationStyle = localStorage.getItem("notification_style");
                $rootScope.notificationStyle = $scope.notificationStyle;
                
                let style = _.findWhere($scope.notificationStyles, {name: $scope.notificationStyle});
                
                iNotifier.raise(style.message, style.status);
            }




            // ***************************************************
            // ULTILS
            // ***************************************************

            $scope.utils = {
                
            }

        }
    }
});
