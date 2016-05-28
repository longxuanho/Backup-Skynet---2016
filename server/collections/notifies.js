// **************************************************
// ALLOW / DENY
// **************************************************

Notifies.allow({
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].notifies[group];

        if (Roles.userIsInRole(userId, rights, group))
            return true;
        return false;
    }
});

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("notifies-xuongdvkt-dashboard", function() {
    return Notifies.find({
        'section': 'suachuas',
        'category': 'xuongdvkt-dashboard',
        'subject': 'hero-content'
    }, {
        limit: 1
    });
});
