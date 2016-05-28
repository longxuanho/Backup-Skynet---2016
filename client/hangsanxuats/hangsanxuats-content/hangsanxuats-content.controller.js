angular.module('angular-skynet').controller('HangSanXuatsContentCtrl', function($scope, $rootScope) {

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
            return HangSanXuats.findOne({
                _id: $rootScope.$stateParams.hangsanxuatId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfHangSanXuats');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfHangSanXuatsTotal');
        },
        modelthietbis: () => {
            return ModelThietBis.find({
                'hang_san_xuat.keyId': $rootScope.$stateParams.hangsanxuatId
            }, {
                sort: {
                    'ten': 1
                }
            }).fetch();
        }
    });


});
