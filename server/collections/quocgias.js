// ***************************************************
// ALLOW / DENY
// ***************************************************

QuocGias.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].quocgias[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].quocgias[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].quocgias[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});

// ***************************************************
// COLLECTION HOOKS
// ***************************************************

QuocGias.before.remove(function(userId, doc) {

    var count = HangSanXuats.find({
        'quoc_gia.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('hangsanxuats-left', "Không thể gỡ bỏ quốc gia này. Vẫn còn các hãng sản xuất thiết bị liên quan. [" + count + "]");

    count = ThietBis.find({
        'ho_so_tb.thong_tin_chung.xuat_xu.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ quốc gia này. Vẫn còn các thiết bị liên quan. [" + count + "]");

});

QuocGias.after.update(function(userId, doc, fieldNames, modifier, options) {

    HangSanXuats.update({
        'quoc_gia.keyId': doc._id
    }, {
        $set: {
            'quoc_gia.ten': doc.ten,
            'quoc_gia.ma': doc.ma,
            'quoc_gia.name': doc.name,
            'quoc_gia.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateHangSanXuatsWhenQuocGiaChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateHangSanXuatsWhenQuocGiaChange: [thành công!]', result);
    });

    ThietBis.update({
        'ho_so_tb.thong_tin_chung.xuat_xu.keyId': doc._id
    }, {
        $set: {
            'ho_so_tb.thong_tin_chung.xuat_xu.ten': doc.ten,
            'ho_so_tb.thong_tin_chung.xuat_xu.name': doc.name,
            'ho_so_tb.thong_tin_chung.xuat_xu.ma': doc.ma,
            'ho_so_tb.thong_tin_chung.xuat_xu.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenQuocGiasChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenQuocGiasChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("quocgias_single", function(id) {
    check(id, String);
    return QuocGias.find({
        _id: id
    });
});

// Meteor.publish("quocgias", function(options, searchString, searchBy) {

//     if (searchString == null)
//         searchString = '';
//     if (searchBy == null)
//         searchBy = 'ten';

//     var query = {};
//     var regex = {
//         '$regex': '.*' + searchString || '' + '.*',
//         '$options': 'i'
//     };

//     query[searchBy] = regex;

//     Counts.publish(this, 'numberOfQuocGiasTotal', QuocGias.find({}), {
//         noReady: true
//     });

//     Counts.publish(this, 'numberOfQuocGias', QuocGias.find(query), {
//         noReady: true
//     });

//     return QuocGias.find(query, options);
// });

Meteor.publish("quocgias", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfQuocGiasTotal', QuocGias.find({
        '$or': query['$or']
    }), {
        noReady: true
    });

    Counts.publish(this, 'numberOfQuocGias', QuocGias.find(query), {
        noReady: true
    });

    return QuocGias.find(query, options);
});
