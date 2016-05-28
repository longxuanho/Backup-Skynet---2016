angular.module('angular-skynet').directive('cauhoisModalXoaCauHoi', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/cauhois/cauhois-modals/cauhois-modal-xoa-cau-hoi.html',
        scope: {
            source: '='
        },
        controller: function($scope, $stateParams, $rootScope, skynetHelpers, $state, iNotifier, $timeout) {

            
            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._helpers = skynetHelpers.helpers;
            
            $scope.confirmCode = '';

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
                removeCauHoi: function(cauhoi) {
                    let err = this.validateConfirmCode();

                    if (_.isEmpty(err)) {
                        err = $scope._helpers.validateUser('can_delete_cau_hoi');
                        if (_.isEmpty(err)) {

                            CauHois.remove({
                                _id: cauhoi._id
                            }, (error) => {
                                if (!error) {
                                    this.goToListPageAndNotify('Câu hỏi mã "' + cauhoi._id + '" đã được gỡ bỏ khỏi hệ thống.');
                                }
                                else {
                                    iNotifier.error(error.message);
                                    $scope.$apply(() => {
                                        $scope.confirmCode = '';
                                    });
                                }
                            });                            

                        } else {
                            iNotifier.error(err.message);
                        }
                    } else {
                        iNotifier.error(err.message);
                    }
                },
                goToListPageAndNotify: function(message) {
                    this.closeModal();
                    $timeout(()=>{
                        $state.go('cauhois.list');
                    }, 600);
                    $timeout(()=>{
                        iNotifier.warning(message);
                    }, 2500);         
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_thietbis_xoa_cau_hoi");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }
        }
    }
});
