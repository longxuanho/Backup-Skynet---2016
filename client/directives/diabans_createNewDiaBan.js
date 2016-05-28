angular.module('angular-skynet').directive('diabansCreateNewDiaBan', function() {
    var controller = function($scope) {

        $scope.createNew = function() {
            $scope.createNewDiaBan()($scope.newDiaBan);
        }

        $scope.removeAll = function() {
        	$scope.removeDiaBanAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newDiaBan: '=datasource',
            createNewDiaBan: '&actionCreateNew',
            removeDiaBanAll: '&actionRemoveAll'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_diabans_createNewDiaBan.html'
    };
});
