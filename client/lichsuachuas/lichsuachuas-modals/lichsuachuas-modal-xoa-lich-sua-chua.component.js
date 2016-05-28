angular.module('angular-skynet').directive('lichsuachuasModalXoaChungLoai', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/lichsuachuas/lichsuachuas-modals/lichsuachuas-modal-xoa-lich-sua-chua.html',
        controllerAs: 'LichSuaChuasModalXoaLichSuaChua',
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
                let modal = UIkit.modal("#modal_lichsuachuas_xoa_lich_sua_chua");

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
                removeChungLoai: function(confirmCode, lichsuachua) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_lich_sua_chua');
                        if (_.isEmpty(err)) {

                            LichSuaChuas.remove({
                                _id: lichsuachua._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Kế hoạch sửa chữa "' + lichsuachua.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('lichsuachuas.blank');
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
