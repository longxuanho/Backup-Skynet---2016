angular.module('angular-skynet').directive('lichsuachuasMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/lichsuachuas/lichsuachuas-main/lichsuachuas-main.html',
        controllerAs: 'LichSuaChuasMain',
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
                'ten': 1
            };


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                lichsuachuas: () => {
                    return LichSuaChuas.find({}, {
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
                    let err = $scope._helpers.validateUser('can_delete_lich_sua_chua');
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
            $scope.subscribe('thietbis');
            $scope.subscribe('lichsuachuas', () => {
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

            $scope.removeChungLoai = (lichsuachua) => {
                let err = $scope._helpers.validateUser('can_delete_lich_sua_chua');
                if (_.isEmpty(err)) {

                    LichSuaChuas.remove({
                        _id: lichsuachua._id
                    }, (error) => {
                        if (!error) {
                            iNotifier.info('Kế hoạch sửa chữa "' + lichsuachua.ten + '" đã được gỡ bỏ khỏi hệ thống.');
                            $state.go('lichsuachuas.blank');
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
