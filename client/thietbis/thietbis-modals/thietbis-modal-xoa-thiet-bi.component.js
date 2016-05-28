angular.module('angular-skynet').directive('thietbisModalXoaThietBi', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-modals/thietbis-modal-xoa-thiet-bi.html',
        controllerAs: 'ThietBisModalXoaThietBi',
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
                let modal = UIkit.modal("#modal_thietbis_xoa_thiet_bi");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeThietBi($scope.confirmCode, $scope.source)
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
                removeThietBi: function(confirmCode, thietbi) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_thiet_bi');
                        if (_.isEmpty(err)) {

                            ThietBis.remove({
                                _id: thietbi._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Thiết bị "' + thietbi.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('thietbis.list');
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
