angular.module('angular-skynet').directive('donvisModalXoaDonVi', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/donvis/donvis-modals/donvis-modal-xoa-don-vi.html',
        controllerAs: 'DonVisModalXoaDonVi',
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
                let modal = UIkit.modal("#modal_donvis_xoa_don_vi");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeDonVi($scope.confirmCode, $scope.source)
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
                removeDonVi: function(confirmCode, donvi) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_don_vi');
                        if (_.isEmpty(err)) {

                            DonVis.remove({
                                _id: donvi._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Đơn vị "' + donvi.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('donvis.blank');
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
