// ***************************************************
// ALLOW / DENY
// ***************************************************

ChungLoais.allow({
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

ChungLoais.before.remove(function(userId, doc) {

    var count = Loais.find({
        'chung_loai.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('loais-left', "Không thể gỡ bỏ chủng loại này. Vẫn còn các loại thiết bị liên quan. [" + count + "]");

    count = LoaiThongSoKyThuats.find({
        'chung_loai.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('loaithongsokythuats-left', "Không thể gỡ bỏ chủng loại này. Vẫn còn các thông số kỹ thuật liên quan. [" + count + "]");

    count = ThietBis.find({
        'phan_loai.chung_loai.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ chủng loại này. Vẫn còn các thiết bị liên quan. [" + count + "]");

});

ChungLoais.after.update(function(userId, doc, fieldNames, modifier, options) {

    Loais.update({
        'chung_loai.keyId': doc._id
    }, {
        $set: {
            'chung_loai.ten': doc.ten,
            'chung_loai.ma': doc.ma,
            'chung_loai.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateLoaisWhenChungLoaisChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateLoaisWhenChungLoaisChange: [thành công!]', result);
    });

    LoaiThongSoKyThuats.update({
        'chung_loai.keyId': doc._id
    }, {
        $set: {
            'chung_loai.ten': doc.ten,
            'chung_loai.ma': doc.ma,
            'chung_loai.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateLoaiThongSoKyThuatsWhenChungLoaisChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateLoaiThongSoKyThuatsWhenChungLoaisChange: [thành công!]', result);
    });

    ThietBis.update({
        'phan_loai.chung_loai.keyId': doc._id
    }, {
        $set: {
            'phan_loai.chung_loai.ten': doc.ten,
            'phan_loai.chung_loai.ma': doc.ma,
            'phan_loai.chung_loai.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenChungLoaisChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenChungLoaisChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("chungloais_single", function(id) {
    check(id, String);
    return ChungLoais.find({
        _id: id
    });
});

Meteor.publish("chungloais", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfChungLoaisTotal', ChungLoais.find({
        '$or': query['$or']
    }), {
        noReady: true
    });



    Counts.publish(this, 'numberOfChungLoais', ChungLoais.find(query), {
        noReady: true
    });

    return ChungLoais.find(query, options);
});
