angular.module('angular-skynet').controller('DonVisDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;
    $scope._data = skynetHelpers.data;

    $rootScope.page_full_height = false;
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



    // // ***************************************************
    // // REACTIVE HELPERS
    // // ***************************************************

    $scope.helpers({
        source: () => {
            $scope.master = DonVis.findOne({
                _id: $rootScope.$stateParams.donviId
            });
            return angular.copy($scope.master);
        },
        users: () => {
            return Meteor.users.find({});
        },
        isLoggedIn: () => {
            return Meteor.userId() !== null;
        },
        currentUserId: () => {
            return Meteor.userId();
        }
    });

    // // ***************************************************
    // // METHODS
    // // ***************************************************

    $scope.save = () => {

        let err = $scope._helpers.validateUser('can_upsert_don_vi');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateDonViForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildDonVi($scope.source);
                DonVis.update({
                    _id: $rootScope.$stateParams.donviId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        phan_loai: $scope.source.phan_loai,
                        ma: $scope.source.ma,
                        ten_viet_tat: $scope.source.ten_viet_tat,
                        ten_quoc_te: $scope.source.ten_quoc_te,
                        mo_ta: $scope.source.mo_ta,
                        ghi_chu: $scope.source.ghi_chu,
                        icon: $scope.source.icon,
                        isPublic: $scope.source.isPublic,
                        isArchived: $scope.source.isArchived,
                        'metadata.ngay_cap_nhat_cuoi': $scope.source.metadata.ngay_cap_nhat_cuoi,
                        'metadata.nguoi_cap_nhat_cuoi': $scope.source.metadata.nguoi_cap_nhat_cuoi,
                        'metadata.nguoi_cap_nhat_cuoi_field': $scope.source.metadata.nguoi_cap_nhat_cuoi_field,
                        'metadata.search_field': $scope.source.metadata.search_field
                    }
                }, (error) => {
                    if (error) {
                        iNotifier.error('Không thể cập nhật đơn vị này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Đơn vị "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = DonVis.findOne({
                            _id: $rootScope.$stateParams.donviId
                        });
                    }
                });

            } else {
                iNotifier.error(err.message);
            }
        } else {
            iNotifier.error(err.message);
        }
    };

    $scope.reset = () => {
        angular.copy($scope.master, $scope.source);
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
