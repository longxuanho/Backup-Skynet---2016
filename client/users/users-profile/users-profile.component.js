angular.module('angular-skynet').directive('usersProfile', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users-profile/users-profile.html',
        controllerAs: 'UsersProfile',
        controller: function($scope, $stateParams, $state, $timeout, skynetHelpers, $rootScope, iNotifier) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._data = skynetHelpers.data;

            // $scope.states = {
            //     profileState: 'profile_about_view',
            //     profileSubState: ''
            // };

            $scope.pageOptions = {
                isEditable: false
            }

            $scope.credentials = {
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                user: () => {
                    $scope.master = Meteor.users.findOne({
                        _id: $stateParams.userId
                    });
                    return angular.copy($scope.master);
                },
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            

            // ***************************************************
            // ULTILS
            // ***************************************************
            $scope.utils = {
                updateUserProfile: function() {

                    let err = $scope.utils.validateUser();
                    if (_.isEmpty(err)) {
                        err = $scope.utils.validateUserProfileForm();
                        if (_.isEmpty(err)) {

                            $scope.utils.buildUserProfile();
                            Meteor.users.update({
                                _id: $stateParams.userId
                            }, {
                                $set: {
                                    'profile.name': $scope.user.profile.name,
                                    'profile.lastName': $scope.user.profile.lastName,
                                    'profile.firstName': $scope.user.profile.firstName,
                                    'profile.birthday': $scope.user.profile.birthday,
                                    'profile.gender': $scope.user.profile.gender,
                                    'profile.department': $scope.user.profile.department,
                                    'profile.organization': $scope.user.profile.organization,
                                    'profile.bio': $scope.user.profile.bio,
                                    'profile.email_work': $scope.user.profile.email_work,
                                    'profile.phone': $scope.user.profile.phone,
                                    'profile.search_field': $scope.user._id + ' : ' + $scope.user.username + ' : ' + $scope.user.emails[0].address + ' : ' + $scope.user.profile.name
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Không thể cập nhật profile của bạn. ' + error.message + '.');
                                    $scope.$apply(() => {
                                        $scope.pageOptions.isEditable = false;
                                    });
                                } else {
                                    iNotifier.success('Hồ sơ cá nhân của bạn đã được cập nhật thành công.');
                                    $scope.$apply(() => {
                                        $scope.pageOptions.isEditable = false;
                                    });
                                }
                            });

                        } else {
                            iNotifier.error(err.message);
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                },
                resetEditProfile: function () {
                    angular.copy($scope.master, $scope.user);
                },
                validateUserProfileForm: function() {

                },
                validateUser: function() {
                    let error = {};
                    if ($scope.user._id !== Meteor.userId())
                        error.message = "Bạn không đủ quyền hạn thực hiện cập nhật này.";
                    return error;
                },
                validateChangePasswordForm: function() {

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
                    if ($scope.states.profileState === 'profile_about_edit')
                        $scope.states.profileSubState = ($scope.states.profileSubState !== 'profile_about_edit_avatar') ? 'profile_about_edit_avatar' : '';
                }
            }

        }
    }
});
