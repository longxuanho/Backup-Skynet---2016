angular.module('angular-skynet').directive('usersProfileSettingsChangePassword', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/settings/change-password/users-profile-settings-change-password.html',
        controllerAs: 'UsersProfileSettingsChangePassword',
        scope: {
            user: '='
        },
        controller: function($scope, $stateParams, $state, $timeout, skynetHelpers, iNotifier) {

            console.log('user: ', $scope.user);
            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope.sectionState = 'idle';

            $scope.credentials = {
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            };


            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.changePassword = () => {

                let error = $scope.utils.validateUser();
                if (_.isEmpty(error)) {
                    error = $scope.utils.validateChangePasswordForm();
                    if (_.isEmpty(error)) {

                        $scope.changeState = 'onChangePassword';
                        Accounts.changePassword($scope.credentials.oldPassword, $scope.credentials.newPassword, (err) => {
                            if (err) {
                                $scope.error = err;
                                iNotifier.error('Có lỗi xảy ra trong quá trình thay đổi mật khẩu của bạn: ' + err.reason + '.');
                                console.log('Có lỗi khi cập nhật mật khẩu - ', err);
                            } else {
                                iNotifier.success('Mật khẩu mới được cập nhật thành công.');
                                $scope.$apply(() => {
                                    $scope.utils.resetCredentials();
                                });                                
                            }
                        });

                    } else {
                        iNotifier.error(error.message);
                    }
                } else {
                    iNotifier.error(error.message);
                }
            };


            // ***************************************************
            // ULTILS
            // ***************************************************

            $scope.utils = {
                validateUser: function() {
                    let error = {};
                    if ($scope.user._id !== Meteor.userId())
                        error.message = "Bạn không đủ quyền hạn thực hiện cập nhật này.";
                    return error;
                },
                validateChangePasswordForm: function() {
                    let error = {};
                    if (!$scope.credentials.oldPassword) {
                        error.message = "Xin vui lòng nhập mật khẩu hiện tại của bạn.";
                        return error;
                    }
                    if (!$scope.credentials.newPassword) {
                        error.message = "Xin vui lòng nhập mật khẩu mới.";
                        return error;
                    }
                    if ($scope.credentials.newPassword.length < 8) {
                        error.message = "Mật khẩu phải có độ dài ít nhất 8 ký tự.";
                        return error;
                    }
                    if ($scope.credentials.newPassword !== $scope.credentials.repeatNewPassword) {
                        error.message = "Mật khẩu xác nhận không khớp, xin vui lòng thử lại.";
                        return error;
                    }
                    return error;
                },
                resetCredentials: function() {
                    $scope.credentials.oldPassword = '';
                    $scope.credentials.newPassword = '';
                    $scope.credentials.repeatNewPassword = '';
                }
            }

        }
    }
});
