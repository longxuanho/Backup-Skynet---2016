angular.module('angular-skynet').controller('OldChungLoaisListCtrl', function($scope, $rootScope, $meteor, Skynet) {
 
    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope._ui = Skynet.settings.phanloais.chungloais.ui;
    $scope._utils = Skynet.settings.phanloais.chungloais.utils;

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
        // chungloais đã được subscribe tại parent controller.

    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.createNewChungLoai = function(chungloai) {
        
        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {
            err = $scope.helpers.validateForm();
            if (_.isEmpty(err)) {

                $scope.helpers.buildNewChungLoai();           
                ChungLoais.insert(chungloai, function(error, result) {
                    if (error) {
                        toastr.error('Không thể tạo mới chủng loại này. ' + error.message + '.');
                        console.log('Error:', error);
                    } else {
                        $scope._utils.initParams($scope);
                        toastr.success('Chủng loại thiết bị mới được khởi tạo thành công.');
                        console.log('Chủng loại mới:', result);
                    }
                });

            } else {
                toastr.error(err.message);
            } 
        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeChungLoai = function(chungloai) {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {

            $scope.chungloais.remove(chungloai).then(function() {
                toastr.info('Chủng loại "' + chungloai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
            }, function(err) {
                toastr.error(err.message);
                console.error('có lỗi xảy ra: ' + err.message);
            });

        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeChungLoaiAll = function() {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {
            $scope.chungloais.remove();
            toastr.info('Tất cả chủng loại đã được gỡ bỏ khỏi hệ thống.');
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
            if (!$scope.newChungLoai.nhom)
                error.message = "Nhóm phương tiện chưa được chọn. Xin hãy thử lại.";
            return error;
        },
        buildNewChungLoai: function() {
            $scope.newChungLoai.metadata.nguoi_tao = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.newChungLoai.metadata.nguoi_tao_profile_name = $rootScope.currentUser.profile.name;
            $scope.newChungLoai.metadata.nguoi_tao_email = $rootScope.currentUser.emails[0].address;
            $scope.newChungLoai.metadata.ngay_tao = new Date();

            if (!_.isEmpty($scope.newChungLoai.nhom)) {
                var item = Nhoms.findOne({
                    _id: $scope.newChungLoai.nhom.keyId
                });
                if (item) {
                    $scope.newChungLoai.nhom.ten = item.ten;
                    $scope.newChungLoai.nhom.ma = item.ma;
                    $scope.newChungLoai.nhom.icon = item.icon;
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
