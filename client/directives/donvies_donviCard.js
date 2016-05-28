angular.module('angular-skynet').directive('donviesDonViCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.donvi);

		$scope.remove = function() {
			$scope.removeDonVi()($scope.donvi);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	donvi: '=datasource',
    	removeDonVi: '&actionRemoveDonVi',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_donvies_donviCard.html'
  };
});