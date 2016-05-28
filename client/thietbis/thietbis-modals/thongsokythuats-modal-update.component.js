angular.module('angular-skynet').directive('thongsokythuatsModalUpdate', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-modals/thongsokythuats-modal-update.html',
        controllerAs: 'vm',
        scope: {
        	thongsokythuat: '=',
            thietbi: '=',
            fabState: '='
        },
        bindToController: true,
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout, $reactive, skynetDictionary, iNotifier) {
            

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._helpers = skynetHelpers.helpers;
            vm.dictionary = angular.copy(skynetDictionary.data.thietbis.thong_so_ky_thuat);

            vm.modalOptions = {
                isGiaTriKieuText: false,
                isConfirmBeforeDelete: false,
                isShowInfo: false
            }

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                source: () => {
                    vm.master = ThongSoKyThuats.findOne({
                        _id: vm.getReactively('thongsokythuat.id')
                    });
                    return angular.copy(vm.master);
                }
            });

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                update: function() {
                    let err = vm._helpers.validateUser('can_upsert_thong_so_ky_thuat');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateThongSoKyThuatForm(vm.source);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildThongSoKyThuat(vm.source);
                            ThongSoKyThuats.update({
                                _id: vm.thongsokythuat.id
                            }, {
                                $set: {
                                    'nhom_thong_so': vm.source.nhom_thong_so,
                                    'ten': vm.source.ten,
                                    'gia_tri': vm.source.gia_tri,
                                    'gia_tri_text': vm.source.gia_tri_text,
                                    'don_vi': vm.source.don_vi,
                                    'metadata.ngay_cap_nhat_cuoi': vm.source.metadata.ngay_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi': vm.source.metadata.nguoi_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi_name': vm.source.metadata.nguoi_cap_nhat_cuoi_name,
                                    'metadata.nguoi_cap_nhat_cuoi_email': vm.source.metadata.nguoi_cap_nhat_cuoi_email,
                                    'metadata.nguoi_cap_nhat_cuoi_field': vm.source.metadata.nguoi_cap_nhat_cuoi_field,
                                    'metadata.search_field': vm.source.metadata.search_field
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Không thể thông số kỹ thuật này. ' + error.message + '.');
                                } else {
                                    iNotifier.success('Thông số kỹ thuật của thiết bị được cập nhật thành công.');                                    
                                    $scope.$apply(() => {
                                        vm.master = ThongSoKyThuats.findOne({
                                            _id: vm.thongsokythuat.id
                                        });
                                        vm.source = angular.copy(vm.master);
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
                restore: function() {
                    vm.source = angular.copy(vm.master);
                },
                remove: function(id) {
                    let err = vm._helpers.validateUser('can_delete_thong_so_ky_thuat');
                    if (_.isEmpty(err)) {

                        ThongSoKyThuats.remove({
                            _id: id
                        }, (error) => {
                            if (!error) {
                                this.closeModal();
                                // Đưa các thiết lập về mặc định, làm sạch selection
                                vm.modalOptions.isConfirmBeforeDelete = false;
                                vm.thongsokythuat = {};
                                vm.fabState = 'thongsokythuats_goToList';
                                iNotifier.warning('Thông số bạn yêu cầu đã được gỡ bỏ thành công.');
                            } else {
                                iNotifier.error(error.message);
                            }
                        });

                    } else {
                        iNotifier.error(err.message);
                    }
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_thongsokythuats_update");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.$watch('vm.source.nhom_thong_so', (newVal) => {
                if (newVal) {
                    // Nếu nhóm thông số mới này chỉ chứa các thông số với giá trị của chúng là text,
                    // ẩn các trường không cần thiết thông qua flag 'isGiaTriKieuText'.
                    vm.modalOptions.isGiaTriKieuText = _.contains(vm.dictionary.nhom_thong_so_voi_gia_tri_text, newVal) ? true : false;

                    // Khi người dùng thay đổi nhóm thông số, reset các trường khác để nhập liệu
                    // Ngược lại, khi trở về giá trị của nhóm thông số ban đầu, khôi phục
                    // giá trị của các trường về mặc định.
                    if (newVal !== vm.master.nhom_thong_so) {
                        vm.source.ten = '';
                        vm.source.gia_tri = '';
                        vm.source.gia_tri_text = '';
                        vm.source.don_vi = '';
                    } else {
                        vm.source.ten = vm.master.ten;
                        vm.source.gia_tri = vm.master.gia_tri;
                        vm.source.gia_tri_text = vm.master.gia_tri_text;
                        vm.source.don_vi = vm.master.don_vi;
                    }
                }
            });
        }
    }
});
