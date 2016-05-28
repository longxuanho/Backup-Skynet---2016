angular.module('angular-skynet').directive('angularSkynet', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/angular-skynet/angular-skynet.html',
        controllerAs: 'angularSkynet',
        controller: function($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUser: () => {
                    return Meteor.user();
                }
            });

            this.logout = () => {
                Accounts.logout();
            }
        }
    }
});
