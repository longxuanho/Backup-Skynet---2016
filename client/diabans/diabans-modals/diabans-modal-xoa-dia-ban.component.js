angular.module('angular-skynet').directive('diabansModalXoaDiaBan', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/diabans/diabans-modals/diabans-modal-xoa-dia-ban.html',
        controllerAs: 'DiaBansModalXoaDiaBan',
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
                let modal = UIkit.modal("#modal_diabans_xoa_dia_ban");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeDiaBan($scope.confirmCode, $scope.source)
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
                removeDiaBan: function(confirmCode, diaban) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_dia_ban');
                        if (_.isEmpty(err)) {

                            DiaBans.remove({
                                _id: diaban._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Địa bàn "' + diaban.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('diabans.blank');
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
