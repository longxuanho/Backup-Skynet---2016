// ***************************************************
// ALLOW / DENY
// ***************************************************

Nhoms.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].phanloais[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].phanloais[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].phanloais[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************

Nhoms.before.remove(function(userId, doc) {

    var count = ChungLoais.find({
        'nhom.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('chungloais-left', "Không thể gỡ bỏ nhóm này. Vẫn còn các chủng loại thiết bị liên quan tới nhóm. [" + count + "]");

    count = Loais.find({
        'nhom.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('loais-left', "Không thể gỡ bỏ nhóm này. Vẫn còn các loại thiết bị liên quan tới nhóm. [" + count + "]");

    count = ThietBis.find({
        'phan_loai.nhom.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ nhóm này. Vẫn còn các thiết bị liên quan tới nhóm. [" + count + "]");

});

Nhoms.after.update(function(userId, doc, fieldNames, modifier, options) {

    ChungLoais.update({
        'nhom.keyId': doc._id
    }, {
        $set: {
            'nhom.ten': doc.ten,
            'nhom.ma': doc.ma,
            'nhom.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error)
            console.log('Hooks: updateChungLoaisWhenNhomsChange: [lỗi] - ' + error.message);
        else
            console.log('Hooks: updateChungLoaisWhenNhomsChange: [thành công!]', result);
    });

    Loais.update({
        'nhom.keyId': doc._id
    }, {
        $set: {
            'nhom.ten': doc.ten,
            'nhom.ma': doc.ma,
            'nhom.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateLoaisWhenNhomsChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateLoaisWhenNhomsChange: [thành công!]', result);
    });

    ThietBis.update({
        'phan_loai.nhom.keyId': doc._id
    }, {
        $set: {
            'phan_loai.nhom.ten': doc.ten,
            'phan_loai.nhom.ma': doc.ma,
            'phan_loai.nhom.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenNhomsChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenNhomsChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("nhoms_single", function(id) {
    check(id, String);
    return Nhoms.find({
        _id: id
    });
});


Meteor.publish("nhoms", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfNhomsTotal', Nhoms.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfNhoms', Nhoms.find(query), {
        noReady: true
    });

    return Nhoms.find(query, options);
});
