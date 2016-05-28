angular.module('angular-skynet').controller('LoaiThongSoKyThuatsDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



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
            $scope.master = LoaiThongSoKyThuats.findOne({
                _id: $rootScope.$stateParams.loaithongsokythuatId
            });
            return angular.copy($scope.master);
        },
        chungloais: () => {
            return ChungLoais.find({}, {
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

        let err = $scope._helpers.validateUser('can_upsert_loai_thong_so_ky_thuat');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateLoaiThongSoKyThuatForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildLoaiThongSoKyThuat($scope.source);
                LoaiThongSoKyThuats.update({
                    _id: $rootScope.$stateParams.loaithongsokythuatId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        chung_loai: $scope.source.chung_loai,
                        name: $scope.source.name,
                        ma: $scope.source.ma,
                        don_vi: $scope.source.don_vi,
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
                        iNotifier.error('Không thể cập nhật loại thông số kỹ thuật này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Loại thông số "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = LoaiThongSoKyThuats.findOne({
                            _id: $rootScope.$stateParams.loaithongsokythuatId
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
