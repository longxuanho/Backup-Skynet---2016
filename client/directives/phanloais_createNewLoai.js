angular.module('angular-skynet').directive('phanloaisCreateNewLoai', function() {
    var controller = function($scope, $meteor) {

        $scope.createNew = function() {
            $scope.createNewLoai()($scope.newLoai);
        }

        $scope.removeAll = function() {
            $scope.removeLoaiAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            nhoms: '=nhomsSelectsource',
            chungloais: '=chungloaisSelectsource',
            newLoai: '=datasource',
            createNewLoai: '&actionCreateNew',
            removeLoaiAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_phanloais_createNewLoai.html'
    };
});
