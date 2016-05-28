angular.module('angular-skynet').directive('cauhoisList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/cauhois/cauhois-list/cauhois-list.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, skynetKendoGrid, $reactive, skynetDictionary, skynetLiveOptions) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;
            
            vm._kData = skynetKendoGrid.cauhois.data;
            vm._kHelpers = skynetKendoGrid.cauhois.helpers;

            vm.dictionary = angular.copy(skynetDictionary.data.nganhangcauhois.data.ky_thuat.trac_nghiem);

            vm.modalLightBox = UIkit.modal("#cauhois_list_lightbox");

            vm.pageOptions = {
                gridRef: {},
                // Cờ này dùng để fix bug mất select sau khi render lại grid
                isSelectFromController: false,
                data: {
                    kWindow: {
                        options: {
                            title: 'CÂU HỎI MỚI',
                            width: 400,
                            visible: false,
                            actions: [
                                "Pin",
                                "Minimize",
                                "Maximize",
                                "Close"
                            ],
                            position: {
                                top: 48,
                                left: 0
                            },
                            deactivate: function() {
                                $scope.$apply(() => {
                                    vm.pageOptions.data.kWindow.isActive = false;
                                });                                
                            }
                        },
                        mode: 'createNew',
                        isActive: false,
                        selectedItem: {}
                    },
                    lightbox: {
                        source: ''
                    }
                },
                localData: {
                    cauhois_config_data_filter: {}
                },
                isExpandedView: false,
                isDisplayTopBar: true,
                isDisplayFullWidthGrid: false,
                topBarHeight: 'x1',
                filters: {
                    filterNhomId: '',            
                    nhomsFilterSource: [],
                    nhomsFilterActiveIds: [],
                },
                fabState: _.isEmpty(vm._helpers.validateUser('can_upsert_cau_hoi')) ? 'cauhois_createNew' : '',
                selected: {},
                localConfigDataName: 'cauhois_config_data_local',
                cloudConfigDataName: 'cauhois_grid_config_data_skynet'
            };

            console.log('nhom: ', vm.pageOptions.filters.nhomsFilterSource)

            vm.pageReactiveData = {
                cauhois: [],
                tags: {
                    data: vm.dictionary.tags,
                    sort: { field: 'ten', dir: 'asc' },
                    group: { field: 'group' }

                },
                searchTags: [],
                searchLoaitbs: [],
                searchBacthis: []
            };

            vm.kDataHelpers = {
                options: {
                    tags: {
                        modalHeader: 'Quản lý Tag câu hỏi',
                        subject: 'cauhois',
                        category: 'tags',
                        // Các trường thông tin được sử dụng với kGridManager
                        columns: [{
                            field: 'container.ref',
                            title: "Nhóm tham chiếu",
                            width: "100px",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    showOperators: false,
                                    suggestionOperator: "contains"
                                }
                            }                           
                        }, {
                            field: 'container.group',
                            title: "Nhóm nội dung",
                            width: "100px",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    showOperators: false,
                                    suggestionOperator: "contains"
                                }
                            } 
                        }, {
                            field: 'container.text',
                            title: "Tên Tag",
                            width: "120px",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    showOperators: false
                                }
                            } 
                        }],
                        // Danh sách các trường nhập liệu sẽ được render ở template html
                        renderFields: {
                            ref: {
                                isActive: true,
                                field: 'ref',
                                label: "Nhóm tham chiếu",
                                textValidation: 'Chưa có thông tin về nhóm tham chiếu của Tag.',
                                recommended: ['Thiết bị nâng', 'Xe - Máy', 'Tàu thuyền']
                            },
                            group: {
                                isActive: true,
                                field: 'group',
                                label: "Nhóm nội dung",
                                textValidation: 'Chưa có thông tin về nhóm nội dung của Tag.',
                                recommended: ['Nội dung', 'Cụm CT']
                            },
                            text: {
                                isActive: true,
                                field: 'text',
                                label: "Tên Tag",
                                textValidation: 'Chưa có thông tin về tên Tag.',
                            },
                            order: {
                                isActive: false,
                            },                            
                            value: {
                                isActive: false,
                            }
                        }
                    },
                    loai_tbs: {
                        modalHeader: 'Quản lý Danh sách Loại thiết bị',
                        subject: 'cauhois',
                        category: 'loai_tbs',
                        // Các trường thông tin được sử dụng với kGridManager
                        columns: [{
                            field: 'container.ref',
                            title: "Nhóm tham chiếu",
                            width: "100px",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    showOperators: false,
                                    suggestionOperator: "contains"
                                }
                            }                            
                        }, {
                            field: 'container.text',
                            title: "Tên loại TB",
                            width: "120px",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    showOperators: false
                                }
                            } 
                        }],
                        // Danh sách các trường nhập liệu sẽ được render ở template html
                        renderFields: {
                            ref: {
                                isActive: true,
                                field: 'ref',
                                label: "Nhóm tham chiếu",
                                textValidation: 'Chưa có thông tin về nhóm tham chiếu của Loại thiết bị.',
                                recommended: ['Thiết bị nâng', 'Xe - Máy', 'Tàu thuyền']
                            },
                            group: {
                                isActive: false
                            },
                            text: {
                                isActive: true,
                                field: 'text',
                                label: "Tên Loại TB",
                                textValidation: 'Chưa có thông tin về tên Loại thiết bị.',
                            },
                            order: {
                                isActive: false,
                            },                            
                            value: {
                                isActive: false,
                            }
                        }
                    }
                }
            }

            kendo.pdf.defineFont({
                "Roboto": "/assets/fonts/DejaVuSans.ttf",
                "Roboto|Bold": "/assets/fonts/DejaVuSans-Bold.ttf",
                "Roboto|Bold|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf",
                "Roboto|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf"
            });


            vm.gridData = {
                kGrid: {
                    // kOptions: vm._kHelpers.initDefaultOptions()
                    kOptions: skynetLiveOptions.cauhois.kendo.options.grids.cauhois_list,
                    kEvents: {}
                }
            }

            // Quản lý các sự kiện events với kOptions
            // Khi người dùng click chọn một item, nếu item chưa được chọn -> chọn, nếu item đã được chọn trước đó -> bỏ chọn.
            vm.gridData.kGrid.kEvents.onChange = function(event, data) {
                if (!_.isEmpty(data)) {
                    if (vm.gridData.kGrid.kOptions.selectable === 'row') {                        
                        vm.pageOptions.fabState = 'cauhois_viewDetails';
                        vm.pageOptions.selected = angular.copy(data);
                        vm.pageOptions.data.kWindow.selectedItem = angular.copy(vm.pageOptions.selected);
                    }
                }
            };

            // Security: Chỉ cho phép tạo câu hỏi mới nếu người dùng có đủ thẩm quyền.
            vm.gridData.kGrid.kEvents.onDataBound = function(event) {
                // Fix lỗi khi chuyển từ dashboard sang cauhois-list thì bị mất tham chiếu
                if (_.isEmpty(vm.pageOptions.gridRef))
                    vm.pageOptions.gridRef = $("#myGrid").data("kendoGrid");
                vm.pageOptions.fabState = _.isEmpty(vm._helpers.validateUser('can_upsert_cau_hoi')) ? 'cauhois_createNew' : '';

                if (vm.pageOptions.gridRef.tbody) {
                    // Fix lỗi mất select sau khi bounding do grid re-render
                    if (!_.isEmpty(vm.pageOptions.selected)) {
                        vm.pageOptions.gridRef.select(vm.pageOptions.gridRef.tbody.find(">tr[data-uid='" + vm.pageOptions.selected.uid + "']"));
                    };

                    // Trường hợp isExpandedview được set là true thông qua menu -> expanded View
                    if (vm.pageOptions.isExpandedView) {
                        vm.pageOptions.gridRef.expandRow(vm.pageOptions.gridRef.tbody.find("tr.k-master-row"));
                    }
                }
                
            };

            

            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                showModalLightBox: function(src) {
                    if (src) {
                        vm.pageOptions.data.lightbox.source = src;
                        vm.modalLightBox.show();
                    }
                },
                setFilterByNhomId: function(id) {
                    // Nếu người dùng click vào đúng filter item đã chọn -> bỏ chọn, ngược lại, set filter item
                    vm.pageOptions.filters.filterNhomId = (vm.pageOptions.filters.filterNhomId === id) ? '' : id;
                },
                buildNhomsFilterSource: function() {
                    
                    vm.pageOptions.filters.nhomsFilterSource = _.sortBy(vm.dictionary.nhom_tbs, (item) => {
                        return item.order;
                    });
                    // Thêm filter 'Tất cả
                    vm.pageOptions.filters.nhomsFilterSource.unshift({ma: '', ten: "Tất cả"});

                    // Thêm trường isActive - true nếu hiển thị trên topbar, false nếu bị ẩn trên topbar
                    _.each(vm.pageOptions.filters.nhomsFilterSource, (item) => {
                        item.isActive = true
                    });

                    console.log('buildNhomsFilterSource: ', vm.pageOptions.filters.nhomsFilterSource);
                },
                loadNhomsFilterSourceFromLocal: function() {
                    // Thử load dữ liệu local cho cấu hình của thanh Topbar (nếu có)
                    try {
                        let localData = JSON.parse(localStorage.getItem(vm.pageOptions.localConfigDataName));
                        if (!_.isEmpty(localData)) {
                            console.log('data preload from cache: ', localData)
                    
                            vm.pageOptions.localData = angular.copy(localData);

                            vm.pageOptions.isDisplayTopBar = _.has(localData, 'isDisplayTopBar') ? localData.isDisplayTopBar : true;
                            vm.pageOptions.topBarHeight = (localData.topBarHeight) ? localData.topBarHeight : 'x1';
                            vm.pageOptions.filters.filterNhomId = (localData.filters.filterNhomId) ? localData.filters.filterNhomId : '';
                            vm.pageOptions.filters.nhomsFilterSource = (localData.filters.nhomsFilterSource) ? angular.copy(localData.filters.nhomsFilterSource) : [];
                        } else {
                            // Nếu chưa có dữ liệu cho topbar được lưu từ trước đó, tạo dữ liệu mới cho topbar
                            vm.utils.buildNhomsFilterSource();
                        }        
                    }
                    catch(err) {
                        // Nếu dữ liệu không tương thích, tạo dữ liệu mới cho topbar
                        vm.utils.buildNhomsFilterSource();
                        iNotifier.error('Có lỗi xảy ra với cấu hình dữ liệu mà bạn đã lưu trên thiết bị này. Vui lòng reset theo các bước sau: Từ Menu > Dữ liệu > Thanh dữ liệu > Reset.');
                    }
                    console.log('data load from cache: ', vm.pageOptions);
                }
            }

            vm.utils.loadNhomsFilterSourceFromLocal();

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('cauhois', () => {
                return [{
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'))
                    },
                    $rootScope.getReactively('searchText'),
                    $rootScope.getReactively('searchBy'),
                    $scope.getReactively('vm.pageReactiveData.searchTags'),
                    $scope.getReactively('vm.pageReactiveData.searchLoaitbs'),
                    $scope.getReactively('vm.pageReactiveData.searchBacthis')
                ]
            });

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                cauhois: () => {
                    let data = vm.pageOptions.filters.filterNhomId ? CauHois.find({'phan_loai.nhom_tb.ma': vm.pageOptions.filters.filterNhomId}).fetch() : CauHois.find({}).fetch();
                    try {
                        vm.gridData.kGrid.kOptions.dataSource.data(data);
                    } catch (error) {
                        console.log("Error: ", error);
                    }
                    return CauHois.find({
                        'phan_loai.nhom_tb.ma': vm.getReactively('pageOptions.filters.filterNhomId')
                    });
                },
                numOfCauHois: () => {
                  return Counts.get('numberOfCauHois');
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************
            

            // ***************************************************
            // WATCHERS
            // ***************************************************
            
            // Trường hợp flag pageOptions.isExpandedView được bật từ menu -> grid expand detail view
            $scope.$watch('vm.pageOptions.isExpandedView', (newVal, oldVal) => {
                if (newVal) {                    
                    vm.pageOptions.gridRef.expandRow(vm.pageOptions.gridRef.tbody.find("tr.k-master-row"));
                } else if (oldVal) {
                    vm.pageOptions.gridRef.collapseRow(vm.pageOptions.gridRef.tbody.find("tr.k-master-row"));
                }
            });

            $scope.$watch('vm.pageOptions.data.kWindow.isActive', (newVal, oldVal) => {
                let dialog = $("#cauhois_window").data("kendoWindow");
                if (newVal) {                    
                    dialog.open();
                } else if (oldVal) {
                    dialog.close();
                }
            });
        }
    }
});
