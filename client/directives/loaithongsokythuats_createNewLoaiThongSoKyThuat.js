angular.module('angular-skynet').directive('loaithongsokythuatsCreateNewLoaiThongSoKyThuat', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewLoaiThongSoKyThuat()($scope.newLoaiThongSoKyThuat);
        }

        $scope.removeAll = function() {
        	$scope.removeLoaiThongSoKyThuatAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newLoaiThongSoKyThuat: '=datasource',
            chungloais: '=chungloaisSelectsource',
            createNewLoaiThongSoKyThuat: '&actionCreateNew',
            removeLoaiThongSoKyThuatAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_loaithongsokythuats_createNewLoaiThongSoKyThuat.html'
    };
});
