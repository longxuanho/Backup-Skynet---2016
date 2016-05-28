angular.module('angular-skynet').directive('suachuasSidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/directives/skynet/suachuasSidebar/suachuasSidebar.template.html',
        scope: {
            'pageReactiveData': '=',
            'dictionary': '='
        },
        controllerAs: 'vm',
        bindToController: true,

        controller: function($scope, skynetHelpers, $rootScope, $reactive, skynetDictionary) {

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            vm.sSidebar = {
                site_online: true,
                top_bar: true,
                minify_assets: true
            };
            
            // ***************************************************
            // METHODS
            // ***************************************************
            

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('userStatus');

            // ***************************************************
            // UTILS
            // ***************************************************
            
            vm.utils = {
                setLimitFocus: function(field) {
                    if (_.contains(['#limit_multi_tags', '#limit_multi_nhom_tbs', '#limit_multi_bac_this'], field)) {
                        let multiSelect = $(field).data("kendoMultiSelect");
                        multiSelect.focus();
                        multiSelect.open();
                    }
                },
                clearLimit: function(field) {
                    switch(field) {
                        case '#limit_multi_tags':
                            vm.pageReactiveData.searchTags = [];
                            break;
                        case '#limit_multi_nhom_tbs':
                            vm.pageReactiveData.searchLoaitbs = [];
                            break;
                        case '#limit_multi_bac_this':
                            vm.pageReactiveData.searchBacthis = [];
                            break;
                    }                        
                }
            }


            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************
            $scope.helpers({
                usersStatus: () => {
                    return Meteor.users.find({},{
                        sort : { 
                            'status.online' : -1,
                            'profile.name': 1
                        } 
                    });
                }
            });


            // ***************************************************
            // WATCHERS
            // ***************************************************


        }
    }
});
