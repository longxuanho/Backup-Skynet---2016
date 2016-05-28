angular.module('angular-skynet').controller('NhomsContentCtrl', function($scope, $rootScope) {

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
            return Nhoms.findOne({
                _id: $rootScope.$stateParams.nhomId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfNhoms');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfNhomsTotal');
        },
        chungloais: () => {
            return ChungLoais.find({
                'nhom.keyId': $rootScope.$stateParams.nhomId
            }, {
                sort: {
                    'order': 1
                }
            }).fetch();
        }
    });


});
