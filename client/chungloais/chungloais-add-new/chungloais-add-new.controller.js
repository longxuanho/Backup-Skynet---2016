angular.module('angular-skynet').controller('ChungLoaisAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewChungLoaiParams($scope);

    $rootScope.headerDoubleHeightActive = true;


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        nhoms: () => {
            return Nhoms.find({}, {
                sort: {
                    'order': 1
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

    $scope.addNewChungLoai = () => {
        let err = $scope._helpers.validateUser('can_upsert_chung_loai');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateChungLoaiForm($scope.newChungLoai);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewChungLoai($scope.newChungLoai);
                ChungLoais.insert($scope.newChungLoai, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới chủng loại thiết bị này. ' + error.message + '.');
                        
                    } else {
                        $scope._helpers.initNewChungLoaiParams($scope);
                        iNotifier.success('Chủng loại thiết bị được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewChungLoaiForm = () => {
        $scope._helpers.initNewChungLoaiParams($scope);
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
