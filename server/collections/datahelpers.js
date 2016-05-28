// **************************************************
// ALLOW / DENY
// **************************************************

DataHelpers.allow({
    insert: function(userId, doc) {
        if (Roles.userIsInRole(userId, ["admin", "super-manager"], "sky-project"))
            return true;
        if (Roles.userIsInRole(userId, ["quanly-suachuas", "support-suachuas"], "sky-project") && doc.subject === 'xuongdvkt')
            return true;
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        if (Roles.userIsInRole(userId, ["admin", "super-manager"], "sky-project"))
            return true;
        if (Roles.userIsInRole(userId, ["quanly-suachuas", "support-suachuas"], "sky-project") && doc.subject === 'xuongdvkt')
            return true;
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        if (Roles.userIsInRole(userId, ["admin", "super-manager"], "sky-project"))
            return true;

        return false;
    }
});

// ***************************************************
// COLLECTION HOOKS
// ***************************************************

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("datahelpers", function(options, subject) {
    
    if (options == null)
        options = {};

    let query = {};

    if (subject)
        query['subject'] = subject;

    return DataHelpers.find(query, options);

});
