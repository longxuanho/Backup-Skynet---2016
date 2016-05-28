angular.module('angular-skynet').controller('QuocGiasDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



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
            $scope.master = QuocGias.findOne({
                _id: $rootScope.$stateParams.quocgiaId
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

        let err = $scope._helpers.validateUser('can_upsert_quoc_gia');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateQuocGiaForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildQuocGia($scope.source);
                QuocGias.update({
                    _id: $rootScope.$stateParams.quocgiaId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        ma: $scope.source.ma,
                        name: $scope.source.name,
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
                        iNotifier.error('Không thể cập nhật quốc gia này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Quốc gia "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = QuocGias.findOne({
                            _id: $rootScope.$stateParams.quocgiaId
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
