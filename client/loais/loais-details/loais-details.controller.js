angular.module('angular-skynet').controller('LoaisDetailsCtrl', function($scope, skynetHelpers, $rootScope, iNotifier) {



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
            $scope.master = Loais.findOne({
                _id: $rootScope.$stateParams.loaiId
            });
            return angular.copy($scope.master);
        },
        nhoms: () => {
            return Nhoms.find({}, {
                sort: {
                    'order': 1
                }
            }).fetch();
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

        let err = $scope._helpers.validateUser('can_upsert_loai');
        if (_.isEmpty(err)) {
            err = $scope._helpers.validateLoaiForm($scope.source);
            if (_.isEmpty(err)) {

                $scope._helpers.buildLoai($scope.source);
                Loais.update({
                    _id: $rootScope.$stateParams.loaiId
                }, {
                    $set: {
                        ten: $scope.source.ten,
                        nhom: $scope.source.nhom,
                        chung_loai: $scope.source.chung_loai,
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
                        iNotifier.error('Không thể cập nhật loại thiết bị này. ' + error.message + '.');
                    } else {
                        iNotifier.success('Loại thiết bị "' + $scope.source.ten + '" được cập nhật thành công.');

                        $scope.master = Loais.findOne({
                            _id: $rootScope.$stateParams.loaiId
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

    $scope.$watch('source.nhom.keyId', (newVal) => {
        $scope.nhomSelectedId = newVal;
        
        if (newVal === $scope.master.nhom.keyId)
            $scope.source.chung_loai.keyId = $scope.master.chung_loai.keyId;
        else    
            $scope.source.chung_loai.keyId = '';
    });

});
