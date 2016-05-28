angular.module('angular-skynet').directive('phanloaisCreateNewNhom', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewNhom()($scope.newNhom);
        }

        $scope.removeAll = function() {
        	$scope.removeNhomAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newNhom: '=datasource',
            createNewNhom: '&actionCreateNew',
            removeNhomAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_phanloais_createNewNhom.html'
    };
});
