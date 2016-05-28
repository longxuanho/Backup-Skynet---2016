angular.module('angular-skynet').controller('DiaBansAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewDiaBanParams($scope);

    $rootScope.headerDoubleHeightActive = true;

    $scope.kOptions = {
        mien: [{
            text: 'Bắc',
            value: 'Bắc'
        }, {
            text: 'Trung',
            value: 'Trung'
        }, {
            text: 'Nam',
            value: 'Nam'
        }]
    }


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

    $scope.addNewDiaBan = () => {
        let err = $scope._helpers.validateUser('can_upsert_dia_ban');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateDiaBanForm($scope.newDiaBan);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewDiaBan($scope.newDiaBan);
                DiaBans.insert($scope.newDiaBan, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới địa bàn hoạt động này. ' + error.message + '.');
                    } else {
                        $scope._helpers.initNewDiaBanParams($scope);
                        iNotifier.success('Địa bàn hoạt động được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewDiaBanForm = () => {
        $scope._helpers.initNewDiaBanParams($scope);
    };


    // ***************************************************
    // UTILS
    // ***************************************************

    $scope.utils = {
        accentColor: _.findWhere($scope._data.general.themes, {
            name: $rootScope.main_theme
        }).color_accent,
        resetDiaPhuongForm: () => {
            $scope.newDiaBan.dia_phuong = {}
        },
        resetTinhThanhForm: () => {
            $scope.newDiaBan.tinh_thanh = {}
        },
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
