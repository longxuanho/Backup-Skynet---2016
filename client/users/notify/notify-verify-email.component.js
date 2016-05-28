angular.module('angular-skynet').directive('notifyVerifyEmail', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/notify/notify-verify-email.html',
        controllerAs: 'NotifyVerifyEmail',
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
            $scope.verifyState = 'ongoing';

            $scope.masterState = {
                default: {
                    name: 'users_profile',
                    params: {
                        // Cần lấy thông tin về userId tại đây...
                    }
                }
            }; 

            // ***************************************************
            // METHODS
            // ***************************************************
            $scope.verifyEmail = function() {
                if ($stateParams.token) {
                    Accounts.verifyEmail($stateParams.token, (err) => {
                        if (err) {
                            $scope.$apply(() => {
                                $scope.verifyState = 'failed';
                                if (Meteor.user().emails[0].verified) {
                                    $scope.message = 'Mã token đã hết hạn. Tài khoản của bạn đã được kích hoạt thành công trước đó'
                                } else {
                                    $scope.message = err.reason;
                                }
                                
                                
                            });
                            iNotifier.error('Không thể xác thực địa chỉ email này. Xin vui lòng thử lại sau.');
                            console.log('Error verifying password - ', err);
                        } else {
                            $scope.$apply(() => {
                                $scope.verifyState = 'ok';
                                $timeout(() => {
                                    $scope.masterState.default.params = {
                                        userId: Meteor.userId()
                                    };
                                    $state.go($scope.masterState.default.name, $scope.masterState.default.params);
                                    iNotifier.success('Địa chỉ email của bạn đã được kích hoạt thành công!');
                                }, 5000);
                            });                        
                            console.log('Success verifying email');
                        }
                    }); 
                } else {
                    $scope.verifyState = 'failed';
                    $scope.message = "Không thể tìm thấy mã token trong liên kết mà bạn yêu cầu. Truy cập bị từ chối.";
                }
                
            };

            $timeout(() => {
                $scope.verifyEmail();
            }, 3000);

        }
    }
});