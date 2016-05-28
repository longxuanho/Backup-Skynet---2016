angular.module('angular-skynet').controller('NhomsAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewNhomParams($scope);

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

    $scope.addNewNhom = () => {
        let err = $scope._helpers.validateUser('can_upsert_nhom');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateNhomForm($scope.newNhom);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewNhom($scope.newNhom);
                Nhoms.insert($scope.newNhom, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới nhóm thiết bị này. ' + error.message + '.');
                    } else {
                        $scope._helpers.initNewNhomParams($scope);
                        iNotifier.success('Nhóm thiết bị được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewNhomForm = () => {
        $scope._helpers.initNewNhomParams($scope);
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
