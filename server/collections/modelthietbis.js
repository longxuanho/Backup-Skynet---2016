// ***************************************************
// ALLOW / DENY
// ***************************************************

ModelThietBis.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].modelthietbis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].modelthietbis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].modelthietbis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});

// ***************************************************
// COLLECTION HOOKS
// ***************************************************

ModelThietBis.before.remove(function(userId, doc) {

    var count = ThietBis.find({
        'ho_so_tb.thong_tin_chung.model_tb.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ model thiết bị này. Vẫn còn các thiết bị liên quan. [" + count + "]");

});

ModelThietBis.after.update(function(userId, doc, fieldNames, modifier, options) {

    ThietBis.update({
        'ho_so_tb.thong_tin_chung.model_tb.keyId': doc._id
    }, {
        $set: {
            'ho_so_tb.thong_tin_chung.model_tb.ten': doc.ten,
            'ho_so_tb.thong_tin_chung.model_tb.ma': doc.ma,
            'ho_so_tb.thong_tin_chung.model_tb.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenModelThietBisChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenModelThietBisChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("modelthietbis_single", function(id) {
    check(id, String);
    return ModelThietBis.find({
        _id: id
    });
});

Meteor.publish("modelthietbis", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfModelThietBisTotal', ModelThietBis.find({
        '$or': query['$or']
    }), {
        noReady: true
    });



    Counts.publish(this, 'numberOfModelThietBis', ModelThietBis.find(query), {
        noReady: true
    });

    return ModelThietBis.find(query, options);
});


// ***************************************************
// METHODS
// ***************************************************
