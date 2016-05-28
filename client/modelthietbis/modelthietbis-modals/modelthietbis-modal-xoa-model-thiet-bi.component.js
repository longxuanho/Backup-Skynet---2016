angular.module('angular-skynet').directive('modelthietbisModalXoaModelThietBi', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/modelthietbis/modelthietbis-modals/modelthietbis-modal-xoa-model-thiet-bi.html',
        controllerAs: 'ModelThietBisModalXoaModelThietBi',
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
                let modal = UIkit.modal("#modal_modelthietbis_xoa_model_thiet_bi");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeModelThietBi($scope.confirmCode, $scope.source)
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
                removeModelThietBi: function(confirmCode, modelthietbi) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_model_thiet_bi');
                        if (_.isEmpty(err)) {

                            ModelThietBis.remove({
                                _id: modelthietbi._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Model "' + modelthietbi.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('modelthietbis.blank');
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
