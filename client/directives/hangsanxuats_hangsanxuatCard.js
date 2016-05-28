angular.module('angular-skynet').directive('hangsanxuatsHangSanXuatCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.hangsanxuat);

		$scope.remove = function() {
			$scope.removeHangSanXuat()($scope.hangsanxuat);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	hangsanxuat: '=datasource',
    	removeHangSanXuat: '&actionRemoveHangSanXuat',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_hangsanxuats_hangsanxuatCard.html'
  };
});