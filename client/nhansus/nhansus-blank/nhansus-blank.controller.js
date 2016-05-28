angular.module('angular-skynet').controller('NhanSusBlankCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, skynetKendoGrid) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;
    $scope._helpers.initNewThietBiParams($scope);
    $scope._kData = skynetKendoGrid.thietbis.data;
    $scope._kHelpers = skynetKendoGrid.thietbis.helpers;
    
    $scope.pageOptions = {
        localData: {
            thietbis_config_data_filter: {}
        },
        isDisplayTopBar: true,
        isDisplayFullWidthGrid: false,
        topBarHeight: 'x1',
        filters: {
            filterNhomId: '',            
            nhomsFilterSource: [],
            nhomsFilterActiveIds: [],
        },
    };

    // LOAD LOCAL DATA
    try {
        let localData = JSON.parse(localStorage.getItem('thietbis_config_data_filter'));
        if (!_.isEmpty(localData)) {
            console.log('data preload from cache: ', localData)
    
            $scope.pageOptions.localData = angular.copy(localData);

            $scope.pageOptions.isDisplayTopBar = _.has(localData, 'isDisplayTopBar') ? localData.isDisplayTopBar : true;
            $scope.pageOptions.topBarHeight = (localData.topBarHeight) ? localData.topBarHeight : 'x1';
            $scope.pageOptions.isDisplayFullWidthGrid = _.has(localData, 'isDisplayFullWidthGrid') ? localData.isDisplayFullWidthGrid : true;
            $scope.pageOptions.filters.filterNhomId = (localData.filters.filterNhomId) ? localData.filters.filterNhomId : '';
            $scope.pageOptions.filters.nhomsFilterActiveIds = (localData.filters.nhomsFilterActiveIds) ? angular.copy(localData.filters.nhomsFilterActiveIds) : [];
        }        
    }
    catch(err) {
        iNotifier.error('Có lỗi xảy ra với cấu hình dữ liệu mà bạn đã lưu trên thiết bị này. Vui lòng reset theo các bước sau: Từ Menu > Dữ liệu > Giới hạn dữ liệu > Reset.');
    }

    console.log('data load from cache: ', $scope.pageOptions)


    kendo.pdf.defineFont({
        "Roboto": "/assets/fonts/DejaVuSans.ttf",
        "Roboto|Bold": "/assets/fonts/DejaVuSans-Bold.ttf",
        "Roboto|Bold|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf",
        "Roboto|Italic": "/assets/fonts/DejaVuSans-Oblique.ttf"
    });

    $scope.gridData = {
        thietbisGrid: {
            kData: {
                dataSource: {
                    data: new kendo.data.ObservableObject([]),
                }
            },
            kOptions: angular.copy($scope._kHelpers.initDefaultOptions())
        }
    }

    $scope._kHelpers.initDefaultDataSource($scope.gridData.thietbisGrid.kData.dataSource);


    // ***************************************************
    // UTILS
    // ***************************************************

    $scope.utils = {
        setFilterByNhomId: function(id) {
            $scope.pageOptions.filters.filterNhomId = id;
        },
        buildNhomsFilterSource: function(source, selectedIds) {
            if (source.length) {
                if (selectedIds.length) {
                    _.each(source, (item) => {
                        if (_.contains(selectedIds, item._id)) 
                            item.isActive = true;
                        else {
                            if (!item.isActive)
                                item.isActive = false;
                        }
                    });
                } else {
                    _.each(source, (item) => {
                        item.isActive = true
                    });
                } 
                console.log('buildNhomsFilterSource: ', source);
            }
        },
    }

    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        nhomsSource: () => {
            $scope.pageOptions.filters.nhomsFilterSource = Nhoms.find({}, {sort: {order: 1}}).fetch();
            $scope.pageOptions.filters.nhomsFilterSource.unshift({_id: '', ten: "Tất cả"});
            $scope.utils.buildNhomsFilterSource($scope.pageOptions.filters.nhomsFilterSource, $scope.pageOptions.filters.nhomsFilterActiveIds);

            return Nhoms.find({}, {sort: {order: 1}});
        },
        thietbis: () => {
            $scope.gridData.thietbisGrid.kData.dataSource.data = ($scope.pageOptions.filters.filterNhomId) ? ThietBis.find({
                'phan_loai.nhom.keyId': $scope.pageOptions.filters.filterNhomId
            }).fetch() : ThietBis.find().fetch();
            return ThietBis.find({
                'phan_loai.nhom.keyId': $scope.getReactively('pageOptions.filters.filterNhomId')
            });
        },
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });


});
