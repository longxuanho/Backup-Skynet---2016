angular.module('angular-skynet').directive('quocgiasModalXoaQuocGia', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/quocgias/quocgias-modals/quocgias-modal-xoa-quoc-gia.html',
        controllerAs: 'QuocGiasModalXoaQuocGia',
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
                let modal = UIkit.modal("#modal_quocgias_xoa_quoc_gia");

                if (modal.isActive())
                    modal.hide();

                $scope.utils.removeQuocGia($scope.confirmCode, $scope.source)
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
                removeQuocGia: function(confirmCode, quocgia) {
                    let err = this.validateConfirmCode();
                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_quoc_gia');
                        if (_.isEmpty(err)) {

                            QuocGias.remove({
                                _id: quocgia._id
                            }, (error) => {
                                if (!error) {
                                    iNotifier.info('Quốc gia "' + quocgia.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                                    $state.go('quocgias.blank');
                                }
                                else {
                                    iNotifier.error(error.message);
                                    console.error('có lỗi xảy ra: ' + error.message);
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
