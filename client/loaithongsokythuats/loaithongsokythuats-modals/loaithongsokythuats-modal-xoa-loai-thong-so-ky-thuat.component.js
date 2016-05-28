angular.module('angular-skynet').directive('loaithongsokythuatsModalXoaLoaiThongSoKyThuat', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/loaithongsokythuats/loaithongsokythuats-modals/loaithongsokythuats-modal-xoa-loai-thong-so-ky-thuat.html',
        controllerAs: 'LoaiThongSoKyThuatsModalXoaLoaiThongSoKyThuat',
        controller: function($scope, $stateParams, $rootScope, skynetHelpers, $state, iNotifier) {

            
            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._helpers = skynetHelpers.helpers;
            
            $scope.confirmCode = '';

            
            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.remove = () => {
                let modal = UIkit.modal("#modal_loaithongsokythuats_xoa_loai_thong_so_ky_thuat");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeLoaiThongSoKyThuat($scope.confirmCode, $scope.source)
            }


            // ***************************************************
            // UTILS
            // ***************************************************

            $scope.utils = {
                validateConfirmCode: function() {
                    let error = {};
                    if ($scope.confirmCode !== $scope.source._id) {
                        error.message = "Mã xác nhận không hợp lệ. Xin vui lòng thử lại.";
                        return error;
                    }
                    return;
                },
                removeLoaiThongSoKyThuat: function(confirmCode, loaithongsokythuat) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_loai_thong_so_ky_thuat');
                        if (_.isEmpty(err)) {

                            LoaiThongSoKyThuats.remove({
                                _id: loaithongsokythuat._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Thông số kỹ thuật "' + loaithongsokythuat.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('loaithongsokythuats.blank');
                                }
                                else {
                                    iNotifier.error(error.message);
                                }
                            });

                            $scope.confirmCode = '';

                        } else {
                            iNotifier.error(err.message);
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                }
            }



        }
    }
});
