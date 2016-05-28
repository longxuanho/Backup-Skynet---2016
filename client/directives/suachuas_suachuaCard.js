angular.module('angular-skynet').directive('suachuasSuaChuaCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.suachua);

		$scope.remove = function() {
			$scope.removeSuaChua()($scope.suachua);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	suachua: '=datasource',
    	removeSuaChua: '&actionRemoveSuaChua',
    	isCanBeRemoved: '&actionIsCanBeRemoved',
        onCardClick: '&actionOnCardClick'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_suachuas_suachuaCard.html'
  };
});