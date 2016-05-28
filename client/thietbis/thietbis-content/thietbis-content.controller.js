angular.module('angular-skynet').controller('ThietBisContentCtrl', function($scope, $rootScope) {

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
            return ThietBis.findOne({
                _id: $rootScope.$stateParams.thietbiId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfThietBis');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfThietBisTotal');
        },
        thietbisCount: () => {
            return ThietBis.find({
                'thietbi.keyId': $rootScope.$stateParams.thietbiId
            }).count();
        }
    });


});
