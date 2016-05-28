angular.module('angular-skynet').directive('suachuasList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/suachuas/suachuas-list/suachuas-list.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, skynetKendoGrid, $reactive, $timeout, skynetDictionary, skynetLiveOptions) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            vm._data = skynetHelpers.data;
            vm._helpers = skynetHelpers.helpers;
            
            vm._kData = skynetKendoGrid.suachuas.data;
            vm._kHelpers = skynetKendoGrid.suachuas.helpers;

            vm.dictionary = angular.copy(skynetDictionary.data.suachuas);

            vm.pageOptions = {
                gridRef: {},
                // Cờ này dùng để fix bug mất select sau khi render lại grid
                isSelectFromController: false,
                localData: {
                    suachuas_config_data_filter: {}
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
                fabState: _.isEmpty(vm._helpers.validateUser('can_upsert_sua_chua')) ? 'suachuas_createNew' : '',
                selected: {},
                localConfigDataName: 'suachuas_config_data_local',
                cloudConfigDataName: 'suachuas_grid_config_data_skynet'
                ///////
            };          

            vm.pageReactiveData = {
                suachuas: [],
                // tags: {
                //     data: vm.dictionary.tags,
                //     sort: { field: 'ten', dir: 'asc' },
                //     group: { field: 'group' }

                // },
                searchTags: [],
                searchLoaitbs: [],
                searchBacthis: []
            };

            // LOAD LOCAL DATA
            try {
                let localData = JSON.parse(localStorage.getItem(vm.pageOptions.localConfigDataName));
                if (!_.isEmpty(localData)) {
                    console.log('data preload from cache: ', localData)
            
                    vm.pageOptions.localData = angular.copy(localData);

                    vm.pageOptions.isDisplayTopBar = _.has(localData, 'isDisplayTopBar') ? localData.isDisplayTopBar : true;
                    vm.pageOptions.topBarHeight = (localData.topBarHeight) ? localData.topBarHeight : 'x1';
                    vm.pageOptions.isDisplayFullWidthGrid = _.has(localData, 'isDisplayFullWidthGrid') ? localData.isDisplayFullWidthGrid : true;
                    vm.pageOptions.filters.filterNhomId = (localData.filters.filterNhomId) ? localData.filters.filterNhomId : '';
                    vm.pageOptions.filters.nhomsFilterActiveIds = (localData.filters.nhomsFilterActiveIds) ? angular.copy(localData.filters.nhomsFilterActiveIds) : [];
                }        
            }
            catch(err) {
                iNotifier.error('Có lỗi xảy ra với cấu hình dữ liệu mà bạn đã lưu trên thiết bị này. Vui lòng reset theo các bước sau: Từ Menu > Dữ liệu > Giới hạn dữ liệu > Reset.');
            }

            console.log('data load from cache: ', vm.pageOptions)


            kendo.pdf.defineFont({
                "Roboto": "/assets/fonts/DejaVuSans.ttf",
                "Roboto|Bold": "/assets/fonts/DejaVuSans-Bold.ttf",
                "Roboto|Bold|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf",
                "Roboto|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf"
            });


            vm.gridData = {
                kGrid: {
                    // kOptions: angular.copy(vm._kHelpers.initDefaultOptions()),
                    kOptions: skynetLiveOptions.suachuas.kendo.options.grids.suachuas_list,
                    kEvents: {}
                }
            }

            console.log('vm.gridData.kGrid: ', vm.gridData.kGrid);

            // Quản lý các sự kiện events với kOptions
            // Khi người dùng click chọn một item, nếu item chưa được chọn -> chọn, nếu item đã được chọn trước đó -> bỏ chọn.
            vm.gridData.kGrid.kEvents.onChange = function(event, data) {
                if (!_.isEmpty(data)) {
                    if (vm.gridData.kGrid.kOptions.selectable === 'row') {                        
                        vm.pageOptions.fabState = 'suachuas_viewDetails';
                        vm.pageOptions.selected = angular.copy(data);
                    }
                }
            };

            // Security: Chỉ cho phép tạo câu hỏi mới nếu người dùng có đủ thẩm quyền.
            vm.gridData.kGrid.kEvents.onDataBound = function(event) {
                // Fix lỗi khi chuyển từ dashboard sang suachuas-list thì bị mất tham chiếu
                if (_.isEmpty(vm.pageOptions.gridRef))
                    vm.pageOptions.gridRef = $("#myGrid").data("kendoGrid");
                vm.pageOptions.fabState = _.isEmpty(vm._helpers.validateUser('can_upsert_sua_chua')) ? 'suachuas_createNew' : '';

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
                // Kiểm tra tính hợp lệ của truy vấn ngày bắt đầu và ngày kết thúc
                resolveDateRange: function(fromDate, toDate) {
                    if (fromDate && toDate && (fromDate <= toDate))
                        return true;
                    // Reset dữ liệu grid
                    vm.utils.resetGridData();
                    return false;
                },
                // Build query data cho suachuas helper
                resolveDBQuery: function(selector) {
                    let query = {
                        'thong_ke.thoi_gian.bat_dau.ngay': {
                            $gte: vm.criteria.dateRage.from,
                            $lte: vm.criteria.dateRage.to
                        }
                    }
                    if (!!selector) 
                        query['trang_thai'] = selector;
                    return query;
                },
                resetGridData: function() {
                    try {
                        vm.gridData.kGrid.kOptions.dataSource.data([]);  
                    } catch (err) {
                        console.log('Catched Error: ', err)
                    }
                },
                openModal: function(modal_selector) {
                    let modal = UIkit.modal(modal_selector);
                    if (!modal.isActive()) {
                        modal.show();
                    }
                },
                setFilterByNhomId: function(id) {
                    // Nếu người dùng click vào đúng filter item đã chọn -> bỏ chọn, ngược lại, set filter item
                    vm.pageOptions.filters.filterNhomId = (vm.pageOptions.filters.filterNhomId === id) ? '' : id;
                },
                buildNhomsFilterSource: function() {
                    vm.pageOptions.filters.nhomsFilterSource = angular.copy(vm.dictionary.trang_thais);
                    vm.pageOptions.filters.nhomsFilterSource.unshift({ma: '', ten: "Tất cả"});

                    // Hiển thị tất cả các item trên Top Bar
                    _.each(vm.pageOptions.filters.nhomsFilterSource, (item) => {
                        item.isActive = true
                    })

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

            $scope.subscribe('suachuas-all', () => {
                return [{},
                    $rootScope.getReactively('searchText')
                ]
            });

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
                suachuas: () => {
                    // Nếu khoảng thời gian ngày bắt đầu và kết thúc là hợp lệ
                    if (vm.utils.resolveDateRange(
                        vm.getReactively('criteria.dateRage.from'),
                        vm.getReactively('criteria.dateRage.to')
                    )) {
                        let query = vm.utils.resolveDBQuery(vm.getReactively('pageOptions.filters.filterNhomId'));
                        let data = SuaChuas.find(query).fetch();
                        if (data.length)
                            vm.gridData.kGrid.kOptions.dataSource.data(data);
                        else
                            vm.utils.resetGridData();
                    }
                    return;
                },
                numOfSuaChuas: () => {
                  return Counts.get('numberOfSuaChuas');
                }
            });


            // ***************************************************
            // METHODS
            // ***************************************************
            

            // ***************************************************
            // WATCHERS
            // ***************************************************
            // Tùy biến màu sắc callendar khi theme thay đổi
            $rootScope.$watch('main_theme', (newVal, oldVal) => {
                console.log('theme: ', newVal);

                $timeout(() => {
                    $('.k-calendar-container').removeClass(oldVal).addClass(newVal);
                }, 2000);

                // Đổi màu k window khi màu theme thay đổi
                // let header = $('div.k-window-titlebar.k-header');
                // header.removeClass('color-background-' + oldVal);
                // header.addClass('color-background-' + newVal);
            });
            // Trường hợp flag pageOptions.isExpandedView được bật từ menu -> grid expand detail view
            $scope.$watch('vm.pageOptions.isExpandedView', (newVal, oldVal) => {
                let row = vm.pageOptions.gridRef.tbody.find(">tr.k-grouping-row").eq(0);
                if (newVal) { 
                    vm.pageOptions.gridRef.expandGroup(row);
                } else if (oldVal) {
                    vm.pageOptions.gridRef.collapseGroup(row);
                }
            });
        }
    }
});
