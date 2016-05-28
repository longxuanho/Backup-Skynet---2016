angular.module('angular-skynet').directive('cauhoisModalDetails', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/cauhois/cauhois-modals/cauhois-modal-details.html',
        controllerAs: 'vm',
        scope: {
        	source: '='
        },
        controller: function($scope, $rootScope, skynetHelpers, $state, $timeout) {
            $scope._helpers = skynetHelpers.helpers;

            $scope.utils = {
                isEditable: function() {
                    return _.isEmpty($scope._helpers.validateUser('can_upsert_cau_hoi'));
                },
                goToEditPage: function() {
                    this.closeModal();
                    $timeout(()=>{
                        $state.go('cauhois.update', {cauhoiId: $scope.source._id});
                    }, 600);          
                },
                closeModal: function() {
                    let modal = UIkit.modal("#modal_cauhois_details");
                    if (modal.isActive()) {
                        modal.hide();
                    }
                }
            }
        }
    }
});
