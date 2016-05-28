angular.module('angular-skynet').directive('adminUsersList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin-users-list/admin-users-list.template.html',
        controller: function($scope, $stateParams, skynetHelpers, $rootScope, iNotifier, skynetKendoGrid, $reactive) {

            // $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            $scope._data = skynetHelpers.data;
            $scope._helpers = skynetHelpers.helpers;
            
            $scope._kData = skynetKendoGrid.cauhois.data;
            $scope._kHelpers = skynetKendoGrid.cauhois.helpers;

            $rootScope.page_full_height = true;
            $rootScope.headerDoubleHeightActive = true;
            // $rootScope.topMenuActive = true;

            $rootScope.searchText = '';
            $rootScope.searchBy = 'profile.search_field';
            $rootScope.orderProperty = '1';

            $scope.perPage = 0;
            $scope.page = 1;
            $scope.orderProperty = '1';
            $scope.sort = {
                'order': 1
            };

            $scope.pageOptions = {
                //Các chế độ xem cơ bản: blank, view và action
                mode: 'blank',
                userSelected: {}
            };

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('userStatus');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            $scope.helpers({
                myUsers: () => {
                    return Meteor.users.find({
                        'profile.search_field': {
                            '$regex': '.*' + $rootScope.getReactively('searchText') || '' + '.*',
                            '$options': 'i'
                        }
                    },{
                        sort : { 
                            'status.online' : -1,
                            'profile.name': 1
                        } 
                    });
                }
            });

            // ***************************************************
            // UTILS
            // ***************************************************
            
            $scope.utils = {
                selectUser: (user) => {
                    // Chọn user
                    $scope.pageOptions.userSelected = user;
                    // Chuyển đến section xem thông tin người dùng
                    $scope.pageOptions.mode = 'view';
                },
                dropdownSelectUser: (user, mode) => {
                    if (_.contains(['blank', 'view', 'action'], mode)) {
                        $scope.pageOptions.userSelected = user;
                        $scope.pageOptions.mode = mode;
                        console.log('pageOptions: ', $scope.pageOptions);
                    }                        
                },
                printRoles: (user) => {
                    if (!_.isEmpty(user)) {
                        let roles = '';
                        _.each(user.roles, (item, key) => {
                            roles += key + ': [' + item.join(', ') + '] '
                        });
                        return roles;
                    }
                    return;
                }
            }

            // ***************************************************
            // WATCHERS
            // ***************************************************

            
            
            
        }
    }
});
