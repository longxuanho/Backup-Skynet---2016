angular.module('angular-skynet').directive('loaisModalXoaLoai', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/loais/loais-modals/loais-modal-xoa-loai.html',
        controllerAs: 'LoaisModalXoaLoai',
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
                let modal = UIkit.modal("#modal_loais_xoa_loai");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeLoai($scope.confirmCode, $scope.source)
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
                removeLoai: function(confirmCode, chungloai) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_loai');
                        if (_.isEmpty(err)) {

                            Loais.remove({
                                _id: chungloai._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Loại thiết bị "' + chungloai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('loais.blank');
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
