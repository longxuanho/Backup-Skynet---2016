angular.module('angular-skynet').filter('displayName', function () {
  return function (user) {
    if (!user)
      return;
    if (user.profile && user.profile.name)
      return user.profile.name;
    else if (user.emails)
      return user.emails[0].address;
    else
      return user;
  }
})
.filter('displayNumberAsAlphabelt', function () {
    return function (input) {
        let map = ["A", "B", "C", "D", "E", "F"];
        return map[input];
    }
});;