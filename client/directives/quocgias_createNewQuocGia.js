angular.module('angular-skynet').directive('quocgiasCreateNewQuocGia', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewQuocGia()($scope.newQuocGia);
        }

        $scope.removeAll = function() {
        	$scope.removeQuocGiaAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newQuocGia: '=datasource',
            createNewQuocGia: '&actionCreateNew',
            removeQuocGiaAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_quocgias_createNewQuocGia.html'
    };
});
