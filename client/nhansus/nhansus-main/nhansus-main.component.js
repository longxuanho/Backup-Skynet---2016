angular.module('angular-skynet').directive('nhansusMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/nhansus/nhansus-main/nhansus-main.html',
        controllerAs: 'NhanSusMain',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // $rootScope.page_full_height = true;
            // $rootScope.headerDoubleHeightActive = true;

            $rootScope.searchText = '';
            $rootScope.searchBy = 'metadata.search_field';
            $rootScope.orderProperty = '1';

            $scope._helpers = skynetHelpers.helpers;
            $scope._data = skynetHelpers.data;

            $scope.perPage = 0;
            $scope.page = 1;
            $scope.orderProperty = '1';
            $scope.sort = {
                'ma_nv': 1
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
            $scope.subscribe('donvis');
            $scope.subscribe('usersettings');
            $scope.subscribe('nhansus', () => {
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
                    'ma_nv': parseInt($scope.orderProperty)
                }
            };

            $rootScope.$watch('orderProperty', (newVal) => {
                $scope.sort = {
                    'ma_nv': parseInt(newVal)
                }
            });



        }
    }
});
