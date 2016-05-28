angular.module('angular-skynet').controller('LoaiDetailsCtrl', function($scope, $stateParams, $meteor, $rootScope, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    Skynet.settings.phanloais.page_display = 'loais'; 


    // ***************************************************
    // SUBSCRIBE
    // ***************************************************    
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.$meteorSubscribe('loais_single', $stateParams.loaiId).then(function() {
        // Do something here...
    });
    $scope.loai = $meteor.object(Loais, $stateParams.loaiId, false);

    $scope.$meteorSubscribe('nhoms'); // auto close subscirbe when controller destroyed, using instead of $meteor.subscribe('nhoms')
    $scope.nhoms = $meteor.collection(function() {
        return Nhoms.find({}, {
            sort: {
                ten: 1
            }
        });
    });

    $scope.$meteorSubscribe('chungloais'); // auto close subscirbe when controller destroyed, using instead of $meteor.subscribe('chungloais')
    $scope.chungloais = $meteor.collection(function() {
        return ChungLoais.find({
            'nhom.keyId': $scope.getReactively('loai.nhom.keyId')
        }, {
            sort: {
                ten: 1
            }
        });
    });

    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.save = function() {

        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {
            err = $scope.helpers.validateForm();
            if (_.isEmpty(err)) {

                $scope.helpers.buildLoai();
                $scope.loai.save().then(function(numberOfDocs) {
                    toastr.success('Loại thiết bị "' + $scope.loai.ten + '" được cập nhật thành công.')
                    console.log('lưu trữ thành công ', numberOfDocs);
                }, function(error) {
                    toastr.error('Không thể cập nhật loại thiết bị này. ' + error.message + '.');
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
        $scope.loai.reset();
    };

    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {
            var error = {};
            if (!$scope.loai.nhom.keyId) {
                error.message = "Nhóm thiết bị chưa được chọn. Xin hãy thử lại.";
                return error;
            }
            if (!$scope.loai.chung_loai.keyId) {
                error.message = "Chủng loại thiết bị chưa được chọn. Xin hãy thử lại.";
                return error;
            }
            return error;
        },
        buildLoai: function() {

            $scope.loai.metadata.ngay_cap_nhat_cuoi = new Date();
            $scope.loai.metadata.nguoi_cap_nhat_cuoi = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.loai.metadata.nguoi_cap_nhat_cuoi_profile_name = $rootScope.currentUser.profile.name;
            $scope.loai.metadata.nguoi_cap_nhat_cuoi_email = $rootScope.currentUser.emails[0].address;

            if (!_.isEmpty($scope.loai.nhom)) {
                var item = Nhoms.findOne({
                    _id: $scope.loai.nhom.keyId
                });
                if (item) {
                    $scope.loai.nhom.ten = item.ten;
                    $scope.loai.nhom.ma = item.ma;
                    $scope.loai.nhom.icon = item.icon;
                }
            }

            if (!_.isEmpty($scope.loai.chung_loai)) {
                var item = ChungLoais.findOne({
                    _id: $scope.loai.chung_loai.keyId
                });
                if (item) {
                    $scope.loai.chung_loai.ten = item.ten;
                    $scope.loai.chung_loai.ma = item.ma;
                    $scope.loai.chung_loai.icon = item.icon;
                }
            }

        }
    }

    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {}


});
