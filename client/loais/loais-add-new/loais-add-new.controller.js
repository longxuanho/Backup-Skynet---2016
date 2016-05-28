angular.module('angular-skynet').controller('LoaisAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewLoaiParams($scope);

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
        nhomSelectedId: null,
        chungloais: () => {
            return ChungLoais.find({
                'nhom.keyId': $scope.nhomSelectedId
            }, {
                sort: {
                    'order': 1
                }
            }).fetch();
        },
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        }
    });


    // ***************************************************
    // METHODS
    // ***************************************************            

    $scope.addNewLoai = () => {
        let err = $scope._helpers.validateUser('can_upsert_loai');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateLoaiForm($scope.newLoai);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewLoai($scope.newLoai);
                Loais.insert($scope.newLoai, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới loại thiết bị này. ' + error.message + '.');
                    } else {
                        $scope._helpers.initNewLoaiParams($scope);
                        iNotifier.success('Loại thiết bị được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewLoaiForm = () => {
        $scope._helpers.initNewLoaiParams($scope);
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

    $scope.$watch('newLoai.nhom.keyId', (newVal) => {
        $scope.nhomSelectedId = newVal;

        $scope.newLoai.chung_loai.keyId = '';
    });

});
