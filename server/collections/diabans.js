// ***************************************************
// ALLOW / DENY
// ***************************************************

DiaBans.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].diabans[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].diabans[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].diabans[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************

DiaBans.before.remove(function(userId, doc) {

    var count = ThietBis.find({
        'dia_ban_hoat_dong.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ địa bàn hoạt động này. Vẫn còn các thiết bị liên quan tới. [" + count + "]");

});

DiaBans.after.update(function(userId, doc, fieldNames, modifier, options) {

    ThietBis.update({
        'dia_ban_hoat_dong.keyId': doc._id
    }, {
        $set: {
            'dia_ban_hoat_dong.dia_ban': doc.dia_ban,
            'dia_ban_hoat_dong.dia_phuong': doc.dia_phuong,
            'dia_ban_hoat_dong.tinh_thanh': doc.tinh_thanh,
            'dia_ban_hoat_dong.mien': doc.mien
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenDiaBansChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenDiaBansChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("diabans_single", function(id) {
    check(id, String);
    return DiaBans.find({
        _id: id
    });
});

Meteor.publish("diabans", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfDiaBansTotal', DiaBans.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfDiaBans', DiaBans.find(query), {
        noReady: true
    });

    return DiaBans.find(query, options);
});
