angular.module('angular-skynet').directive('phanloaisLoaiCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.loai);

		$scope.remove = function() {
			$scope.removeLoai()($scope.loai);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	loai: '=datasource',
    	removeLoai: '&actionRemoveLoai',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_phanloais_loaiCard.html'
  };
});