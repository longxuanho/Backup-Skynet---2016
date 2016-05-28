angular.module('angular-skynet').directive('thietbisModalDetails', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thietbis/thietbis-modals/thietbis-modal-details.html',
        controllerAs: 'thietbisModalDetails',
        scope: {
        	source: '='
        },
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout) {
            $scope._helpers = skynetHelpers.helpers;

            $scope.utils = {
                isTrongThoiGianBaoHanh: function() {
                    if ($scope.source)
                        if ($scope.source.ho_so_tb && $scope.source.ho_so_tb.thong_tin_chung && $scope.source.ho_so_tb.thong_tin_chung.bao_hanh && $scope.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc)
                            return (new Date()) < $scope.source.ho_so_tb.thong_tin_chung.bao_hanh.thoi_gian_ket_thuc;
                    return false;
                },
                isEditable: function() {
                    return _.isEmpty($scope._helpers.validateUser('can_upsert_thiet_bi'));
                },
                goToEditPage: function() {
                    this.closeModal();
                    $timeout(()=>{
                        $state.go('thietbis.update', {thietbiId: $scope.source._id});
                    }, 600);          
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_thietbis_details");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }
        }
    }
});
