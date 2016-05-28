angular.module('angular-skynet').directive('usersProfileSettings', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/settings/users-profile-settings.html',
        controllerAs: 'UsersProfileSettings',
        scope: {
            user: '=',
            states: '='
        },
        controller: function($scope, $stateParams, $state, $timeout, skynetHelpers) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

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
                                toastr.error('Có lỗi xảy ra trong quá trình thay đổi mật khẩu của bạn: ' + err.reason + '.');
                                console.log('Có lỗi khi cập nhật mật khẩu - ', err);
                                $scope.$apply(() => {
                                    $scope.changeState = 'change_password_failed';
                                });
                            } else {
                                $scope.$apply(() => {
                                    $scope.changeState = 'change_password_success';
                                    toastr.success('Mật khẩu mới được cập nhật thành công.');
                                });
                            }
                        });

                    } else {
                        toastr.error(error.message);
                    }
                } else {
                    toastr.error(error.message);
                }
            };


            // ***************************************************
            // ULTILS
            // ***************************************************

            $scope.utils = {
                validateUserProfileForm: function() {

                },
                validateUser: function() {
                    let error = {};
                    if ($scope.user._id !== Meteor.userId())
                        error.message = "Bạn không đủ quyền hạn thực hiện cập nhật này.";
                    return error;
                },
                buildUserProfile: function() {

                },
                buildUserAvatar: function() {
                    if (!_.isEmpty($scope.userAvatar)) {
                        $scope.user.profile.avatar = {};
                        $scope.user.profile.avatar.keyId = $scope.userAvatar._id;
                        $scope.user.profile.avatar.url = $scope.userAvatar.url();
                    }
                },
                toggleEditAvatar: function() {
                    if ($scope.onEditMode)
                        $scope.onEditAvatar = !$scope.onEditAvatar;
                },
                addAvatar: function(files) {
                    if (files.length > 0) {
                        if (files.length > 0) {
                            let reader = new FileReader();

                            reader.onload = (e) => {
                                $scope.$apply(() => {
                                    $scope.cropImgSrc = e.target.result;
                                    $scope.myCroppedImage = '';
                                });
                            };

                            reader.readAsDataURL(files[0]);
                        } else {
                            $scope.cropImgSrc = undefined;
                        }
                    };
                }
            }

        }
    }
});
