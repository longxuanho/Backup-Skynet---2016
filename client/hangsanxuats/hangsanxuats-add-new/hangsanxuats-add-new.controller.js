angular.module('angular-skynet').controller('HangSanXuatsAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewHangSanXuatParams($scope);

    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        quocgias: () => {
            return QuocGias.find({}, {
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

    $scope.addNewHangSanXuat = () => {
        let err = $scope._helpers.validateUser('can_upsert_hang_san_xuat');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateHangSanXuatForm($scope.newHangSanXuat);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewHangSanXuat($scope.newHangSanXuat);
                HangSanXuats.insert($scope.newHangSanXuat, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới hãng sản xuất này. ' + error.message + '.');
                        
                    } else {
                        $scope._helpers.initNewHangSanXuatParams($scope);
                        iNotifier.success('Hãng sản xuất được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewHangSanXuatForm = () => {
        $scope._helpers.initNewHangSanXuatParams($scope);
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
