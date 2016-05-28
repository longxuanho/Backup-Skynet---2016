angular.module('angular-skynet').controller('DiaBansDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;
    $scope._data = skynetHelpers.data;

    $rootScope.page_full_height = false;
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

    // // ***************************************************
    // // REACTIVE HELPERS
    // // ***************************************************

    $scope.helpers({
        source: () => {
            $scope.master = DiaBans.findOne({
                _id: $rootScope.$stateParams.diabanId
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

        let err = $scope._helpers.validateUser('can_upsert_dia_ban');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateDiaBanForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildDiaBan($scope.source);
                DiaBans.update({
                    _id: $rootScope.$stateParams.diabanId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        ma: $scope.source.ma,
                        'map_data.location': $scope.source.map_data.location,
                        'map_data.subdepartment': $scope.source.map_data.subdepartment,
                        'map_data.department': $scope.source.map_data.department,
                        mien: $scope.source.mien,
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
                        iNotifier.error('Không thể cập nhật địa bàn hoạt động này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Địa bàn hoạt động "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = DiaBans.findOne({
                            _id: $rootScope.$stateParams.diabanId
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
