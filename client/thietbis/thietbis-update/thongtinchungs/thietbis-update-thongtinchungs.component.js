angular.module('angular-skynet').directive('thietbisUpdateMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-update/thongtinchungs/thietbis-update-thongtinchungs.template.html',
        controllerAs: 'vm',
        scope: {
            source: '=',
            master: '='
        },
        bindToController: true,
        controller: function($scope, skynetHelpers, $rootScope, iNotifier, $timeout, $reactive) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;

            vm.params = {
                nhomSelectedId: null,
                chungloaiSelectedId: null,
                hangsanxuatSelectedId: null
            };

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                nhoms: () => {
                    return Nhoms.find({}, {
                        sort: {
                            'order': 1
                        }
                    });
                },
                chungloais: () => {
                    return ChungLoais.find({
                        'nhom.keyId': vm.getReactively('params.nhomSelectedId')
                    }, {
                        sort: {
                            'order': 1
                        }
                    }).fetch();
                },
                loais: () => {
                    return Loais.find({
                        'chung_loai.keyId': vm.getReactively('params.chungloaiSelectedId')
                    }, {
                        sort: {
                            'order': 1
                        }
                    }).fetch();
                },
                donvis: () => {
                    return DonVis.find({}, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch();
                },
                diabans: () => {
                    return DiaBans.find({}, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch();
                },
                quocgias: () => {
                    return QuocGias.find({}, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch();
                },
                hangsanxuats: () => {
                    return HangSanXuats.find({}, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch();
                },
                modelthietbis: () => {
                    return ModelThietBis.find({
                        'hang_san_xuat.keyId': vm.getReactively('params.hangsanxuatSelectedId')
                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch();
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            vm.save = () => {

                let err = vm._helpers.validateUser('can_upsert_thiet_bi');
                if (_.isEmpty(err)) {
                    err = vm._helpers.validateThietBiForm(vm.source);
                    if (_.isEmpty(err)) {

                        vm._helpers.buildThietBi(vm.source);
                        ThietBis.update({
                            _id: $rootScope.$stateParams.thietbiId
                        }, {
                            $set: {
                                ma_tb: vm.source.ma_tb,
                                phan_loai: vm.source.phan_loai,
                                ho_so_tb: vm.source.ho_so_tb,
                                status: vm.source.status,
                                mo_ta: vm.source.mo_ta,
                                ghi_chu: vm.source.ghi_chu,
                                dia_ban_hoat_dong: vm.source.dia_ban_hoat_dong,
                                don_vi_quan_ly: vm.source.don_vi_quan_ly,
                                don_vi_so_huu: vm.source.don_vi_so_huu,                        
                                don_vi_field: vm.source.don_vi_field,                        
                                isPublic: vm.source.isPublic,
                                isArchived: vm.source.isArchived,
                                'metadata.ngay_cap_nhat_cuoi': vm.source.metadata.ngay_cap_nhat_cuoi,
                                'metadata.nguoi_cap_nhat_cuoi': vm.source.metadata.nguoi_cap_nhat_cuoi,
                                'metadata.nguoi_cap_nhat_cuoi_field': vm.source.metadata.nguoi_cap_nhat_cuoi_field,
                                'metadata.search_field': vm.source.metadata.search_field
                            }
                        }, (error) => {
                            if (error) {
                                iNotifier.error('Không thể cập nhật thiết bị này. ' + error.message + '.');
                            } else {
                                iNotifier.success('Thiết bị "' + vm.source.ma_tb.ma_tb + '" được cập nhật thành công.');

                                vm.master = ThietBis.findOne({
                                    _id: $rootScope.$stateParams.thietbiId
                                });
                            }
                        });

                    } else {
                        iNotifier.error(err.message);
                    }
                } else {
                    iNotifier.error(err.message);
                }
            };

            vm.reset = () => {
                console.log('vm.source: ', vm.source);
                console.log('vm.master: ', vm.master);
                angular.copy(vm.master, vm.source);
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                accentColor: _.findWhere(vm._data.general.themes, {
                    name: $rootScope.main_theme
                }).color_accent
            };

            // ***************************************************
            // FIX BUGS
            // ***************************************************

            // $timeout(()=>{
            //    $("#phanloai_chungloai_dropdown").data("kendoDropDownList").refresh(); // fix bugs kendo không hiển thị được giá trị tại field chủng loại
            // }, 1000);

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $rootScope.$watch('main_theme', (newVal) => {
                vm.utils.accentColor = _.findWhere(vm._data.general.themes, {
                    name: newVal
                }).color_accent;
            });

            $scope.$watch('vm.source.phan_loai.nhom.keyId', (newVal) => {
                
                if (vm.master && vm.master.phan_loai) {
                    vm.params.nhomSelectedId = newVal;

                    // Reset lại giá trị của chủng loại sau khi chọn keyId của nhóm khác rồi quay về keyId của nhóm lúc đầu, delay 300ms cho quá trình init kendo
                    if (newVal === vm.master.phan_loai.nhom.keyId) {
                        $timeout(()=>{
                            vm.source.phan_loai.chung_loai.keyId = vm.master.phan_loai.chung_loai.keyId;
                        }, 300);            
                    }
                    else    
                        vm.source.phan_loai.chung_loai.keyId = '';
                }
                
            });

            $scope.$watch('vm.source.phan_loai.chung_loai.keyId', (newVal) => {
                
                if (vm.master && vm.master.phan_loai) {
                    vm.params.chungloaiSelectedId = newVal;
                    
                    // Reset lại giá trị của chủng loại sau khi chọn keyId của chủng loại khác rồi quay về keyId của chủng loại lúc đầu, delay 300ms cho quá trình init kendo
                    if (newVal === vm.master.phan_loai.chung_loai.keyId) {
                        $timeout(()=>{
                            vm.source.phan_loai.loai.keyId = vm.master.phan_loai.loai.keyId;
                        }, 300);
                    }
                    else    
                        vm.source.phan_loai.loai.keyId = '';
                }
            });

            $scope.$watch('vm.source.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId', (newVal) => {
                
                if (vm.master && vm.master.ho_so_tb) {
                    vm.params.hangsanxuatSelectedId = newVal;
                    
                    if (newVal === vm.master.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId) {
                        $timeout(()=>{
                           vm.source.ho_so_tb.thong_tin_chung.model_tb.keyId = vm.master.ho_so_tb.thong_tin_chung.model_tb.keyId;
                        }, 300);
                    }
                    else    
                        vm.source.ho_so_tb.thong_tin_chung.model_tb.keyId = '';
                }
            });

            $scope.$watch('vm.source.ho_so_tb.thong_tin_chung.bao_hanh.isThongTinBaoHanh', (newVal) => {
                if (vm.source && vm.source.ho_so_tb && vm.source.ho_so_tb.thong_tin_chung)
                    if (!newVal) {
                        vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh = '';
                        vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau = '';
                        vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = '';
                    }
            });

            $scope.$watch('vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh', (newVal) => {
                if (newVal > 0) {
                    if (vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau) {
                        vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = moment(vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                    }
                }
            });

            $scope.$watch('vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau', (newVal) => {
                if (newVal > 0) {
                    if (vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh) {
                        vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = moment(vm.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                    }
                }
            });

            
        }
    }
});
