angular.module('angular-skynet').controller('LoaiThongSoKyThuatsAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewLoaiThongSoKyThuatParams($scope);

    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        chungloais: () => {
            return ChungLoais.find({}, {
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

    $scope.addNewLoaiThongSoKyThuat = () => {
        let err = $scope._helpers.validateUser('can_upsert_loai_thong_so_ky_thuat');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateLoaiThongSoKyThuatForm($scope.newLoaiThongSoKyThuat);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewLoaiThongSoKyThuat($scope.newLoaiThongSoKyThuat);
                LoaiThongSoKyThuats.insert($scope.newLoaiThongSoKyThuat, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới thông số kỹ thuật này. ' + error.message + '.');
                        
                    } else {
                        $scope._helpers.initNewLoaiThongSoKyThuatParams($scope);
                        iNotifier.success('Thông số kỹ thuật được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewLoaiThongSoKyThuatForm = () => {
        $scope._helpers.initNewLoaiThongSoKyThuatParams($scope);
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
