angular.module('angular-skynet').controller('LoaisContentCtrl', function($scope, $rootScope) {

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
            return Loais.findOne({
                _id: $rootScope.$stateParams.loaiId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfLoais');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfLoaisTotal');
        },
        thietbisCount: () => {
            return ThietBis.find({
                'loai.keyId': $rootScope.$stateParams.loaiId
            }).count();
        }
    });


});
