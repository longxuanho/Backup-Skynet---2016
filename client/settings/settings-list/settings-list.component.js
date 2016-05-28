angular.module('angular-skynet').directive('settingsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/settings/settings-list/settings-list.html',
        controllerAs: 'settingsList',
        controller: function($scope, $reactive, skynetHelpers) {
            // $reactive(this).attach($scope);


            // ***************************************************
            // INITIALIZE
            // ***************************************************

            this._helpers = skynetHelpers.helpers;



            


        }
    }
});
