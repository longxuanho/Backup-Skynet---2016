angular.module('angular-skynet').directive('adminUsersModalVerifyEmail', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-modals/admin-users-modal-verify-email.html',
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
                isOnSendingEmail: false
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                sendVerificationEmail: function() {
                    let err = vm._helpers.validateUser('can_update_admin_users');
                    if (_.isEmpty(err)) {
                        err = vm.utils.validateModalForm();
                        if (_.isEmpty(err)) {

                            vm.modalOptions.isOnSendingEmail = true;

                            Meteor.call('sendVerificationEmail', vm.source._id, (error) => {
                                if (error) {
                                    iNotifier.error('Có lỗi xảy ra trong quá trình gửi mail kích hoạt. Thông điệp phản hồi từ server: ' + error.message + '.');
                                    $scope.$apply(() => {
                                        vm.modalOptions.isOnSendingEmail = false;
                                    });
                                } else {
                                    iNotifier.success('Email chứa token kích hoạt tài khoản đã được gửi tới người dùng thành công.');
                                    $scope.$apply(() => {
                                        vm.modalOptions.isOnSendingEmail = false;
                                        vm.utils.clearModalForm();
                                        $timeout(() => {
                                            vm.utils.closeModal();
                                        }, 1000);
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
                clearModalForm: function() {
                    vm.modalOptions.confirmUserCode = '';
                },
                validateModalForm: function() {
                    let error = {};
                    if (vm.modalOptions.confirmUserCode !== vm.source._id)
                        error.message = "Mã xác nhận người dùng không khớp. Xin vui lòng thử lại sau.";
                    return error;
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_admin_users_verify_email");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************


            
        }
    }
});
