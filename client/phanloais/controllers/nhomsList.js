angular.module('angular-skynet').controller('OldNhomsListCtrl', function($scope, $rootScope, $meteor, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    $scope._ui = Skynet.settings.phanloais.nhoms.ui;
    $scope._utils = Skynet.settings.phanloais.nhoms.utils;

    $scope._utils.initParams($scope);

    // ***************************************************
    // SUBSCRIBE
    // ***************************************************
    // No need to subcribe anything here.

    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.createNewNhom = function(nhom) {

        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {

            $scope.helpers.buildNewNhom();
            Nhoms.insert(nhom, function(error, result) {
                if (error) {
                    toastr.error('Không thể tạo mới nhóm thiết bị này. ' + error.message + '.');
                    console.log('Error:', error);
                } else {
                    $scope._utils.initParams($scope);
                    toastr.success('Nhóm thiết bị được tạo mới thành công.');
                    console.log('Nhóm mới:', result);
                }
            });

        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeNhom = function(nhom) {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {

            $scope.nhoms.remove(nhom).then(function() {
                toastr.info('Nhóm "' + nhom.ten + '" đã được gỡ bỏ khỏi hệ thống.')
            }, function(err) {
                toastr.error(err.message);
                console.error('có lỗi xảy ra: ' + err.message);
            });

        } else {
            toastr.error(err.message);
        }
    }

    $scope.removeNhomAll = function() {
        var err = $scope._helpers.validateUser('can_delete_phan_loai');
        if (_.isEmpty(err)) {
            $scope.nhoms.remove();
            toastr.info('Tất cả các nhóm thiết bị đã được gỡ bỏ khỏi hệ thống.');
        } else {
            toastr.error(err.message);
        }
    }

    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {

        },
        buildNewNhom: function() {

            $scope.newNhom.metadata.nguoi_tao = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.newNhom.metadata.nguoi_tao_profile_name = $rootScope.currentUser.profile.name;
            $scope.newNhom.metadata.nguoi_tao_email = $rootScope.currentUser.emails[0].address;
            $scope.newNhom.metadata.ngay_tao = new Date();

        }
    }

    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {
        isCanBeRemoved: function(nhom) {
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
