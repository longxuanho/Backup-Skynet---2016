angular.module('angular-skynet').directive('adminUsersModalResetPassword', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-modals/admin-users-modal-reset-password.html',
        controllerAs: 'vm',
        scope: {
        	source: '='
        },
        bindToController: true,
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout, $reactive, skynetDictionary, iNotifier, $timeout) {
            
            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;

            vm.modalOptions = {
                confirmUserCode: '',
                isOnAction: false,
                isForceToReset: false,
                credentials: {
                    newPassword: '',
                    repeatNewPassword: ''
                }
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                resetUserPassword: function() {
                    let err = vm._helpers.validateUser('can_update_admin_users');
                    if (_.isEmpty(err)) {
                        err = vm.utils.validateModalForm();
                        if (_.isEmpty(err)) {

                            vm.modalOptions.isOnAction = true;
                            
                            // Trường hợp reset bằng mật khẩu do admin cung cấp 
                            if (vm.modalOptions.isForceToReset) {
                                Meteor.call('forceResetUserPassword', vm.source._id, vm.modalOptions.credentials.newPassword, (error) => {
                                    if (error) {
                                        iNotifier.error('Có lỗi xảy ra trong quá trình đặt lại mật khẩu. Thông điệp phản hồi từ server: ' + error.message + '.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                        });
                                    } else {
                                        iNotifier.success('Mật khẩu người dùng được thiết đặt lại thành công.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                            vm.utils.clearModalForm();
                                            $timeout(() => {
                                                vm.utils.closeModal();
                                            }, 1000);
                                        });
                                    }
                                });
                            }
                            // Trường hợp gửi mail tới người dùng để thực hiện reset mật khẩu
                            else {
                                Meteor.call('sendResetPasswordEmail', vm.source._id, (error) => {
                                    if (error) {
                                        iNotifier.error('Có lỗi xảy ra trong quá trình gửi mail reset mật khẩu tới người dùng. Thông điệp phản hồi từ server: ' + error.message + '.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                        });
                                    } else {
                                        iNotifier.success('Email chứa token reset mật khẩu đã được gửi tới người dùng thành công.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                            vm.utils.clearModalForm();
                                            $timeout(() => {
                                                vm.utils.closeModal();
                                            }, 1000);
                                        });
                                    }
                                });
                            }

                            

                        } else {
                            iNotifier.error(err.message);                            
                        }
                    } else {
                        iNotifier.error(err.message);

                    }
                },
                clearModalForm: function() {
                    vm.modalOptions.confirmUserCode = '';
                    vm.modalOptions.credentials.newPassword = '';
                    vm.modalOptions.credentials.repeatNewPassword = '';
                },
                validateModalForm: function() {
                    let error = {};
                    if (vm.modalOptions.confirmUserCode !== vm.source._id) {
                        error.message = "Mã xác nhận người dùng không khớp. Xin vui lòng thử lại sau.";
                        return error;
                    }
                    if (vm.modalOptions.isForceToReset) {
                        if (vm.modalOptions.credentials.newPassword.length < 8) {
                            error.message = "Mật khẩu mới phải có độ dài ít nhất 8 ký tự.";
                            return error;
                        }
                        if (vm.modalOptions.credentials.newPassword !== vm.modalOptions.credentials.repeatNewPassword) {
                            error.message = "Xác nhận mật khẩu không khớp. Xin vui lòng thử lại.";
                            return error;
                        }
                    }
                    return error;
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_admin_users_reset_password");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************
            
            $scope.$watch('vm.modalOptions.isForceToReset', (newVal) => {
                    vm.modalOptions.credentials.newPassword = '';
                    vm.modalOptions.credentials.repeatNewPassword = '';
            });
        }
    }
});
