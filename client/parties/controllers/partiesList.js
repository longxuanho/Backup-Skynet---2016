angular.module('angular-skynet').controller('PartiesListCtrl', function($scope, $rootScope, $meteor) {

    // UI Params
    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = {
        name: 1
    };
    $scope.orderProperty = '1';

    // Subcribe, search, sort, count and pagination
    $meteor.autorun($scope, function() {
        $meteor.subscribe('parties', {
            limit: parseInt($scope.getReactively('perPage')),
            skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
            sort: $scope.getReactively('sort')
        }, $scope.getReactively('search')).then(function() {
            $scope.partiesCount = $meteor.object(Counts, 'numberOfParties', false);
        });

        $scope.parties = $meteor.collection(function() {
            return Parties.find({}, {
                sort: $scope.getReactively('sort')
            });
        });
    });

    // Methods
    $scope.createNew = function(party) {
        party.owner = $rootScope.currentUser._id;
        Parties.insert(party, function(error, result) {
        	if (error) {
        		toastr.error('Không thể lưu mục này. ' + error.toString().substr(7) + '.');
        		console.log('Error:', error);
        	} else {
        		toastr.success('Tạo mới thành công.');
        		console.log('Result:', result);
        		party = '';
        	}
        });       
    }

    $scope.remove = function(party) {
        $scope.parties.remove(party);
    }

    $scope.removeAll = function() {
        $scope.parties.remove();
    }

    // Events
    $scope.pageChanged = function(newPage) {
        $scope.page = newPage;
    };


    // Watchers
    $scope.$watch('orderProperty', function() {
        if ($scope.orderProperty)
            $scope.sort = {
                name: parseInt($scope.orderProperty)
            };
    });
});
