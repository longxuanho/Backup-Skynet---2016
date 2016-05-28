// ***************************************************
// ALLOW / DENY
// **************************************************

ThongSoKyThuats.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].thongsokythuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].thongsokythuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].thongsokythuats[group];

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

Meteor.publish("thongsokythuats", function(options, searchString, searchBy) {

    if (searchString == null)
        searchString = '';
    if (searchBy == null)
        searchBy = 'thiet_bi.ma_tb.ma_tb_field';

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

    Counts.publish(this, 'numberOfThongSoKyThuatsTotal', ThongSoKyThuats.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfThongSoKyThuats', ThongSoKyThuats.find(query), {
        noReady: true
    });

    return ThongSoKyThuats.find(query, options);
});
