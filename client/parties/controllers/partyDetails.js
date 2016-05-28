angular.module('angular-skynet').controller('PartyDetailsCtrl', function($scope, $stateParams, $meteor) {

    $scope.party = $meteor.object(Parties, $stateParams.partyId, false);
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.$meteorSubscribe('parties');

    $scope.save = function() {
        $scope.party.save().then(function(numberOfDocs) {
            console.log('save success doc affected ', numberOfDocs);
        }, function(error) {
            console.log('save error', error);
        });
    };

    $scope.reset = function() {
        $scope.party.reset();
    };
});
