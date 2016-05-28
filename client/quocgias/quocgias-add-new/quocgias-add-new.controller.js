angular.module('angular-skynet').controller('QuocGiasAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewQuocGiaParams($scope);

    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });


    // ***************************************************
    // METHODS
    // ***************************************************            

    $scope.addNewQuocGia = () => {
        let err = $scope._helpers.validateUser('can_upsert_quoc_gia');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateQuocGiaForm($scope.newQuocGia);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewQuocGia($scope.newQuocGia);
                QuocGias.insert($scope.newQuocGia, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới quốc gia này. ' + error.message + '.');
                    } else {
                        $scope._helpers.initNewQuocGiaParams($scope);
                        iNotifier.success('Quốc gia được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewQuocGiaForm = () => {
        $scope._helpers.initNewQuocGiaParams($scope);
    };


    // ***************************************************
    // UTILS
    // ***************************************************

    $scope.utils = {
        accentColor: _.findWhere($scope._data.general.themes, {
            name: $rootScope.main_theme
        }).color_accent
    };


    // ***************************************************
    // WATCHERS
    // ***************************************************

    $rootScope.$watch('main_theme', (newVal) => {
        $scope.utils.accentColor = _.findWhere($scope._data.general.themes, {
            name: newVal
        }).color_accent;
    });

});
