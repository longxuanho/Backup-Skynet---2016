angular.module('angular-skynet').controller('ChungLoaisContentCtrl', function($scope, $rootScope) {

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
            return ChungLoais.findOne({
                _id: $rootScope.$stateParams.chungloaiId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfChungLoais');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfChungLoaisTotal');
        },
        loais: () => {
            return Loais.find({
                'chung_loai.keyId': $rootScope.$stateParams.chungloaiId
            }, {
                sort: {
                    'order': 1
                }
            }).fetch();
        }
    });


});
