angular.module('angular-skynet').controller('ModelThietBisContentCtrl', function($scope, $rootScope) {

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
            return ModelThietBis.findOne({
                _id: $rootScope.$stateParams.modelthietbiId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfModelThietBis');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfModelThietBisTotal');
        },
        thietbisCount: () => {
            return ThietBis.find({
                'ho_so_tb.thong_tin_chung.model_tb.keyId': $rootScope.$stateParams.modelthietbiId
            }).count();
        }
    });


});
