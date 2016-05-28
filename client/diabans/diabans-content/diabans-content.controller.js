angular.module('angular-skynet').controller('DiaBansContentCtrl', function($scope, $rootScope) {

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
            return DiaBans.findOne({
                _id: $rootScope.$stateParams.diabanId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfDiaBans');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfDiaBansTotal');
        },
        thietbis: () => {
            return ThietBis.find({
                'dia_ban_hoat_dong.keyId': $rootScope.$stateParams.diabanId
            }, {
                sort: {
                    'ten': 1
                }
            }).fetch();
        }
    });


});
