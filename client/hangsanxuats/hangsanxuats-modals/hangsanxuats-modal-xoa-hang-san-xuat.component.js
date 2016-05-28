angular.module('angular-skynet').directive('hangsanxuatsModalXoaHangSanXuat', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/hangsanxuats/hangsanxuats-modals/hangsanxuats-modal-xoa-hang-san-xuat.html',
        controllerAs: 'HangSanXuatsModalXoaHangSanXuat',
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
                let modal = UIkit.modal("#modal_hangsanxuats_xoa_hang_san_xuat");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeHangSanXuat($scope.confirmCode, $scope.source)
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
                removeHangSanXuat: function(confirmCode, hangsanxuat) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_hang_san_xuat');
                        if (_.isEmpty(err)) {

                            HangSanXuats.remove({
                                _id: hangsanxuat._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Hãng sản xuất "' + hangsanxuat.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('hangsanxuats.blank');
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
