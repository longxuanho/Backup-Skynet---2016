angular.module('angular-skynet').directive('nhomsModalXoaNhom', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/nhoms/nhoms-modals/nhoms-modal-xoa-nhom.html',
        controllerAs: 'NhomsModalXoaNhom',
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
                let modal = UIkit.modal("#modal_nhoms_xoa_nhom");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeNhom($scope.confirmCode, $scope.source)
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
                removeNhom: function(confirmCode, nhom) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_nhom');
                        if (_.isEmpty(err)) {

                            Nhoms.remove({
                                _id: nhom._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Nhóm "' + nhom.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('nhoms.blank');
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
