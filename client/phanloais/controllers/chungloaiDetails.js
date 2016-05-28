angular.module('angular-skynet').controller('ChungLoaiDetailsCtrl', function($scope, $stateParams, $meteor, $rootScope, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    Skynet.settings.phanloais.page_display = 'chungloais';    


    // ***************************************************
    // SUBSCRIBE
    // ***************************************************
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.$meteorSubscribe('nhoms'); // auto close subscirbe when controller destroyed, using instead of $meteor.subscribe('nhoms')
    $scope.nhoms = $meteor.collection(function() {
        return Nhoms.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('chungloais_single', $stateParams.chungloaiId).then(function() {
        // Do something...
    });
    $scope.chungloai = $meteor.object(ChungLoais, $stateParams.chungloaiId, false);


    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.save = function() {

        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {
            err = $scope.helpers.validateForm();
            if (_.isEmpty(err)) {

                $scope.helpers.buildChungLoai();
                $scope.chungloai.save().then(function(numberOfDocs) {            
                    toastr.success('Chủng loại thiết bị "' + $scope.chungloai.ten + '" được cập nhật thành công.')
                    console.log('lưu trữ thành công ', numberOfDocs);                
                }, function(error) {
                    toastr.error('Không thể cập nhật chủng loại thiết bị này. ' + error.message + '.');
                    console.log('có lỗi xảy ra trong quá trình lưu dữ liệu', error);
                });

            } else {
                toastr.error(err.message);
            }
        } else {
            toastr.error(err.message);
        }

    };

    $scope.reset = function() {
        $scope.chungloai.reset();
    };

    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {
            var error = {};
            if (!$scope.chungloai.nhom.keyId)
                error.message = "Nhóm phương tiện chưa được chọn. Xin hãy thử lại.";
            return error;
        },
        buildChungLoai: function() {

            $scope.chungloai.metadata.ngay_cap_nhat_cuoi = new Date();
            $scope.chungloai.metadata.nguoi_cap_nhat_cuoi = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.chungloai.metadata.nguoi_cap_nhat_cuoi_profile_name = $rootScope.currentUser.profile.name;
            $scope.chungloai.metadata.nguoi_cap_nhat_cuoi_email = $rootScope.currentUser.emails[0].address;

            if (!_.isEmpty($scope.chungloai.nhom)) {
                var item = Nhoms.findOne({
                    _id: $scope.chungloai.nhom.keyId
                });
                if (item) {
                    $scope.chungloai.nhom.ten = item.ten;
                    $scope.chungloai.nhom.ma = item.ma;
                    $scope.chungloai.nhom.icon = item.icon;
                }
            }
        }
    }

    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {}

});
