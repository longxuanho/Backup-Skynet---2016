// ***************************************************
// ALLOW / DENY
// ***************************************************

ThietBis.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].thietbis.all[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
            // return true;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].thietbis.all[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].thietbis.all[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("thietbis_single", function(id) {
    check(id, String);
    return ThietBis.find({
        _id: id
    });
});

Meteor.publish("thietbis", function(options, searchString, searchBy) {

    if (searchString == null)
        searchString = '';
    if (searchBy == null)
        searchBy = 'ma_tb.ma_tb';

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

    Counts.publish(this, 'numberOfThietBisTotal', ThietBis.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfThietBis', ThietBis.find(query), {
        noReady: true
    });

    return ThietBis.find(query, options);
});

