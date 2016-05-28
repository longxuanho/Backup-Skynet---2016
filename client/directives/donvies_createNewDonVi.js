angular.module('angular-skynet').directive('donviesCreateNewDonVi', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewDonVi()($scope.newDonVi);
        }

        $scope.removeAll = function() {
        	$scope.removeDonViAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newDonVi: '=datasource',
            createNewDonVi: '&actionCreateNew',
            removeDonViAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_donvies_createNewDonVi.html'
    };
});
