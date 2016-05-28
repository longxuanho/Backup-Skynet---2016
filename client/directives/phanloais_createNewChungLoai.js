angular.module('angular-skynet').directive('phanloaisCreateNewChungLoai', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewChungLoai()($scope.newChungLoai);
        }

        $scope.removeAll = function() {
        	$scope.removeChungLoaiAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
        	nhoms: '=nhomsSelectsource',
            newChungLoai: '=datasource',
            createNewChungLoai: '&actionCreateNew',
            removeChungLoaiAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_phanloais_createNewChungLoai.html'
    };
});
