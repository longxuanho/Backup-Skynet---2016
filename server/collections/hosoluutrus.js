// ***************************************************
// ALLOW / DENY
// ***************************************************

HoSoLuuTrus.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].hosoluutrus[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].hosoluutrus[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].hosoluutrus[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("hosoluutrus", function(options, searchString, searchBy) {

    if (searchString == null)
        searchString = '';
    if (searchBy == null)
        searchBy = 'ten';

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

    Counts.publish(this, 'numberOfHoSoLuuTrusTotal', HoSoLuuTrus.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfHoSoLuuTrus', HoSoLuuTrus.find(query), {
        noReady: true
    });

    return HoSoLuuTrus.find(query, options);
});
