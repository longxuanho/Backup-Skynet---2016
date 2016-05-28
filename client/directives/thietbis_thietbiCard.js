angular.module('angular-skynet').directive('thietbisThietBiCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.thietbi);

		$scope.remove = function() {
			$scope.removeThietBi()($scope.thietbi);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	thietbi: '=datasource',
    	removeThietBi: '&actionRemoveThietBi',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_thietbis_thietbiCard.html'
  };
});