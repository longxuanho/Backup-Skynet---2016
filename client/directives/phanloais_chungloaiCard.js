angular.module('angular-skynet').directive('phanloaisChungLoaiCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.chungloai);

		$scope.remove = function() {
			$scope.removeChungLoai()($scope.chungloai);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	chungloai: '=datasource',
    	removeChungLoai: '&actionRemoveChungLoai',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_phanloais_chungloaiCard.html'
  };
});