angular.module('angular-skynet').directive('thietbisUpdateThongsokythuats', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-update/thongsokythuats/thietbis-update-thongsokythuats.template.html',
        controllerAs: 'vm',
        scope: {
            source: '=',
            master: '='
        },
        bindToController: true,
        controller: function($scope, skynetHelpers, $rootScope, iNotifier, $reactive, skynetDictionary) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;

            vm.dictionary = angular.copy(skynetDictionary.data.thietbis.thong_so_ky_thuat);

            vm.pageOptions = {
                isGiaTriKieuText: false,
                fabState: 'thongsokythuats_goToList',
                isConfirmBeforeDelete: false,
                selected: {
                    thongsokythuat: {}
                }
            }

            vm._helpers.initNewThongSoKyThuatParams(vm, vm.master);

            vm.gridData = {
                thongsokythuatsGrid: {
                    kData: {
                        dataSource: {
                            data: new kendo.data.ObservableObject([]),
                            pageSize: 8,
                            schema:{
                                model: {
                                    id: "_id",
                                    fields: {
                                        nhom_thong_so: { type: "string" },
                                        ten: { type: "string" },
                                        gia_tri: { type: "number" },
                                        don_vi: { type: "string" },
                                        gia_tri_text: { type: "string" }
                                    }
                                }
                            },
                            group: {
                                field: "nhom_thong_so", 
                                aggregates: [
                                    { field: "nhom_thong_so", aggregate: "count" }
                                ]
                            }
                        }
                    },
                    kOptions: {
                        columns: [{
                            field: "nhom_thong_so",
                            title: "Nhóm",
                            type: "string",
                            width: "100px",
                            hidden: true,
                            aggregates: ["count"],
                            groupHeaderTemplate: "Nhóm: #= value # (Số lượng: #= count#)"
                        }, {
                            field: "ten",
                            title: "Thông số",
                            type: "string",
                            width: "150px"
                        }, {
                            field: "gia_tri",
                            title: "Giá trị",
                            type: "number",
                            width: "60px"
                        }, {
                            field: "don_vi",
                            title: "Đơn vị",
                            type: "string",
                            width: "50px"
                        }, {
                            field: "gia_tri_text",
                            title: "Giá trị *",
                            type: "string",
                            width: "80px"
                        }],
                        selectable: "row",
                        sortable: {
                            mode: "multiple",
                            allowUnsort: true
                        },
                        pageable: {
                            refresh: false,
                            pageSizes: false,
                            info: true,
                            buttonCount: 3,
                            numeric: true,
                            input: false,
                            previousNext: true
                        },
                        filterable: {
                            mode: 'menu',
                            extra: true
                        },
                        reorderable: true,
                        scrollable: {
                            virtual: false
                        },
                        resizable: true,
                        columnMenu: false
                    },
                    gridOnChange: function(event) {
                        let grid = $("#myGrid").data("kendoGrid");
                        if (grid.select().length)  {
                            
                            if (!vm.pageOptions.selected.thongsokythuat._id) {
                                vm.pageOptions.selected.thongsokythuat = angular.copy(grid.dataItem(grid.select()));
                                // Đổi trạng thái FAB
                                vm.pageOptions.fabState = 'thongsokythuats_update';
                            }
                            else {
                                if (vm.pageOptions.selected.thongsokythuat._id === grid.dataItem(grid.select())._id) {
                                    // Nếu click lại một lần nữa vào hàng đã chọn -> bỏ chọn
                                    vm.pageOptions.selected.thongsokythuat = {};
                                    vm.pageOptions.fabState = 'thongsokythuats_goToList';                                                                       

                                    try {
                                        grid.clearSelection();    
                                    } catch (err) {
                                        // ERROR CLEAR SELECTION???
                                        console.log('Error clearing selection: ', err.message);
                                    }
                                }
                                else {
                                    vm.pageOptions.selected.thongsokythuat = grid.dataItem(grid.select());
                                    vm.pageOptions.fabState = 'thongsokythuats_update';
                                }
                            }
                        }
                    },
                    gridOnDataBound: function(event) {
                    }
                }
            }

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('thongsokythuats');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                thongsokythuats: () => {
                    vm.gridData.thongsokythuatsGrid.kData.dataSource.data = ThongSoKyThuats.find({
                        'thiet_bi.keyId': vm.master._id
                    }).fetch();
                    return ThongSoKyThuats.find({
                        'thiet_bi.keyId': vm.master._id
                    });
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            vm.addNewThongSoKyThuat = () => {
                let err = vm._helpers.validateUser('can_upsert_thong_so_ky_thuat');
                if (_.isEmpty(err)) {
                    err = vm._helpers.validateThongSoKyThuatForm(vm.newThongSoKyThuat);
                    if (_.isEmpty(err)) {

                        vm._helpers.buildNewThongSoKyThuat(vm.newThongSoKyThuat);
                        ThongSoKyThuats.insert(vm.newThongSoKyThuat, (error, result) => {
                            if (error) {
                                iNotifier.error('Không thể tạo mới thông số kỹ thuật này. ' + error.message + '.');
                            } else {
                                $scope.$apply( () => {
                                    vm._helpers.initNewThongSoKyThuatParams(vm, vm.master);
                                });                        
                                iNotifier.success('Thông số kỹ thuật của thiết bị được cập nhật thành công.');
                            }
                        });

                    } else {
                        iNotifier.error(err.message);
                    }
                } else {
                    iNotifier.error(err.message);
                }
            };

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                
                accentColor: _.findWhere(vm._data.general.themes, {
                    name: $rootScope.main_theme
                }).color_accent,
                
                updateThongSoKyThuat: () => {
                    let err = vm._helpers.validateUser('can_upsert_thong_so_ky_thuat');
                    if (_.isEmpty(err)) {
                        err = vm._helpers.validateThongSoKyThuatForm(vm.source);
                        if (_.isEmpty(err)) {

                            vm._helpers.buildThongSoKyThuat(vm.source);
                            ThongSoKyThuats.update({
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

                                    vm.master = ThongSoKyThuats.findOne({
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
                },
                reset: () => {
                    angular.copy(vm.master, vm.source);
                }
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

            $scope.$watch('vm.newThongSoKyThuat.nhom_thong_so', (newVal) => {
                vm.pageOptions.isGiaTriKieuText = (_.contains(vm.dictionary.nhom_thong_so_voi_gia_tri_text, newVal)) ? true : false; 
            });

            
        }
    }
});
