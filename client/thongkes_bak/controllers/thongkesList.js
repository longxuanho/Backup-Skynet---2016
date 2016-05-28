angular.module('angular-skynet').controller('ThongKesListCtrl', function($scope, $rootScope, $meteor, Skynet, uiGridConstants, i18nService) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope._uiGrids = Skynet.settings.thongkes.ui.list.general.uiGrids;
    i18nService.setCurrentLang('vi');
    $scope.isOnEditStateInlineMask = [];


    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {
        highlightFilteredHeader: function(row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        },
        resetNewState: function() {
            $scope.newStateName = '';
            $scope.newStateDesc = '';
        },
        initEditStateInlineMask: function() {
            $scope.isOnEditStateInlineMask = _.range($scope.userSettings.data.ui_grids.states.length).map(function() {
                return false;
            });
        },
        toggleEditStateInlineMask: function(index) {
            $scope.isOnEditStateInlineMask[index] = !$scope.isOnEditStateInlineMask[index];
        }
    };

    // ***************************************************
    // SUBSCRIBE
    // ***************************************************
    $scope.$meteorSubscribe('thietbis');
    $scope.thietbis = $meteor.collection(function() {
        return ThietBis.find({}, {
            sort: {
                'ma_tb.ma_tb': 1
            }
        });
    });

    if (Meteor.userId()) {
        $scope.$meteorSubscribe('usersettings_single', Meteor.userId()).then(function() {
            if (UserSettings.find().count() === 0)
                $scope._helpers.initUserSettings(Meteor.userId());

            $scope.rawUserSettings = UserSettings.findOne({
                userId: Meteor.userId()
            });
            if ($scope.rawUserSettings)
                $scope.userSettings = $scope.$meteorObject(UserSettings, $scope.rawUserSettings._id, false);

            $scope.utils.initEditStateInlineMask();
        });
    }




    // ***************************************************
    // METHODS
    // ***************************************************






    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope._uiGrids.setAllColumnsProp('headerCellClass', $scope.utils.highlightFilteredHeader);
    $scope._uiGrids.setAllColumnsProp('enablePinning', true);
    $scope._uiGrids.setAllColumnsProp('groupingShowAggregationMenu', false);

    $scope.gridOptions = {
        
        // Filter
        enableFiltering: true,
        
        // Sort
        enableSorting: true,
        
        // Footer
        showGridFooter: true,
        
        // Menu
        enableGridMenu: true,
        
        // Columns
        columnDefs: $scope._uiGrids.columns,
        
        // Export
        exporterCsvFilename: 'from_Skynet_with_Love.csv',
        exporterOlderExcelCompatibility: true,
        
        // Save
        saveFocus: false,
        saveFilter: true,
        saveGrouping: true,
        saveOrder: true,
        savePinning: true,
        saveScroll: true,
        saveGroupingExpandedStates: true,
        saveSort: true,
        saveTreeView: true,
        saveVisible: true,
        saveWidths: true,
        
        // Select
        enableRowSelection: true,
        enableSelectAll: true,
        // selectionRowHeaderWidth: 35,
        // rowHeight: 35,

        // Group
        enableGroupHeaderSelection: false,
        enableGrouping: true,
        groupingNullLabel: true,

        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    $scope.gridOptions.data = $scope.thietbis;

    $scope.helpers = {
        toggleFiltering: function() {
            $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
        },
        updateInlineState: function(index) {
            var err = this.validateEditInlineStateForm(index);
            if (_.isEmpty(err)) {
                this.saveState();
                $scope.utils.toggleEditStateInlineMask(index);
            } else {
                $scope.userSettings.reset();
                toastr.error(err.message);
            }
        },
        createNewState: function() {

            var err = this.validateNewStateForm();

            if (_.isEmpty(err)) {
                $scope.userSettings.data.ui_grids.states.push({
                    ten: $scope.newStateName,
                    mo_ta: $scope.newStateDesc,
                    gia_tri: $scope.gridApi.saveState.save()
                });

                this.saveState();

                // For UI...
                $scope.utils.resetNewState();
                $scope.utils.initEditStateInlineMask();

            } else {
                toastr.error(err.message);
            }

        },
        saveState: function() {
            $scope.userSettings.data.ui_grids.states = _.sortBy($scope.userSettings.data.ui_grids.states, function(item) {
                return item.ten
            });
            $scope.userSettings.save().then(function(numberOfDocs) {
                toastr.success('Thiết lập mới được lưu trữ thành công.')
                console.log('lưu trữ thành công ', numberOfDocs);
            }, function(error) {
                toastr.error('Không thể cập nhật thiết lập này. ' + error.message + '.');
                console.log('có lỗi xảy ra trong quá trình lưu dữ liệu', error);
            });
        },
        validateEditInlineStateForm: function($index) {
            var error = {};
            if (!$scope.userSettings.data.ui_grids.states[$index].ten)
                error.message = "Tên của thiết lập này là bắt buộc.";
            var tmp = _.pluck($scope.userSettings.data.ui_grids.states, 'ten');
            if (_.uniq(tmp).length !== tmp.length)
                error.message = "Tên thiết lập này đã tồn tại trong hệ thống."
            return error;
        },
        validateNewStateForm: function() {
            var error = {};
            if (!$scope.newStateName)
                error.message = "Bạn cần chỉ định tên cho thiết lập trước khi lưu";
            var tmp = _.pluck($scope.userSettings.data.ui_grids.states, 'ten');
            if (_.contains(tmp, $scope.newStateName))
                error.message = "Tên thiết lập này đã tồn tại trong hệ thống."
            return error;
        },
        restoreDefaultState: function() {
            $scope.gridApi.saveState.restore($scope, $scope._uiGrids.defaultState);
        },
        loadState: function(item) {
            $scope.gridApi.saveState.restore($scope, item);
        },
        removeState: function(item) {
            $scope.userSettings.data.ui_grids.states.splice($scope.userSettings.data.ui_grids.states.indexOf(item), 1);
            $scope.userSettings.save();
            toastr.warning('Bạn đã xóa thiết lập "' + item.ten + '" khỏi hệ thống.');
        }
    };

    // ***************************************************
    // WATCHERS
    // ***************************************************

});
