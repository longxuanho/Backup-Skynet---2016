angular.module('angular-skynet').controller('QuocGiasContentCtrl', function($scope, $rootScope) {

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
            return QuocGias.findOne({
                _id: $rootScope.$stateParams.quocgiaId // only update when state change success!
            });
        },
        sourceCount: () => {
            return Counts.get('numberOfQuocGias');
        },
        sourceTotalCount: () => {
            return Counts.get('numberOfQuocGiasTotal');
        },
        hangsanxuats: () => {
            return HangSanXuats.find({
                'quoc_gia.keyId': $rootScope.$stateParams.quocgiaId
            }, {
                sort: {
                    'ten': 1
                }
            }).fetch();
        }
    });


});
