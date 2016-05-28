angular.module('angular-skynet').directive('adminUsersModalRemoveUser', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-modals/admin-users-modal-remove-user.html',
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
                confirmAdminCode: '',
                isOnAction: false
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                removeUserAccount: function() {
                    let err = vm._helpers.validateUser('can_delete_admin_users');
                    if (_.isEmpty(err)) {
                        err = vm.utils.validateModalForm();
                        if (_.isEmpty(err)) {

                            vm.modalOptions.isOnAction = true;

                            Meteor.call('deleteUser', vm.source._id, (error) => {
                                if (error) {
                                    iNotifier.error('Có lỗi xảy ra trong quá trình xóa tài khoản người dùng. Thông điệp phản hồi từ server: ' + error.message + '.');
                                    $scope.$apply(() => {
                                        vm.modalOptions.isOnAction = false;
                                    });
                                } else {
                                    iNotifier.warning('Tài khoản người dùng đã được gỡ bỏ khỏi hệ thống.');
                                    $scope.$apply(() => {
                                        vm.modalOptions.isOnAction = false;
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
                    vm.modalOptions.confirmAdminCode = '';
                },
                validateModalForm: function() {
                    let error = {};
                    if (vm.modalOptions.confirmUserCode !== vm.source._id)
                        error.message = "Mã xác nhận người dùng không khớp. Xin vui lòng thử lại sau.";
                    if (vm.source._id === Meteor.userId())
                        error.message = "Bạn không thể đóng tài khoản của chính mình.";
                    if (vm.modalOptions.confirmAdminCode !== (Meteor.userId() + ':longlongbk' ))
                        error.message = "Mã xác nhận người quản trị không khớp. Xin vui lòng thử lại sau.";

                    return error;
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_admin_users_remove_user");
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
