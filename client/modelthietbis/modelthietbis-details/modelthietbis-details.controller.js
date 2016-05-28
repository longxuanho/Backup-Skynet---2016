angular.module('angular-skynet').controller('ModelThietBisDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



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
            $scope.master = ModelThietBis.findOne({
                _id: $rootScope.$stateParams.modelthietbiId
            });
            return angular.copy($scope.master);
        },
        hangsanxuats: () => {
            return HangSanXuats.find({}, {
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

        let err = $scope._helpers.validateUser('can_upsert_model_thiet_bi');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateModelThietBiForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildModelThietBi($scope.source);
                ModelThietBis.update({
                    _id: $rootScope.$stateParams.modelthietbiId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        hang_san_xuat: $scope.source.hang_san_xuat,
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
                        iNotifier.error('Không thể cập nhật model thiết bị này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Model thiết bị "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = ModelThietBis.findOne({
                            _id: $rootScope.$stateParams.modelthietbiId
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
