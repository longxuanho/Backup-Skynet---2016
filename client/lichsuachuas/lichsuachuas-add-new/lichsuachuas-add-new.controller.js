angular.module('angular-skynet').controller('LichSuaChuasAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewLichSuaChuaParams($scope);

    $rootScope.headerDoubleHeightActive = true;

    $scope.kOptions = {
        loaisuachuas: [{
            text: 'Sửa chữa cụm',
            value: 'sua_chua_cum'
        }, {
            text: 'Sửa chữa lớn',
            value: 'sua_chua_lon'
        }, {
            text: 'Sửa chữa nhỏ',
            value: 'sua_chua_nho'
        }],
        trangthais: [{
            text: 'Kế hoạch',
            value: 'ke_hoach'
        }, {
            text: 'Đang tiến hành',
            value: 'dang_tien_hanh'
        }, {
            text: 'Hoàn thành',
            value: 'hoan_thanh'
        }, {
            text: 'Tạm dừng',
            value: 'tam_dung'
        }],
    }


    // ***************************************************
    // REACTIVE HELPERS
    // ***************************************************

    $scope.helpers({
        nhoms: () => {
            return Nhoms.find({}, {
                sort: {
                    'ten': 1
                }
            });
        },
        nhomSelectedId: null,
        thietbis: () => {
            return ThietBis.find({
                'nhom.keyId': $scope.nhomSelectedId
            }, {
                sort: {
                    'ten': 1
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

    $scope.addNewLichSuaChua = () => {
        let err = $scope._helpers.validateUser('can_upsert_lich_sua_chua');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateLichSuaChuaForm($scope.newLichSuaChua);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewLichSuaChua($scope.newLichSuaChua);
                LichSuaChuas.insert($scope.newLichSuaChua, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới kế hoạch sửa chữa này. ' + error.message + '.');
                        
                    } else {
                        $scope._helpers.initNewLichSuaChuaParams($scope);
                        iNotifier.success('Kế hoạch sửa chữa được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewLichSuaChuaForm = () => {
        $scope._helpers.initNewLichSuaChuaParams($scope);
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

    $scope.$watch('newLichSuaChua.nhom.keyId', (newVal) => {
        $scope.nhomSelectedId = newVal;

        $scope.newLoai.thiet_bi.keyId = '';
    });

});
