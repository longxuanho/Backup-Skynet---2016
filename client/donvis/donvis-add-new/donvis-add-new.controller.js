angular.module('angular-skynet').controller('DonVisAddNewCtrl', function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier) {


    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;

    $scope._helpers.initNewDonViParams($scope);

    $rootScope.headerDoubleHeightActive = true;

    $scope.kOptions = {
        phanloais: [{
            text: 'Tổng Công ty',
            value: 'tct'
        }, {
            text: 'Cty thành viên',
            value: 'cty_thanh_vien'
        }, {
            text: 'Cty vệ tinh',
            value: 'cty_ve_tinh'
        }, {
            text: 'Khác',
            value: 'khac'
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

    $scope.addNewDonVi = () => {
        let err = $scope._helpers.validateUser('can_upsert_don_vi');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateDonViForm($scope.newDonVi);
            if (_.isEmpty(err)) {

                $scope._helpers.buildNewDonVi($scope.newDonVi);
                DonVis.insert($scope.newDonVi, (error, result) => {
                    if (error) {
                        iNotifier.error('Không thể tạo mới đơn vị này. ' + error.message + '.');
                    } else {
                        $scope._helpers.initNewDonViParams($scope);
                        iNotifier.success('Đơn vị được tạo mới thành công.');
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.clearNewDonViForm = () => {
        $scope._helpers.initNewDonViParams($scope);
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
