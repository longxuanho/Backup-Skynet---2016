angular.module('angular-skynet').directive('loaisMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/loais/loais-main/loais-main.html',
        controllerAs: 'LoaisMain',
        controller: function($scope, skynetHelpers, $rootScope, $state, $stateParams, iNotifier) {


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $rootScope.page_full_height = true;
            $rootScope.headerDoubleHeightActive = true;

            $rootScope.searchText = '';
            $rootScope.searchBy = 'ten';
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
                loais: () => {
                    return Loais.find({}, {
                        sort: $scope.sort
                    });
                },
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUserId: () => {
                    return Meteor.userId();
                },
                isCanBeRemoved: () => {
                    let err = $scope._helpers.validateUser('can_delete_loai');
                    if (_.isEmpty(err))
                        return true;
                    return false;
                }
            });


            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('users');
            $scope.subscribe('nhoms');
            $scope.subscribe('chungloais');
            $scope.subscribe('loais', () => {
                return [{
                        limit: parseInt($scope.getReactively('perPage')),
                        skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
                        sort: $scope.getReactively('sort')
                    },
                    $rootScope.getReactively('searchText'),
                    $rootScope.getReactively('searchBy')
                ]
            });


            // ***************************************************
            // METHODS
            // ***************************************************

            $scope.removeLoai = (loai) => {
                let err = $scope._helpers.validateUser('can_delete_loai');
                if (_.isEmpty(err)) {

                    Loais.remove({
                        _id: loai._id
                    }, (error) => {
                        if (!error) {
                            iNotifier.info('Loại thiết bị "' + loai.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                            $state.go('loais.blank');
                        } else {
                            iNotifier.error(error.message);
                        }
                    });

                } else {
                    iNotifier.error(err.message);
                }
            }


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
