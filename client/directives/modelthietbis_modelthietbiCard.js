angular.module('angular-skynet').directive('modelthietbisModelThietBiCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.modelthietbi);

		$scope.remove = function() {
			$scope.removeModelThietBi()($scope.modelthietbi);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	modelthietbi: '=datasource',
    	removeModelThietBi: '&actionRemoveModelThietBi',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_modelthietbis_modelthietbiCard.html'
  };
});