angular.module('angular-skynet').directive('infoMetadata', function() {
	var controller = function ($scope, Skynet) {	
        $scope._helpers = Skynet.helpers;
        $scope.metadata = {
            nguoiTao: $scope._helpers.resolveUser($scope.nguoiTao),
            nguoiCapNhatCuoi: $scope._helpers.resolveUser($scope.nguoiCapNhatCuoi)
        };

        $scope.$watch('nguoiCapNhatCuoi', function(newVal, oldVal) {
            $scope.metadata.nguoiCapNhatCuoi = $scope._helpers.resolveUser(newVal);
        });
        $scope.$watch('nguoiTao', function(newVal, oldVal) {
            $scope.metadata.nguoiTao = $scope._helpers.resolveUser(newVal);
        });
	};
  return {
    restrict: 'E',
    scope: {
        nguoiTao: '=',
        ngayTao: '=',
        nguoiCapNhatCuoi: '=',
        ngayCapNhatCuoi: '='
    },
    controller: controller,
    templateUrl: 'client/_partials/dir_info_metadata.html'
  };
});