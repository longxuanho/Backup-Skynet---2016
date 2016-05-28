angular.module('angular-skynet').directive('quocgiasQuocGiaCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.quocgia);

		$scope.remove = function() {
			$scope.removeQuocGia()($scope.quocgia);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	quocgia: '=datasource',
    	removeQuocGia: '&actionRemoveQuocGia',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_quocgias_quocgiaCard.html'
  };
});