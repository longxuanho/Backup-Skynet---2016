angular.module('angular-skynet').directive('thongsokythuatsMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/thongsokythuats/thongsokythuats-main/thongsokythuats-main.html',
        controllerAs: 'vm',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.searchText = '';
            $rootScope.searchBy = 'thiet_bi.ma_tb.ma_tb_field';
            $rootScope.orderProperty = '1';

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;

            $scope.perPage = 0;
            $scope.page = 1;
            $scope.orderProperty = '1';
            $scope.sort = {
                'order': 1
            };

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUserId: () => {
                    return Meteor.userId();
                },
            });

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');
            $scope.subscribe('usersettings');
            $scope.subscribe('nhoms');
            $scope.subscribe('thongsokythuats', () => {
                return [{
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage'))
                    },
                    $rootScope.getReactively('searchText'),
                    $rootScope.getReactively('searchBy')
                ]
            });

            // ***************************************************
            // METHODS
            // ***************************************************


            // ***************************************************
            // WATCHERS
            // ***************************************************

            $scope.pageChanged = (newPage) => {
                $scope.page = newPage;
            };

            $scope.updateSort = () => {
                $scope.sort = {
                    'ten': parseInt($scope.orderProperty)
                }
            };

            $rootScope.$watch('orderProperty', (newVal) => {
                $scope.sort = {
                    'ten': parseInt(newVal)
                }
            });
        }
    }
});
