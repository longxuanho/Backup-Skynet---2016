angular.module('angular-skynet').directive('loaithongsokythuatsLoaiThongSoKyThuatCard', function() {
	var controller = function ($scope) {
		
		$scope.isCanBeRemoved = $scope.isCanBeRemoved()($scope.loaithongsokythuat);

		$scope.remove = function() {
			$scope.removeLoaiThongSoKyThuat()($scope.loaithongsokythuat);
		}
		
	};
  return {
    restrict: 'E',
    scope: {
    	loaithongsokythuat: '=datasource',
    	removeLoaiThongSoKyThuat: '&actionRemoveLoaiThongSoKyThuat',
    	isCanBeRemoved: '&actionIsCanBeRemoved'
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_loaithongsokythuats_loaithongsokythuatCard.html'
  };
});