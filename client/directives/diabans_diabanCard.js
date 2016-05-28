angular.module('angular-skynet').directive('diabansDiaBanCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.diaban);

		$scope.remove = function() {
			$scope.removeDiaBan()($scope.diaban);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	diaban: '=datasource',
    	removeDiaBan: '&actionRemoveDiaBan',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_diabans_diabanCard.html'
  };
});