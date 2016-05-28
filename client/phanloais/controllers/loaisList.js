angular.module('angular-skynet').controller('LoaisListCtrl', function($scope, $rootScope, $meteor, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope._ui = Skynet.settings.phanloais.loais.ui;
    $scope._utils = Skynet.settings.phanloais.loais.utils;

    $scope._utils.initParams($scope);


    // ***************************************************
    // SUBSCRIBE
    // ***************************************************
    $scope.$meteorSubscribe('nhoms');
    $scope.nhoms = $meteor.collection(function() {
        return Nhoms.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('chungloais');
    $scope.chungloais = $meteor.collection(function() {
        return ChungLoais.find({
            'nhom.keyId': $scope.getReactively('newLoai.nhom.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });


    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.createNewLoai = function(loai) {
        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {
            err = $scope.helpers.validateForm();
            if (_.isEmpty(err)) {

                $scope.helpers.buildNewLoai();           
                Loais.insert(loai, function(error, result) {
                    if (error) {
                        toastr.error('Không thể tạo mới loại thiết bị này. ' + error.message + '.');
                        console.log('Error:', error);
                    } else {
                        $scope._utils.initParams($scope);
                        toastr.success('Loại thiết bị được tạo mới thành công.');
                        console.log('Loại thiết bị:', result);
                    }
                });

            } else {
                toastr.error(err.message);
            } 
        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeLoai = function(loai) {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {
            
            $scope.loais.remove(loai).then(function() {
                toastr.info('Loại thiết bị "' + loai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
            }, function(err) {
                toastr.error(err.message);
                console.error('có lỗi xảy ra: ' + err.message);
            });

        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeLoaiAll = function() {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {

            $scope.loais.remove();
            toastr.info('Tất cả loại thiết bị đã được gỡ bỏ khỏi hệ thống.');

        } else {
            toastr.error(err.message);
        }
    }


    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {
            var error = {};
            if (!$scope.newLoai.nhom) {
                error.message = "Nhóm thiết bị chưa được chọn. Xin hãy thử lại.";
                return error;
            }
            if (!$scope.newLoai.chung_loai) {
                error.message = "Chủng loại thiết bị chưa được chọn. Xin hãy thử lại.";
                return error;
            }
            return error;
        },
        buildNewLoai: function() {
            $scope.newLoai.metadata.nguoi_tao = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.newLoai.metadata.nguoi_tao_profile_name = $rootScope.currentUser.profile.name;
            $scope.newLoai.metadata.nguoi_tao_email = $rootScope.currentUser.emails[0].address;
            $scope.newLoai.metadata.ngay_tao = new Date();

            if (!_.isEmpty($scope.newLoai.nhom)) {
                var item = Nhoms.findOne({
                    _id: $scope.newLoai.nhom.keyId
                });
                if (item) {
                    $scope.newLoai.nhom.ten = item.ten;
                    $scope.newLoai.nhom.ma = item.ma;
                    $scope.newLoai.nhom.icon = item.icon;
                }
            }

            if (!_.isEmpty($scope.newLoai.chung_loai)) {
                var item = ChungLoais.findOne({
                    _id: $scope.newLoai.chung_loai.keyId
                });
                if (item) {
                    $scope.newLoai.chung_loai.ten = item.ten;
                    $scope.newLoai.chung_loai.ma = item.ma;
                    $scope.newLoai.chung_loai.icon = item.icon;
                }
            }
        }
    }


    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {
        isCanBeRemoved: function(chungloai) {
            var err = $scope._helpers.validateUser('can_delete_phan_loai');
            if (_.isEmpty(err))
                return true;
            return false;
        }
    }


    // ***************************************************
    // WATCHERS
    // ***************************************************
    $scope.$watch('_ui.orderProperty', function() {
        if ($scope._ui.orderProperty)
            $scope._ui.sort = {
                ten: parseInt($scope._ui.orderProperty)
            };
    });
});
