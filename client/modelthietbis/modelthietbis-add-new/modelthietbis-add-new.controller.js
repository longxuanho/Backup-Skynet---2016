angular.module('angular-skynet').controller('ModelThietBisAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewModelThietBiParams($scope);

    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        hangsanxuats: () => {
            return HangSanXuats.find({}, {
                sort: {
                    'ten': 1
                }
            });
        },
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });


    // ***************************************************
    // METHODS
    // ***************************************************            

    $scope.addNewModelThietBi = () => {
        let err = $scope._helpers.validateUser('can_upsert_model_thiet_bi');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateModelThietBiForm($scope.newModelThietBi);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewModelThietBi($scope.newModelThietBi);
                ModelThietBis.insert($scope.newModelThietBi, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới model thiết bị này. ' + error.message + '.');
                        
                    } else {
                        $scope._helpers.initNewModelThietBiParams($scope);
                        iNotifier.success('Model thiết bị được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewModelThietBiForm = () => {
        $scope._helpers.initNewModelThietBiParams($scope);
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
