angular.module('angular-skynet').directive('dashboardSuachuasMain', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/dashboard/dashboard-suachuas/dashboard-suachuas-main.template.html',
        controllerAs: 'vm',
        bindToController: true,
        controller: function($scope, $stateParams, $state, skynetHelpers, $rootScope, iNotifier, $reactive, skynetDictionary, variables, $timeout) {

            $reactive(this).attach($scope);

            // ***************************************************
            // INITIALIZE
            // ***************************************************

            // Capture 'this contex - Refer to https://github.com/johnpapa/angular-styleguide#controlleras-with-vm
            let vm = this;

            // vm._data = skynetHelpers.data;
            // vm._helpers = skynetHelpers.helpers;

        

            // ***************************************************
            // SUBSCRIBE
            // ***************************************************

            $scope.subscribe('suachuas');

            // ***************************************************
            // REACTIVE HELPERS
            // ***************************************************

            vm.helpers({
            });
            

            // ***************************************************
            // METHODS
            // ***************************************************
            


            // ***************************************************
            // UTILS
            // ***************************************************

            vm.utils = {
                // accentColor: _.findWhere(vm._data.general.themes, {
                //     name: $rootScope.main_theme
                // }).color_accent,
                setGroupById: function(id) {
                    vm.pageOptions.groupBy.selectedId = id;
                }
            };

            // ***************************************************
            // WATCHERS
            // ***************************************************

            // $rootScope.$watch('main_theme', (newVal) => {
            //     vm.utils.accentColor = _.findWhere(vm._data.general.themes, {
            //         name: newVal
            //     }).color_accent;
            // });
        }
    }
});