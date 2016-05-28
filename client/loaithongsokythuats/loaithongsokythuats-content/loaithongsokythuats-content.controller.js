angular.module('angular-skynet').controller('LoaiThongSoKyThuatsContentCtrl', function($scope, $rootScope) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $rootScope.page_full_height = false;
    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        source: () => {
            return LoaiThongSoKyThuats.findOne({
                _id: $rootScope.$stateParams.loaithongsokythuatId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfLoaiThongSoKyThuats');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfLoaiThongSoKyThuatsTotal');
        }
    });


});
