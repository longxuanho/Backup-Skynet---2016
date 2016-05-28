angular.module('angular-skynet').controller('ChungLoaisDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



    // ***************************************************
    // INITIALIZE
    // ***************************************************

    $scope._helpers = skynetHelpers.helpers;
    $scope._data = skynetHelpers.data;

    $rootScope.page_full_height = false;
    $rootScope.headerDoubleHeightActive = true;



    // // ***************************************************
    // // REACTIVE HELPERS
    // // ***************************************************

    $scope.helpers({
        source: () => {
            $scope.master = ChungLoais.findOne({
                _id: $rootScope.$stateParams.chungloaiId
            });
            return angular.copy($scope.master);
        },
        nhoms: () => {
            return Nhoms.find({}, {
                sort: {
                    'ten': 1
                }
            }).fetch();
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

        let err = $scope._helpers.validateUser('can_upsert_chung_loai');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateChungLoaiForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildChungLoai($scope.source);
                ChungLoais.update({
                    _id: $rootScope.$stateParams.chungloaiId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        nhom: $scope.source.nhom,
                        ma: $scope.source.ma,
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
                        iNotifier.error('Không thể cập nhật chủng loại thiết bị này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Chủng loại thiết bị "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = ChungLoais.findOne({
                            _id: $rootScope.$stateParams.chungloaiId
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
