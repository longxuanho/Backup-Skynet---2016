angular.module('angular-skynet').directive('nhansusModalXoaNhanSu', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/nhansus/nhansus-modals/nhansus-modal-xoa-thiet-bi.html',
        controllerAs: 'NhanSusModalXoaNhanSu',
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
                let modal = UIkit.modal("#modal_nhansus_xoa_thiet_bi");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeNhanSu($scope.confirmCode, $scope.source)
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
                removeNhanSu: function(confirmCode, thietbi) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_thiet_bi');
                        if (_.isEmpty(err)) {

                            NhanSus.remove({
                                _id: thietbi._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Thiết bị "' + thietbi.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('nhansus.blank');
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
