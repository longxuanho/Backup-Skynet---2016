angular.module('angular-skynet').directive('usersResetPassword', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-reset-password/users-reset-password.html',
        controllerAs: 'UsersResetPassword',
        controller: function($scope, $stateParams, $state, skynetHelpers, $timeout, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope.resetState = 'idle';
            $scope.credentials = {
                newPassword: '',
                repeatNewPassword: '',
            }

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

            $scope.resetPassword = () => {
                let error = $scope.utils.validateNewPassword();
                if (_.isEmpty(error)) {

                    $scope.resetState = 'onSendingEmail';
                    Accounts.resetPassword($stateParams.token, $scope.credentials.newPassword, (err) => {
                        if (err) {
                            $scope.error = err;
                            iNotifier.error('Có lỗi xảy ra trong quá trình reset mật khẩu của bạn: ' + err.reason + '.');
                            $scope.$apply(() => {
                                $scope.resetState = 'failed';
                            });
                        } else {
                            $scope.$apply(() => {
                                $scope.resetState = 'ok';
                                $timeout(() => {
                                    $scope.masterState.default.params = {
                                        userId: Meteor.userId()
                                    };
                                    $state.go($scope.masterState.default.name, $scope.masterState.default.params);
                                    iNotifier.success('Reset mật khẩu thành công.');
                                }, 4000);
                            });
                        }
                    });

                } else {
                    iNotifier.error(error.message);
                }

            }

            // ***************************************************
            // ULTILS
            // ***************************************************
            $scope.utils = {
                validateNewPassword: function() {
                    let error = {};
                    if (!$scope.credentials.newPassword) {
                        error.message = "Xin vui lòng nhập mật khẩu mới của bạn.";
                        return error;
                    }
                    if ($scope.credentials.newPassword.length < 8) {
                        error.message = "Độ dài mật khẩu mới không được ít hơn 8 ký tự.";
                        return error;
                    }
                    if ($scope.credentials.newPassword !== $scope.credentials.repeatNewPassword) {
                        error.message = "Mật khẩu xác nhận không khớp. Xin vui lòng thử lại.";
                        return error;
                    }
                    return;
                }
            }

        }
    }
});
