angular.module('angular-skynet').directive('modelthietbisCreateNewModelThietBi', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewModelThietBi()($scope.newModelThietBi);
        }

        $scope.removeAll = function() {
        	$scope.removeModelThietBiAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newModelThietBi: '=datasource',
            hangsanxuats: '=hangsanxuatsSelectsource',
            createNewModelThietBi: '&actionCreateNew',
            removeModelThietBiAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_modelthietbis_createNewModelThietBi.html'
    };
});
