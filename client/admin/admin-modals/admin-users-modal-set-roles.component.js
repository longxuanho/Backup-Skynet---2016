angular.module('angular-skynet').directive('adminUsersModalSetRoles', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-modals/admin-users-modal-set-roles.html',
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
                isOnAction: false,
                roles: [],
                data: {
                	availableRoles: {
                		'sky-project': [
                			'quanly-cauhois',
                            'xem-cauhois',
                            'xem-suachuas',
                            'quanly-suachuas',
                			'support-suachuas',
                			'manage-users',
                			'super-manager',
                			'admin'
                		]
                	}
                }
            };

            

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                setUserRoles: function() {
                    let err = vm._helpers.validateUser('can_update_admin_users');
                    if (_.isEmpty(err)) {
                        err = vm.utils.validateModalForm();
                        if (_.isEmpty(err)) {

                            vm.modalOptions.isOnAction = true;
                            let rolesBefore = (vm.source.roles && vm.source.roles['sky-project']) ? vm.source.roles['sky-project'] : [];
                            let rolesAction = vm.utils.processRolesArr(rolesBefore, vm.modalOptions.roles);
                            if (rolesAction['add'].length || rolesAction['remove'].length) {

                                Meteor.call('updateRoles', vm.source._id, rolesAction, 'sky-project', (error) => {
                                    if (error) {
                                        iNotifier.error('Có lỗi xảy ra trong thiết lập phân quyền tài khoản. Thông điệp phản hồi từ server: ' + error.message + '.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                        });
                                    } else {
                                        iNotifier.success('Thiết lập phân quyền tài khoản người dùng thành công.');
                                        $scope.$apply(() => {
                                            vm.modalOptions.isOnAction = false;
                                            vm.utils.resetModalForm();
                                            $timeout(() => {
                                                vm.utils.closeModal();
                                            }, 1000);
                                        });
                                    }
                                });
                            } else {
                                vm.utils.resetModalForm();
                                iNotifier.warning('Chưa có thay đổi về phân quyền người dùng được ghi nhận.');
                            }                           

                        } else {
                            iNotifier.error(err.message);                            
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                },
                processRolesArr: function(before, after) {
                    if (_.isArray(before) && _.isArray(after)) {
                        // Không cho phép thăng cấp lên admin
                        after = _.without(after, 'admin');

                        // Tính toán và so sánh giữa arr. Roles mới với arr. Roles cũ để biết role được thêm vào hay loại bỏ?
                        let roles = {
                            // Các role được thêm vào
                            'add': [],
                            // Các role bị loại bỏ
                            'remove': []
                        };
                        // Trước hết, tìm giao giữa hai mảng
                        let intersection = _.intersection(before, after);
                        // Tính toán các phần tử được thêm vào
                        roles.add = _.difference(after, intersection);
                        // Cũng như các role bị loại bỏ
                        roles.remove = _.difference(before, intersection);

                        console.log('role result, ', roles);

                        return roles;
                    }
                },
                resetModalForm: function() {
                    vm.modalOptions.confirmUserCode = '';
                    vm.modalOptions.confirmAdminCode = '';
                    vm.modalOptions.roles = (vm.source.roles && vm.source.roles['sky-project']) ? angular.copy(vm.source.roles['sky-project']) : [];
                },
                validateModalForm: function() {
                    let error = {};
                    if (vm.modalOptions.confirmAdminCode !== (Meteor.userId() + ':longlongbk' ))
                        error.message = "Mã xác nhận người quản trị không khớp. Xin vui lòng thử lại sau.";
                    if (vm.modalOptions.confirmUserCode !== vm.source._id)
                        error.message = "Mã xác nhận người dùng không khớp. Xin vui lòng thử lại sau.";
                    return error;
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_admin_users_set_roles");
                    vm.utils.resetModalForm();
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.$watch('vm.source._id', (newVal) => {
            	vm.utils.resetModalForm();
            });
            
        }
    }
});

