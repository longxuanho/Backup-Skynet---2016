angular.module('angular-skynet').controller('UserDetailsCtrl', function($scope, $rootScope, $state, $stateParams, $meteor, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope.availableRoles = {
        'sky-project': ['super-manager', 'manage-users', 'support-staff', 'basic-user', 'manager', 'manager-xemay', 'manager-tbn', 'manager-tau', 'guest'],
        'xncg': ['manager', 'basic-user']
    }


    // ***************************************************
    // SUBSCRIBE
    // ***************************************************    
    // $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.$meteorSubscribe('users_single', $stateParams.userId);
    $scope.user = $meteor.object(Meteor.users, $stateParams.userId, false);


    // ***************************************************
    // METHODS
    // ***************************************************
    

    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {

        },
        setUserRole: function(userId, userRoles, userGroup, role) {
            if (!!Meteor.user()) {
                var err = $scope._helpers.validateUser('can_update_role');
                if (_.isEmpty(err)) {

                    if (!userRoles)
                        userRoles = {};
                    var newRoles = userRoles[userGroup];
                    if (_.contains(newRoles, role)) {
                        newRoles = _.without(newRoles, role);
                    } else {
                        newRoles = _.union(newRoles, [role]);
                    }
                    $meteor.call('updateRoles', userId, newRoles, userGroup).then(function(data) {
                        console.log('Method Call (updateRoles) - [Đáp ứng thành công!] ', data);
                        toastr.info('Cập nhật phân quyền người dùng thành công.');
                    }, function(error) {
                        toastr.error('Có lỗi xảy ra trong quá trình cập nhật các role cho user: ' + error.message + '.');
                        console.log('Method Call (updateRoles) - [Lỗi] ', error);
                    });

                } else {
                    toastr.error(err.message);
                }
            } else {
                console.log('Lỗi: Người dùng chưa đăng nhập');
            }
        },
        resetUserPassword: function(userId, newPassword) {
            if (!!Meteor.user()) {
                var err = $scope._helpers.validateUser('can_force_reset_password');
                if (_.isEmpty(err)) {

                    if (_.isString(newPassword) && newPassword.length >= 6) {
                        $meteor.call('forceResetUserPassword', userId, newPassword).then(function(data) {
                            console.log('Method Call (forceResetUserPassword) - [Đáp ứng thành công!] ', data);
                            toastr.info('Mật khẩu người dùng được reset thành công.');
                            $scope.resetPassword.newPassword = '';
                        }, function(error) {
                            toastr.error('Có lỗi xảy ra trong quá trình reset mật khẩu người dùng: ' + error.message + '.');
                            console.log('Method Call (forceResetUserPassword) - [Lỗi] ', error);
                        });
                    } else {
                        toastr.error("Mật khẩu mới phải có độ dài ít nhất 6 ký tự.");
                    }

                } else {
                    toastr.error(err.message);
                }
            } else {
                console.log('Lỗi: Người dùng chưa đăng nhập');
            }
        },
        removeUser: function(userId) {
            if (!!Meteor.user()) {
                var err = $scope._helpers.validateUser('can_delete_user');
                if (_.isEmpty(err)) {

                    if ($scope.confirmUserIdToRemove === userId) {
                        $meteor.call('deleteUser', userId).then(function(data) {
                            console.log('Method Call (deleteUser) - [Đáp ứng thành công!] ', data);
                            toastr.info('Tài khoản người dùng ' + userId + ' đã được gỡ bỏ khỏi hệ thống');

                            // Go back to Amin user
                            $state.go('manage_users');
                        }, function(error) {
                            toastr.error('Có lỗi xảy ra trong quá trình gỡ bỏ tài khoản người dùng: ' + error.message + '.');
                            console.log('Method Call (deleteUser) - [Lỗi] ', error);
                        });
                    } else {
                        toastr.error("Xin vui lòng xác nhận mã người dùng trước khi xóa.");
                    }

                } else {
                    toastr.error(err.message);
                }
            } else {
                console.log('Lỗi: Người dùng chưa đăng nhập');
            }
        }
    }

    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {
        isInCurrentUserRoles: function(role, userRoles) {
            return _.contains(userRoles, role);
        }
    }

});
