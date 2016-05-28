angular.module('angular-skynet').directive('thietbisAddNew', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-add-new/thietbis-add-new.template.html',
        controllerAs: 'vm',
        controller: function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, $reactive) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;
            vm._helpers.initNewThietBiParams(vm);

            vm.params = {
                nhomSelectedId: null,
                chungloaiSelectedId: null,
                hangsanxuatSelectedId: null
            };

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                nhoms: () => Nhoms.find({
                    
                    }, {
                        sort: {
                            'order': 1
                        }
                    }).fetch(),
                chungloais: () => ChungLoais.find({
                        'nhom.keyId': vm.getReactively('params.nhomSelectedId')
                    }, {
                        sort: {
                            'order': 1
                        }
                    }).fetch(),
                loais: () => Loais.find({
                        'chung_loai.keyId': vm.getReactively('params.chungloaiSelectedId')
                    }, {
                        sort: {
                            'order': 1
                        }
                    }).fetch(),
                donvis: () => DonVis.find({

                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch(),
                diabans: () => DiaBans.find({

                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch(),
                quocgias: () => QuocGias.find({

                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch(),
                hangsanxuats: () => HangSanXuats.find({

                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch(),
                modelthietbis: () => ModelThietBis.find({
                        'hang_san_xuat.keyId': vm.getReactively('params.hangsanxuatSelectedId')
                    }, {
                        sort: {
                            'ten': 1
                        }
                    }).fetch()
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            vm.addNewThietBi = () => {
                let err = vm._helpers.validateUser('can_upsert_thiet_bi');
                if (_.isEmpty(err)) {
                    err = vm._helpers.validateThietBiForm(vm.newThietBi);
                    if (_.isEmpty(err)) {

                        vm._helpers.buildNewThietBi(vm.newThietBi);
                        ThietBis.insert(vm.newThietBi, (error, result) => {
                            if (error) {
                                iNotifier.error('Không thể tạo mới thiết bị này. ' + error.message + '.');
                            } else {
                                $scope.$apply( () => {
                                    vm._helpers.initNewThietBiParams(vm);
                                });                        
                                iNotifier.success('Thiết bị được tạo mới thành công.');
                            }
                        });

                    } else {
                        iNotifier.error(err.message);
                    }
                } else {
                    iNotifier.error(err.message);
                }
            };

            vm.clearNewThietBiForm = () => {
                vm._helpers.initNewThietBiParams(vm);
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                kendoOnChangeRestrictValues: function(e, field) {
                    if (e.sender.selectedIndex == -1) {
                        if (field === 'nhoms')
                            vm.newThietBi.phan_loai.nhom.keyId = '';
                        if (field === 'chungloais')
                            vm.newThietBi.phan_loai.chung_loai.keyId = '';
                        if (field === 'loais')
                            vm.newThietBi.phan_loai.loai.keyId = '';
                        if (field === 'donvisohuus')
                            vm.newThietBi.don_vi_so_huu.keyId = '';
                        if (field === 'donviquanlies')
                            vm.newThietBi.don_vi_quan_ly.keyId = '';
                        if (field === 'diabans')
                            vm.newThietBi.dia_ban_hoat_dong.keyId = '';
                        if (field === 'quocgias')
                            vm.newThietBi.ho_so_tb.thong_tin_chung.xuat_xu.keyId = '';
                        if (field === 'hangsanxuats')
                            vm.newThietBi.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId = '';
                        if (field === 'modelthietbis')
                            vm.newThietBi.ho_so_tb.thong_tin_chung.model_tb.keyId = '';
                    }
                },
                kendoOnDateChangeRestrict: function(e, field) {
                    // let startDate = e.sender._value;

                    // if (field == 'baohanh_batdau') {
                    //     if (vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh > 0) {
                    //         let endDate = moment(startDate).add(parseInt(vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh), 'M').toDate();
                    //         $('#baohanh_end').kendoDatePicker().data('kendoDatePicker').value(endDate);
                    //         vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = endDate;
                    //     }
                    // }
                },
                kendoThongsokythuatGridOptions: {
                    dataSource: {
                        data: vm.newThietBi.thong_so_ky_thuat,
                        schema: {
                            model: {
                                fields: {
                                    "loai_thong_so.nhom": {
                                        type: "string"
                                    },
                                    "loai_thong_so.ten": {
                                        type: "string"
                                    },
                                    "gia_tri": {
                                        type: "number"
                                    },
                                    "don_vi": {
                                        type: "string"
                                    }
                                }
                            }
                        },
                        pageSize: 10
                    },
                    editable: true,
                    pageable: true,
                    sortable: true,
                    columns: [{
                        field: "loai_thong_so.nhom",
                        title: "Nhóm",
                        width: "25%"
                    }, {
                        field: "loai_thong_so.ten",
                        title: "Thông số",
                        width: "35%"
                    }, {
                        field: "gia_tri",
                        title: "Giá trị",
                        width: "20%"
                    }, {
                        field: "don_vi",
                        title: "Đơn vị"
                    }]
                },
                accentColor: _.findWhere(vm._data.general.themes, {
                    name: $rootScope.main_theme
                }).color_accent
            };

            // ***************************************************
            // WATCHERS
            // ***************************************************

            $rootScope.$watch('main_theme', (newVal) => {
                vm.utils.accentColor = _.findWhere(vm._data.general.themes, {
                    name: newVal
                }).color_accent;
            });

            $scope.$watch('vm.newThietBi.phan_loai.nhom.keyId', (newVal) => {
                vm.params.nhomSelectedId = newVal;

                if (vm.newThietBi && vm.newThietBi.phan_loai && vm.newThietBi.phan_loai.chung_loai)
                    vm.newThietBi.phan_loai.chung_loai.keyId = '';
            });

            $scope.$watch('vm.newThietBi.phan_loai.chung_loai.keyId', (newVal) => {
                vm.params.chungloaiSelectedId = newVal;

                if (vm.newThietBi && vm.newThietBi.phan_loai && vm.newThietBi.phan_loai.loai)
                    vm.newThietBi.phan_loai.loai.keyId = '';
            });

            $scope.$watch('vm.newThietBi.ho_so_tb.thong_tin_chung.hang_san_xuat.keyId', (newVal) => {
                vm.params.hangsanxuatSelectedId = newVal;

                if (vm.newThietBi && vm.newThietBi.ho_so_tb && vm.newThietBi.ho_so_tb.thong_tin_chung && vm.newThietBi.ho_so_tb.thong_tin_chung.model_tb)
                    vm.newThietBi.ho_so_tb.thong_tin_chung.model_tb.keyId = '';
            });

            $scope.$watch('vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.isThongTinBaoHanh', (newVal) => {
                if (!newVal) {
                    vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh = '';
                    vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau = '';
                    vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = '';
                }
            });

            $scope.$watch('vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh', (newVal) => {
                if (newVal > 0) {
                    if (vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau) {
                        vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = moment(vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                        // let endDate = moment(vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                        // $('#baohanh_end').kendoDatePicker().data('kendoDatePicker').value(endDate);
                    }
                }
            });

            $scope.$watch('vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau', (newVal) => {
                if (newVal > 0) {
                    if (vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bao_hanh) {
                        vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc = moment(vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                        // let endDate = moment(vm.newThietBi.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_bat_dau).add(parseInt(newVal), 'M').toDate();
                        // $('#baohanh_end').kendoDatePicker().data('kendoDatePicker').value(endDate);
                    }
                }
            });

        }
    }
});
