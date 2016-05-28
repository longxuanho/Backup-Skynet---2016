angular.module('angular-skynet').directive('hangsanxuatsCreateNewHangSanXuat', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewHangSanXuat()($scope.newHangSanXuat);
        }

        $scope.removeAll = function() {
        	$scope.removeHangSanXuatAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newHangSanXuat: '=datasource',
            quocgias: '=quocgiasSelectsource',
            createNewHangSanXuat: '&actionCreateNew',
            removeHangSanXuatAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_hangsanxuats_createNewHangSanXuat.html'
    };
});
