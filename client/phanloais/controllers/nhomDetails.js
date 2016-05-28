angular.module('angular-skynet').controller('OldNhomDetailsCtrl', function($scope, $rootScope, $stateParams, $meteor, Skynet) {

    // ***************************************************
    // INITIALIZE
    // ***************************************************
    $scope._helpers = Skynet.helpers;
    Skynet.settings.phanloais.page_display = 'nhoms'; // Usefull when go back route to 'phanloais'


    // ***************************************************
    // SUBSCRIBE
    // ***************************************************
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.$meteorSubscribe('nhoms_single', $stateParams.nhomId);
    $scope.nhom = $meteor.object(Nhoms, $stateParams.nhomId, false);    

    
    // ***************************************************
    // METHODS
    // ***************************************************
    $scope.save = function() {

        var err = $scope._helpers.validateUser('can_upsert_phan_loai');
        if (_.isEmpty(err)) {

            $scope.helpers.buildNhom();
            $scope.nhom.save().then(function(numberOfDocs) {
                toastr.success('Nhóm thiết bị "' + $scope.nhom.ten + '" được cập nhật thành công.');
                console.log('Cập nhật nhóm thiết bị thành công ', numberOfDocs);
            }, function(error) {
                toastr.error('Không thể cập nhật nhóm thiết bị này. ' + error.message + '.');
                console.log('Có lỗi xảy ra trong khi cập nhật nhóm thiết bị ', error);
            });

        } else {
            toastr.error(err.message);
        }        
    };

    $scope.reset = function() {
        $scope.nhom.reset();
    };

    // ***************************************************
    // HELPERS
    // ***************************************************
    $scope.helpers = {
        validateForm: function() {

        },
        buildNhom: function() {

            $scope.nhom.metadata.ngay_cap_nhat_cuoi = new Date();
            $scope.nhom.metadata.nguoi_cap_nhat_cuoi = $rootScope.currentUser._id;
            if ($rootScope.currentUser.profile)
                if ($rootScope.currentUser.profile.name)
                    $scope.nhom.metadata.nguoi_cap_nhat_cuoi_profile_name = $rootScope.currentUser.profile.name;
            $scope.nhom.metadata.nguoi_cap_nhat_cuoi_email = $rootScope.currentUser.emails[0].address;

        }
    };

    // ***************************************************
    // ULTILS
    // ***************************************************
    $scope.utils = {}
});
