angular.module('angular-skynet').directive('chungloaisModalXoaChungLoai', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/chungloais/chungloais-modals/chungloais-modal-xoa-chung-loai.html',
        controllerAs: 'ChungLoaisModalXoaChungLoai',
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
                let modal = UIkit.modal("#modal_chungloais_xoa_chung_loai");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeChungLoai($scope.confirmCode, $scope.source)
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
                removeChungLoai: function(confirmCode, chungloai) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_chung_loai');
                        if (_.isEmpty(err)) {

                            ChungLoais.remove({
                                _id: chungloai._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Chủng loại "' + chungloai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('chungloais.blank');
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
