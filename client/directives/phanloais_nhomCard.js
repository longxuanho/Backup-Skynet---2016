angular.module('angular-skynet').directive('phanloaisNhomCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.nhom);

		$scope.remove = function() {
			$scope.removeNhom()($scope.nhom);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	nhom: '=datasource',
    	removeNhom: '&actionRemoveNhom',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_phanloais_nhomCard.html'
  };
});