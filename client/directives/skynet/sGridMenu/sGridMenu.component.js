angular.module('angular-skynet').directive('sGridMenu', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/directives/skynet/sGridMenu/sGridMenu.html',
        scope: {
            pageOptions: '=',
            kGridDataSource: '=',
            localConfigDataName: '=',
            cloudConfigDataName: '=' 
        },
        controllerAs: 'vm',
        bindToController: true,

        controller: function($scope, $rootScope, iNotifier, skynetKendoGrid, $auth, $reactive, skynetKendoGrid, skynetLiveOptions) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

             // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;
            
            vm._kHelpers = skynetKendoGrid.cauhois.helpers;
            vm._kOptions = skynetLiveOptions.cauhois.kendo.options.grids.cauhois_list;

            vm.data = {
                selector: '#myGrid',
                kGrid: {},
                sMenu: {
                    status: {
                        columns: {
                            master: [],
                            current: []
                        },
                        excel: {
                            current: {}
                        },
                        filterable: {
                            current: {}
                        },
                        groupable: {
                            current: {}
                        },
                        pageable: {
                            pageSize: 5,
                            current: {}
                        },
                        pdf: {
                            current: {}
                        },
                        reorderable: {
                            current: true
                        },
                        resizable: {
                            current: true
                        },                        
                        scrollable: {
                            current: {}
                        },
                        selectable: {
                            current: 'row'
                        },                       
                        sortable: {
                            current: {}
                        },
                        toolbar: {
                            isDisplayToolbar: true,
                            current: {}
                        }
                    },
                    config: {
                        userGridSettings: [],
                        skynetGridSettings: [],
                    }                   
                },                
            }

            vm.menuOptions = {                
                // Chứa thông tin mới về cấu hình tạo bởi user hoặc admin
                newConfig: {},
                // Chứa thông tinh về id cấu hình hiện tại -> hiển thị dấu tích nhỏ bên cạnh cấu hình được chọn
                currentConfigId: '',
                isSaveDataLimitToLocalDevice: false
            };

            // $scope.currentUser = Meteor.user();

            vm.kendoMenu = {
                // CAUTION: NHỚ CẬP NHẬT LẠI HÀM UTILS.updateMenuOnUserConfigs() TRƯỚC KHI ĐỔI VỊ TRÍ CÁC MỤC TRONG MENU!
                dataSource: [{
                    text: "Dữ liệu",
                    items: [{
                        text: "Các cột dữ liệu",
                    }, {
                        text: "Thanh dữ liệu"
                    }, {
                        text: "Xuất dữ liệu Excel",
                    }, {
                        text: "Xuất dữ liệu PDF"
                    }]
                }, {
                    text: "Chức năng",
                    items: [{
                        text: "Phân trang",
                    }, {
                        text: "Lọc và sắp xếp"
                    }, {
                        text: "Thao tác dữ liệu"
                    }, {
                        // text: "<span ng-hide='gridData.kGrid.kOptions.toolbar'>Hiện Toolbar</span><span ng-show='gridData.kGrid.kOptions.toolbar'>Ẩn Toolbar</span>",
                        text: "Thanh Toolbar <span ng-show='vm.data.sMenu.status.toolbar.isDisplayToolbar' class='k-icon k-si-tick'></span>",
                        encoded: false
                    }, {
                        text: "Soạn thảo <span ng-show='vm.pageOptions.data.kWindow.isActive' class='k-icon k-si-tick'></span>",
                        encoded: false
                    }]
                }, {
                    text: "Cấu hình",
                    items: [{
                        text: "Chọn cấu hình",
                        items: [{
                            text: "Đã lưu",
                        }, {
                            text: "Từ Skynet...",
                        }]
                    }, {
                        text: "Quản lý cấu hình",
                    }, {
                        text: "Lưu cấu hình hiện tại"
                    }, {
                        text: "Trở về mặc định"
                    }]
                }]
            };


            // ***************************************************
            // METHODS
            // ***************************************************
            vm.onSelect = function(e) {
                let textContent = e.item.textContent;
                // vm.data.kGrid = $(vm.data.selector).data("kendoGrid");

                switch (textContent) {
                    case "Các cột dữ liệu":
                        vm.utils.menu_data_columns.readStatus();                      
                        UIkit.modal("#modal_menu_data_columns").show();
                        break;
                    case "Thanh dữ liệu":
                        // vm.utils.menu_data_topbar.readStatus();
                        UIkit.modal("#modal_menu_data_topbar").show();
                        break;
                    case "Xuất dữ liệu Excel":
                        vm.utils.menu_data_saveAsExcel.readStatus();
                        UIkit.modal("#modal_menu_data_saveAsExcel").show();
                        break;
                    case "Xuất dữ liệu PDF":
                        vm.utils.menu_data_saveAsPdf.readStatus();
                        UIkit.modal("#modal_menu_data_saveAsPdf").show();
                        break;                    
                    case "Phân trang":
                        vm.utils.menu_features_paging.readStatus();
                        UIkit.modal("#modal_menu_features_paging").show();
                        break;
                    case "Lọc và sắp xếp":
                        vm.utils.menu_features_filterAndSort.readStatus();
                        UIkit.modal("#modal_menu_features_filterAndSort").show();
                        break;
                    case "Thao tác dữ liệu":
                        vm.utils.menu_features_generalSettings.readStatus();
                        UIkit.modal("#modal_menu_features_generalSettings").show();
                        break;
                    case "Thanh Toolbar ":
                        vm.utils.menu_features_toolbar.readStatus();
                        vm.utils.menu_features_toolbar.toggleToolbar();
                        break;
                    case "Soạn thảo ":
                        vm.utils.menu_features_compose.toggleWindow();
                        break;
                    case "Lưu cấu hình hiện tại":
                        UIkit.modal("#modal_menu_configs_saveCurrent").show();
                        break;
                    case "Quản lý cấu hình":
                        // Quá trình sử dụng modal 'Quản lý cấu hình', ta phải dùng thêm 1 grid. Vì tần suất sử dụng modal này ít,
                        // nên ta sử dụng ng-if để giới hạn thời điểm khi grid này được render. Sử dụng flag
                        // 'vm.utils.menu_config_manageConfig.modalOptions.isModalActive' để kích hoạt.
                        // Cờ này chỉ sử dụng để bật 1 lần duy nhất tại đây.
                        vm.utils.menu_config_manageConfig.modalOptions.isModalActive = true;
                        UIkit.modal("#modal_menu_configs_manage").show();
                        break;
                    case "Trở về mặc định":
                        vm.utils.menu_config_resetToDefault.resetToDefaultConfig();
                        break;        
                }
            }


            // ***************************************************
            // UTILS
            // ***************************************************
            vm.utils = {
                // Menu: Utils Buttons
                menu_utils_buttons: {
                    setExpandViewMode: function(value) {
                        vm.pageOptions.isExpandedView = (value) ? true : false;
                    },
                    clearSelection: function() {
                        vm.pageOptions.selected = {};
                        try {
                            vm.pageOptions.gridRef.clearSelection();
                        } catch (error) {
                            console.log(error);
                        }
                        try {
                            vm.pageOptions.data.kWindow.selectedItem = {};
                            vm.pageOptions.fabState = 'cauhois_createNew';
                        } catch (err) {
                            console.log(err);
                        }                        
                    }
                },
                // Menu: Dữ liệu -> Các cột dữ liệu
                menu_data_columns: {
                    readStatus: () => {
                        // Tạo bản sao lưu dữ liệu để đối chiếu                
                        vm.data.sMenu.status.columns.master = _.map(vm.pageOptions.gridRef.getOptions().columns, (item) => {
                            return {
                                field: item.field,
                                title: item.title,
                                isActive: !item.hidden,
                                locked: item.locked
                            }
                        });
                        vm.data.sMenu.status.columns.current = angular.copy(vm.data.sMenu.status.columns.master);
                    },
                    updateStatus: () => {
                        _.each(vm.data.sMenu.status.columns.current, (item, index) => {
                            if (item.isActive !== vm.data.sMenu.status.columns.master[index].isActive) {
                                // Nếu giá trị từ true -> false: Ẩn cột và ngược lại
                                if (item.isActive)
                                    vm.pageOptions.gridRef.showColumn(item.field)
                                else
                                    vm.pageOptions.gridRef.hideColumn(item.field)
                            }
                        });
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.columns = vm.pageOptions.gridRef.getOptions().columns;
                        vm.utils.menu_data_columns.readStatus();
                    }   
                },

                // Menu: Dữ liệu -> Thanh dữ liệu
                menu_data_topbar: {
                    setFilterNhomId: function(e) {
                        vm.pageOptions.filters.filterNhomId = e.sender._old;
                    },
                    // TO SET DATA: localStorage.setItem(fileNamToSaveLocal, JSON.stringify(config_data_range));
                    // TO REMOVE DATA: localStorage.removeItem('notification_style')
                    // TO GET DATA: $scope.notificationStyle = localStorage.getItem("notification_style");
                    saveConfigToLocalDevice: function() {
                        let config_data_range = {
                            isDisplayTopBar: vm.pageOptions.isDisplayTopBar,
                            topBarHeight: vm.pageOptions.topBarHeight,
                            filters: {
                                filterNhomId: vm.pageOptions.filters.filterNhomId,
                                nhomsFilterSource: vm.pageOptions.filters.nhomsFilterSource
                            }                        
                        }
                        console.log('local data to save: ', config_data_range);
                        localStorage.setItem(vm.localConfigDataName, JSON.stringify(config_data_range));                    
                        iNotifier.success('Thiết lập về truy vấn dữ liệu đã được lưu lại trên thiết bị của bạn.');                     
                        
                        // Reset lại check box 'Lưu các thiết lập này trên thiết bị của tôi'
                        vm.menuOptions.isSaveDataLimitToLocalDevice = false;
                    },
                    resetConfigToLocalDevice: function() {
                        localStorage.removeItem(vm.localConfigDataName);
                        _.each(vm.pageOptions.filters.nhomsFilterSource, (item) => {
                            item.isActive = true;
                        });
                        vm.pageOptions.filters.filterNhomId = '';
                        vm.pageOptions.isDisplayTopBar = true;
                        vm.pageOptions.topBarHeight = 'x1';
                        iNotifier.info('Các thiết lập về truy vấn dữ liệu trên thiết bị của bạn đã được đưa về mặc định.');
                    }
                },
                
                // Menu: Dữ liệu -> Xuất dữ liệu Excel
                menu_data_saveAsExcel: {
                    readStatus: () => {
                        vm.data.sMenu.status.excel.current = vm.pageOptions.gridRef.getOptions().excel;
                    },
                    saveAsExcel: () => {
                        vm.data.sMenu.status.excel.current.fileName = vm.data.sMenu.status.excel.current.fileName ? vm.data.sMenu.status.excel.current.fileName : 'From Sky with Love.xlsx';
                        
                        vm.pageOptions.gridRef.setOptions({
                            excel: vm.data.sMenu.status.excel.current
                        });
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.excel = angular.copy(vm.data.sMenu.status.excel.current);
                        vm.pageOptions.gridRef.saveAsExcel();
                    }
                },

                // Menu: Dữ liệu -> Xuất dữ liệu Pdf
                menu_data_saveAsPdf: {
                    readStatus: () => {
                        vm.data.sMenu.status.pdf.current = vm.pageOptions.gridRef.getOptions().pdf;
                    },
                    saveAsPdf: () => {
                        vm.data.sMenu.status.pdf.current.fileName = vm.data.sMenu.status.pdf.current.fileName ? vm.data.sMenu.status.pdf.current.fileName : 'From Sky with Love.pdf';
                        
                        vm.pageOptions.gridRef.setOptions({
                            pdf: vm.data.sMenu.status.pdf.current
                        });
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.pdf = angular.copy(vm.data.sMenu.status.pdf.current);
                        vm.pageOptions.gridRef.saveAsPDF();
                    }
                },

                // Menu: Chức năng -> Phân trang
                menu_features_paging: {
                    readStatus: () => {
                        vm.data.sMenu.status.pageable.current = vm.pageOptions.gridRef.getOptions().pageable;
                        vm.data.sMenu.status.pageable.pageSize = vm.kGridDataSource.pageSize();
                    },
                    updateStatus: () => {
                        vm.pageOptions.gridRef.setOptions({
                            pageable: vm.data.sMenu.status.pageable.current
                        });
                        // Nếu người dùng thay đổi số mục hiển thị mỗi trang -> cập nhật thay đổi này
                        if (vm.data.sMenu.status.pageable.pageSize !== vm.kGridDataSource.pageSize())
                            vm.kGridDataSource.pageSize(vm.data.sMenu.status.pageable.pageSize);
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.pageable = angular.copy(vm.data.sMenu.status.pageable.current);
                        vm.utils.menu_features_paging.readStatus();
                    },
                },

                // Menu: Chức năng -> Lọc và sắp xếp
                menu_features_filterAndSort: {
                    readStatus: () => {
                        vm.data.sMenu.status.filterable.current = vm.pageOptions.gridRef.getOptions().filterable;
                        vm.data.sMenu.status.sortable.current = vm.pageOptions.gridRef.getOptions().sortable;
                    },
                    updateStatus: () => {
                        vm.pageOptions.gridRef.setOptions({
                            filterable: vm.data.sMenu.status.filterable.current,
                            sortable: vm.data.sMenu.status.sortable.current
                        });
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.filterable = angular.copy(vm.data.sMenu.status.filterable.current);
                        vm._kOptions.sortable = angular.copy(vm.data.sMenu.status.sortable.current);
                        vm.utils.menu_features_filterAndSort.readStatus();
                    }
                },

                // Menu: Chức năng -> Thao tác dữ liệu
                menu_features_generalSettings: {
                    readStatus: () => {
                        let options = vm.pageOptions.gridRef.getOptions();
                        
                        vm.data.sMenu.status.selectable.current = options.selectable;                        
                        vm.data.sMenu.status.groupable.current = options.groupable;                      
                        vm.data.sMenu.status.resizable.current = options.resizable;
                        vm.data.sMenu.status.reorderable.current = options.reorderable;
                        vm.data.sMenu.status.scrollable.current = options.scrollable;
                    },
                    updateStatus: () => {
                        vm.pageOptions.gridRef.setOptions({
                            selectable: vm.data.sMenu.status.selectable.current,
                            groupable: vm.data.sMenu.status.groupable.current,
                            resizable: vm.data.sMenu.status.resizable.current,
                            reorderable: vm.data.sMenu.status.reorderable.current,
                            scrollable: vm.data.sMenu.status.scrollable.current
                        });
                        // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                        vm._kOptions.selectable = vm.data.sMenu.status.selectable.current;
                        vm._kOptions.groupable = angular.copy(vm.data.sMenu.status.groupable.current);
                        vm._kOptions.resizable = vm.data.sMenu.status.resizable.current;
                        vm._kOptions.reorderable = vm.data.sMenu.status.reorderable.current;
                        vm._kOptions.scrollable = angular.copy(vm.data.sMenu.status.scrollable.current);
                        vm.utils.menu_features_generalSettings.readStatus();
                    }
                },

                // Menu: Chức năng -> Thanh Toolbar
                menu_features_toolbar: {
                    readStatus: () => {
                        vm.data.sMenu.status.toolbar.current = vm.pageOptions.gridRef.getOptions().toolbar;
                        vm.data.sMenu.status.toolbar.isDisplayToolbar = vm.data.sMenu.status.toolbar.current ? true : false;
                    },
                    toggleToolbar: () => {
                        // Nếu từ trạng thái hidden -> show và ngược lại
                        if (!vm.data.sMenu.status.toolbar.isDisplayToolbar) {
                            vm.pageOptions.gridRef.setOptions({
                                toolbar: ["excel", "pdf"]
                            });
                            // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                            vm.kOptions.toolbar = ["excel", "pdf"];
                        } else {
                            vm.pageOptions.gridRef.setOptions({
                                toolbar: false
                            });
                            // Sau khi cập nhật lại trạng thái, lưu lại các trạng thái này vào skyLiveOptions và đọc lại giá trị
                            vm.kOptions.toolbar = false;
                        }                       
                        
                        // Cập nhật trạng thái isDisplayToolbar
                        vm.data.sMenu.status.toolbar.isDisplayToolbar = !vm.data.sMenu.status.toolbar.isDisplayToolbar;
                    }
                },

                // Menu: Chức năng -> Soạn thảo
                menu_features_compose: {
                    toggleWindow: function() {
                        vm.pageOptions.data.kWindow.isActive = !vm.pageOptions.data.kWindow.isActive;
                    }
                },

                // Menu: Cấu hình -> Chọn cấu hình
                menu_config_loadConfig: {
                    loadUserConfig: function(id, from) {
                        // vm.pageOptions.gridRef = $(vm.data.selector).data("kendoGrid");

                        let config = {};                        
                        if (from == 'skynet')
                            config = _.findWhere(vm.data.sMenu.config.skynetGridSettings, {_id: id});
                        else 
                            config = _.findWhere(vm.data.sMenu.config.userGridSettings, {_id: id});

                        console.log('loaded config: (new)', config);
                        

                        if (!_.isEmpty(config)) {
                            // Load cấu hình options
                            vm.pageOptions.gridRef.setOptions(config.gia_tri.kGridOptions);

                            // Lưu giá trị của cấu hình vào skyLiveOptions
                            _.extend(vm._kOptions, config.gia_tri.kGridOptions);

                            // Load cấu hình dataSource
                            vm.kGridDataSource.filter(config.gia_tri.kDataSource.filter);
                            vm.kGridDataSource.group(config.gia_tri.kDataSource.group);
                            vm.kGridDataSource.aggregate(config.gia_tri.kDataSource.aggregate);
                            vm.kGridDataSource.pageSize(config.gia_tri.kDataSource.pageSize);
                            if (config.gia_tri.kDataSource.sort)
                                vm.kGridDataSource.sort(config.gia_tri.kDataSource.sort);
                            else 
                                vm.kGridDataSource.sort([]);

                            // Sau khi load cấu hình, đặt lại giá trị currentConfigId để hiển thị dấu tích nhỏ bên cạnh cấu hình được chọn
                            vm.menuOptions.currentConfigId = config._id;
                        }
                    }
                },

                // Menu: Cấu hình -> Trở về mặc định
                menu_config_resetToDefault: {
                    resetToDefaultConfig: function() {
                        let options = _.omit(vm._kHelpers.initDefaultOptions(), 'dataSource');
                        console.log('options default: ', options);
                        
                        // Set options
                        vm.pageOptions.gridRef.setOptions(options);

                        // Lưu giá trị của cấu hình vào skyLiveOptions
                        _.extend(vm._kOptions, options);

                        // Reset cấu hình dataSource
                        vm.kGridDataSource.filter([]);
                        vm.kGridDataSource.group([]);
                        vm.kGridDataSource.aggregate([]);
                        vm.kGridDataSource.pageSize(5);
                        vm.kGridDataSource.sort([]);
                    }
                },

                // Menu: Cấu hình -> Chọn cấu hình
                menu_config_manageConfig: {
                    // $("kGridUserConfig").data("kendoGrid");
                    kGridUserConfigOptions: {
                        dataSource: kendo.data.DataSource.create({
                            data: vm.data.sMenu.config.userGridSettings,
                            schema: {
                                model: {
                                    fields: {
                                        'ten': {
                                            type: 'string'
                                        },
                                        'order': {
                                            type: 'number'
                                        },
                                        'metadata.ngay_tao': {
                                            type: 'date'
                                        },
                                        'user.keyId': {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }),
                        // Có thể dùng template ở đây hoặc dùng columns.template
                        // rowTemplate: '<tr data-uid="#= uid #"><td>#: ten #</td><td style="text-align: right;">#: order #</td><td>#: kendo.toString(metadata.ngay_tao, "yyyy-MM-dd") #</td></tr>',
                        sortable: true,
                        pageable: false,
                        selectable: 'row',
                        change: function(e) {
                            let selectedItem = this.dataItem(this.select()[0]);
                            // Khi người dùng chọn một hàng mới -> load vào selectedConfig
                            if (selectedItem) {
                                if (_.isEmpty(vm.utils.menu_config_manageConfig.modalOptions.selectedConfig)) {
                                    vm.utils.menu_config_manageConfig.modalOptions.selectedConfig = angular.copy(selectedItem);
                                } else {
                                    // Trường hợp người dùng click lại một lần nữa để bỏ chọn và thoát chế độ update nếu có
                                    if (vm.utils.menu_config_manageConfig.modalOptions.selectedConfig._id === selectedItem._id) {
                                        this.clearSelection();
                                        vm.utils.menu_config_manageConfig.modalOptions.selectedConfig = {};
                                        vm.utils.menu_config_manageConfig.modalOptions.mode = '';
                                    }
                                    else
                                        vm.utils.menu_config_manageConfig.modalOptions.selectedConfig = angular.copy(selectedItem);
                                }
                            }
                        },
                        columns: [{
                            field: "ten",
                            title: "Tên cấu hình",
                            width: "120px",
                            // template: "<span ng-class=\"{'color-primary': #: user.keyId # === vm.currentUser._id}\">#: ten #</span>"
                        }, {
                            field: "order",
                            title: "Mức ưu tiên",
                            width: "60px",
                            attributes: {
                                style: "text-align: right;"
                            }
                        }, {
                            field: "metadata.ngay_tao",
                            title: "Ngày tạo",
                            width: "80px",
                            format: "{0: yyyy-MM-dd}"
                            // format: "{0: yyyy-MM-dd (hh:mm tt)}"
                        }]
                    },
                    modalOptions: {
                        isModalActive: false,
                        mode: '',
                        selectedConfig: {}
                    },
                    closeModal: () => {
                        let modal = UIkit.modal("#modal_menu_configs_manage");
                        if (modal.isActive()) {
                            // Reset các giá trị về mặc định
                            vm.utils.menu_config_manageConfig.modalOptions.mode = '';
                            modal.hide();
                        }
                    },
                    setMode: function(mode) {
                        if (!_.isEmpty(this.modalOptions.selectedConfig))
                            this.modalOptions.mode = mode;
                    },
                    validateBeforeUpdate: function(source) {
                        let error = {};
                        if (!Meteor.userId())
                            error.message = "Bạn cần đăng nhập để sử dụng chức năng này.";
                        if (!source.ten)
                            error.message = "Thông tin về tên cấu hình là bắt buộc.";
                        return error;
                    },
                    buildBeforeUpdate: function(source) {
                        let user = Meteor.user();
                        if (Roles.userIsInRole(user._id, ['admin'], 'sky-project'))
                            source.isPublic = this.modalOptions.selectedConfig.isPublic;
                        else 
                            source.isPublic = false;
                        source.metadata.ngay_cap_nhat_cuoi = new Date();
                        source.metadata.nguoi_cap_nhat_cuoi = user._id;
                        source.metadata.nguoi_cap_nhat_cuoi_email = user.emails[0].address;
                        if (user.profile && user.profile.name)
                            source.metadata.nguoi_cap_nhat_cuoi_name = user.profile.name;
                    },  
                    cancelUpdate: function() {
                        this.modalOptions.mode = '';
                        this.modalOptions.selectedConfig = {};
                        $("#kGridUserConfig").data("kendoGrid").clearSelection();
                    },
                    update: function() {
                        let err = this.validateBeforeUpdate(this.modalOptions.selectedConfig);
                        if (_.isEmpty(err)) {
                            this.buildBeforeUpdate(this.modalOptions.selectedConfig);
                            console.log('build before update: (new)', this.modalOptions.selectedConfig);
                            UserSettings.update({
                                _id: this.modalOptions.selectedConfig._id
                            }, {
                                $set: {
                                    ten: this.modalOptions.selectedConfig.ten,
                                    order: this.modalOptions.selectedConfig.order,
                                    'metadata.ngay_cap_nhat_cuoi': this.modalOptions.selectedConfig.metadata.ngay_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi': this.modalOptions.selectedConfig.metadata.nguoi_cap_nhat_cuoi,
                                    'metadata.nguoi_cap_nhat_cuoi_name': this.modalOptions.selectedConfig.metadata.nguoi_cap_nhat_cuoi_name,
                                    'metadata.nguoi_cap_nhat_cuoi_email': this.modalOptions.selectedConfig.metadata.nguoi_cap_nhat_cuoi_email,
                                }
                            }, (error) => {
                                if (error) {
                                    iNotifier.error('Có lỗi xảy ra khi cập nhật cấu hình này. ' + error.message + '.');
                                } else {
                                    iNotifier.success('Cấu hình ngưòi dùng được cập nhật thành công.');

                                    $scope.$apply(() => {
                                        this.modalOptions.mode = '';
                                        this.modalOptions.selectedConfig = {};
                                    });                                    
                                }
                            });
                        } else {
                            iNotifier.error(err.message);
                        }
                    },
                    cancelRemove: function() {
                        this.modalOptions.mode = '';

                        // Bỏ chọn cấu hình hiện tại
                        this.modalOptions.selectedConfig = {};
                        $("#kGridUserConfig").data("kendoGrid").clearSelection();
                    },
                    removeConfig: function(id) {
                        if (id)
                            UserSettings.remove({_id: id});
                        this.cancelRemove();
                    },
                    
                    // Cập nhật menu config item qua vm.helpers
                    updateMenuOnUserConfigs: function(settings) {                    
                        // Tách các config thành các config của người dùng và của Skynet (isPublic=true)
                        let newUserConfigItems = [],
                            newSkynetConfigItems = [];

                        if (settings.length) {
                            let userSettings = _.filter(settings, (item) => {
                                return item.user.keyId === Meteor.userId();
                            }),
                                skynetSettings = _.where(settings, {'isPublic': true});
                            
                            if (userSettings.length) {
                                vm.data.sMenu.config.userGridSettings = _.map(userSettings, (item) => {
                                    return {
                                        _id: item._id,
                                        ten: item.ten,
                                        order: item.order,
                                        gia_tri: JSON.parse(item.gia_tri),
                                        metadata: item.metadata
                                    }
                                });
                                console.log('Parsed UserSettings (New): ', vm.data.sMenu.config.userGridSettings);
                                
                                // Cập nhật dataSource của grid quản lý config
                                vm.utils.menu_config_manageConfig.kGridUserConfigOptions.dataSource.data(vm.data.sMenu.config.userGridSettings);

                                // Cập nhật menu
                                let newUserConfigItems = _.map(vm.data.sMenu.config.userGridSettings, (item) => {
                                    return {
                                        text: '<span ng-click="vm.utils.menu_config_loadConfig.loadUserConfig(\'' + item._id + '\')">' + item.ten + '</span> <span ng-show="vm.menuOptions.currentConfigId===\'' + item._id + '\'"><span class="k-icon k-si-tick"></span></span>',
                                        encoded: false
                                    }
                                });
                                
                                // NEED MODIFY HERE!!!
                                vm.kendoMenu.dataSource[2].items[0].items[0].items = newUserConfigItems;

                            } else {
                                vm.data.sMenu.config.userGridSettings = [];
                                vm.kendoMenu.dataSource[2].items[0].items[0].items = null;
                            }
                            if (skynetSettings.length) {
                                vm.data.sMenu.config.skynetGridSettings = _.map(skynetSettings, (item) => {
                                    return {
                                        _id: item._id,
                                        ten: item.ten,
                                        order: item.order,
                                        gia_tri: JSON.parse(item.gia_tri)
                                    }
                                });
                                console.log('Parsed SkynetSettings: (New)', vm.data.sMenu.config.skynetGridSettings);
                                let newSkynetConfigItems = _.map(vm.data.sMenu.config.skynetGridSettings, (item) => {
                                    return {
                                        text: '<span ng-click="vm.utils.menu_config_loadConfig.loadUserConfig(\'' + item._id + '\', \'skynet\')">' + item.ten + '</span> <span ng-show="vm.menuOptions.currentConfigId===\'' + item._id + '\'"><span class="k-icon k-si-tick"></span></span>',
                                        encoded: false
                                    }
                                });

                                // NEED MODIFY HERE!!!
                                vm.kendoMenu.dataSource[2].items[0].items[1].items = newSkynetConfigItems;

                            }  else {
                                vm.data.sMenu.config.skynetGridSettings = [];
                                vm.kendoMenu.dataSource[2].items[0].items[1].items = null;
                            }                      
                        }    
                    }
                },

                // Menu: Cấu hình -> Lưu cấu hình hiện tại
                menu_config_createNew: {
                    initNewKendoGridConfig: function(config) {
                        config.ten = '',
                            config.order = 10,
                            config.user = {},
                            config.phan_loai = vm.cloudConfigDataName,
                            config.isPublic = false,
                            config.metadata = {}
                    },
                    validateGridConfig: function(config) {
                        let error = {};
                        if (!Meteor.userId())
                            error.message = "Bạn cần đăng nhập để sử dụng chức năng này.";
                        if (!config.ten)
                            error.message = "Bạn cần nhập tên cấu hình mới trước khi lưu.";
                        return error;
                    },
                    buildGridConfig: function(config) {
                        let user = Meteor.user();
                        
                        config.user = {
                            keyId: user._id,
                            email: user.emails[0].address,
                            profileName: user.profile.name
                        };
                        config.phan_loai = vm.cloudConfigDataName;
                        
                        // Build metadata
                        config.metadata = {
                            ngay_tao: new Date(),
                            nguoi_tao: user._id,
                            nguoi_tao_email: user.emails[0].address
                        }
                        config.metadata.nguoi_tao_field = '';
                        if (user.profile && user.profile.name) {
                            config.metadata.nguoi_tao_name = user.profile.name;
                            config.metadata.nguoi_tao_field += config.metadata.nguoi_tao_name;
                        }
                        config.metadata.nguoi_tao_field += ':' + user.emails[0].address;

                        // Chỉ có admin mới có thể tạo các trường public
                        if (!Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project'))
                            config.isPublic = false;

                        let options = vm.pageOptions.gridRef.getOptions();
                        config.gia_tri = JSON.stringify({
                            kGridOptions: _.omit(options, 'dataSource'),
                            kDataSource: _.omit(options.dataSource, 'data')
                        });
                    },
                    saveGridConfig: function() {
                        let err = this.validateGridConfig(vm.menuOptions.newConfig);
                        if (_.isEmpty(err)) {
                            this.buildGridConfig(vm.menuOptions.newConfig);
                            console.log('build: (new)', vm.menuOptions.newConfig);
                            UserSettings.insert(vm.menuOptions.newConfig, (err, result) => {
                                if (err) {
                                    iNotifier.error('Không thể tạo mới cấu hình này. ' + err.message + '.');
                                } else {
                                    this.initNewKendoGridConfig(vm.menuOptions.newConfig);
                                    iNotifier.success('Cấu hình của bạn đã được lưu trữ thành công.');
                                }
                            });
                        } else {
                            iNotifier.error(err.message);
                        }
                    }
                }
            }

            vm.utils.menu_config_createNew.initNewKendoGridConfig(vm.menuOptions.newConfig);


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************
            vm.helpers({
                userSettings: () => {
                    let settings = UserSettings.find({
                        $or: [{
                           $and: [{
                                'user.keyId': Meteor.userId()
                            }, {
                                phan_loai: vm.cloudConfigDataName
                            }] 
                        }, {
                            $and: [{
                                'isPublic': true
                            }, {
                                phan_loai: vm.cloudConfigDataName
                            }]
                        }]                        
                    }, {
                        sort: {
                            'order': -1
                        }
                    }).fetch();
                    if (!_.isEmpty(settings)) {
                        vm.utils.menu_config_manageConfig.updateMenuOnUserConfigs(settings);
                    }
                    return UserSettings.find();
                },
                isAdmin: () => {
                    return Roles.userIsInRole(Meteor.userId(), ['admin'], 'sky-project');
                },
                currentUser: () => {
                    return Meteor.user();
                }
            });


            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});
