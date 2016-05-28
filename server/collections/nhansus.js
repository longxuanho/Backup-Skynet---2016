// ***************************************************
// ALLOW / DENY
// ***************************************************

NhanSus.allow({
    insert: function(userId, doc) {
        // Check Roles
        let groups = Roles.getGroupsForUser(userId);
        
        let isAuthorized = false;

        _.each(groups, (group) => {
            let roles = Roles.getRolesForUser(userId, [group]);
            let rights = Meteor.settings.private.rights['can-insert'].nhansus[group];
            if (_.intersection(roles, rights).length)
                isAuthorized = true;
        });

        if (isAuthorized)
            return userId && doc.metadata.nguoi_tao === userId;

        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        let groups = Roles.getGroupsForUser(userId);
        
        let isAuthorized = false;

        _.each(groups, (group) => {
            let roles = Roles.getRolesForUser(userId, [group]);
            let rights = Meteor.settings.private.rights['can-update'].nhansus[group];
            if (_.intersection(roles, rights).length)
                isAuthorized = true;
        });

        if (isAuthorized)
            return userId && doc.metadata.nguoi_tao === userId;

        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        let groups = Roles.getGroupsForUser(userId);
        
        let isAuthorized = false;

        _.each(groups, (group) => {
            let roles = Roles.getRolesForUser(userId, [group]);
            let rights = Meteor.settings.private.rights['can-remove'].nhansus[group];
            if (_.intersection(roles, rights).length)
                isAuthorized = true;
        });

        if (isAuthorized)
            return userId && doc.metadata.nguoi_tao === userId;

        return false;
    }
});

// ***************************************************
// COLLECTION HOOKS
// ***************************************************





// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("nhansus", function(options, searchString, searchBy) {

    if (searchString == null)
        searchString = '';
    if (searchBy == null)
        searchBy = 'metadata.search_field';

    var query = {};
    var regex = {
        '$regex': '.*' + searchString || '' + '.*',
        '$options': 'i'
    };


    query[searchBy] = regex;
    query['$or'] = [{
        '$and': [{
            'isPublic': true
        }, {
            'isPublic': {
                '$exists': true
            }
        }]
    }, {
        '$and': [{
            'metadata.nguoi_tao': this.userId
        }, {
            'metadata.nguoi_tao': {
                '$exists': true
            }
        }]
    }];

    Counts.publish(this, 'numberOfNhanSusTotal', NhanSus.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfNhanSus', NhanSus.find(query), {
        noReady: true
    });

    return NhanSus.find(query, options);
});
