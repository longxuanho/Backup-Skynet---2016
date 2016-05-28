angular.module('angular-skynet').controller('PhanLoaisListCtrl', function($scope, $rootScope, $meteor, Skynet) {

    // Init Params
    $scope.page_display = Skynet.settings.phanloais.page_display;
    $scope.page_ui_nhoms = Skynet.settings.phanloais.nhoms.ui;
    $scope.page_ui_chungloais = Skynet.settings.phanloais.chungloais.ui;
    $scope.page_ui_loais = Skynet.settings.phanloais.loais.ui;

    // $scope.page_ui_loais = Skynet.settings.phanloais.loais.ui;

    // Subcribe, search, sort, count and pagination
    $meteor.autorun($scope, function() {
        $meteor.subscribe('nhoms', {
            limit: parseInt($scope.getReactively('page_ui_nhoms.perPage')),
            skip: parseInt(($scope.getReactively('page_ui_nhoms.page') - 1) * $scope.getReactively('page_ui_nhoms.perPage')),
            sort: $scope.getReactively('page_ui_nhoms.sort')
        }, $scope.getReactively('page_ui_nhoms.search'), $scope.getReactively('page_ui_nhoms.searchBy')).then(function() {
            $scope.nhomsCount = $meteor.object(Counts, 'numberOfNhoms', false);
            $scope.nhomsTotalCount = $meteor.object(Counts, 'numberOfNhomsTotal', false);
        });

        $scope.nhoms = $meteor.collection(function() {
            return Nhoms.find({}, {
                sort: $scope.getReactively('page_ui_nhoms.sort')
            });
        });
    });

    $meteor.autorun($scope, function() {
        $meteor.subscribe('chungloais', {
            limit: parseInt($scope.getReactively('page_ui_chungloais.perPage')),
            skip: parseInt(($scope.getReactively('page_ui_chungloais.page') - 1) * $scope.getReactively('page_ui_chungloais.perPage')),
            sort: $scope.getReactively('page_ui_chungloais.sort')
        }, $scope.getReactively('page_ui_chungloais.search'), $scope.getReactively('page_ui_chungloais.searchBy')).then(function() {
            $scope.chungloaisCount = $meteor.object(Counts, 'numberOfChungLoais', false);
            $scope.chungloaisTotalCount = $meteor.object(Counts, 'numberOfChungLoaisTotal', false);
        });

        $scope.chungloais = $meteor.collection(function() {
            return ChungLoais.find({}, {
                sort: $scope.getReactively('page_ui_chungloais.sort')
            });
        });
    });

    $meteor.autorun($scope, function() {
        $meteor.subscribe('loais', {
            limit: parseInt($scope.getReactively('page_ui_loais.perPage')),
            skip: parseInt(($scope.getReactively('page_ui_loais.page') - 1) * $scope.getReactively('page_ui_loais.perPage')),
            sort: $scope.getReactively('page_ui_loais.sort')
        }, $scope.getReactively('page_ui_loais.search'), $scope.getReactively('page_ui_loais.searchBy')).then(function() {
            $scope.loaisCount = $meteor.object(Counts, 'numberOfLoais', false);
            $scope.loaisTotalCount = $meteor.object(Counts, 'numberOfLoaisTotal', false);
        });

        $scope.loais = $meteor.collection(function() {
            return Loais.find({}, {
                sort: $scope.getReactively('page_ui_loais.sort')
            });
        });
    });



    // Utils
    $scope.setPageDisplay = function(value) {
        if (_.isString(value) & _.contains(['nhoms', 'chungloais', 'loais'], value))
            $scope.page_display = value;
        else
            $scope.page_display = 'nhoms';
    }

});
