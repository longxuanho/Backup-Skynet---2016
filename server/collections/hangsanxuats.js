// ***************************************************
// ALLOW / DENY
// ***************************************************

HangSanXuats.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].hangsanxuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].hangsanxuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].hangsanxuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************

HangSanXuats.before.remove(function(userId, doc) {

    var count = ModelThietBis.find({
        'hang_san_xuat.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('modelthietbis-left', "Không thể gỡ bỏ hãng sản xuất này. Vẫn còn các model thiết bị liên quan. [" + count + "]");

    count = ThietBis.find({
        'ho_so_tb.thong_tin_chung.hang_san_xuat.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ hãng sản xuất này. Vẫn còn các thiết bị liên quan. [" + count + "]");

});

HangSanXuats.after.update(function(userId, doc, fieldNames, modifier, options) {

    ModelThietBis.update({
        'hang_san_xuat.keyId': doc._id
    }, {
        $set: {
            'hang_san_xuat.ten': doc.ten,
            'hang_san_xuat.ma': doc.ma,
            'hang_san_xuat.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateModelThietBisWhenHangSanXuatsChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateModelThietBisWhenHangSanXuatsChange: [thành công!]', result);
    });

    ThietBis.update({
        'ho_so_tb.thong_tin_chung.hang_san_xuat.keyId': doc._id
    }, {
        $set: {
            'ho_so_tb.thong_tin_chung.hang_san_xuat.ten': doc.ten,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.ma': doc.ma,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.icon': doc.icon,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.quoc_gia.keyId': doc.quoc_gia.keyId,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.quoc_gia.ten': doc.quoc_gia.ten,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.quoc_gia.name': doc.quoc_gia.name,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.quoc_gia.ma': doc.quoc_gia.ma,
            'ho_so_tb.thong_tin_chung.hang_san_xuat.quoc_gia.icon': doc.quoc_gia.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenHangSanXuatsChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenHangSanXuatsChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});



// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("hangsanxuats_single", function(id) {
    check(id, String);
    return HangSanXuats.find({
        _id: id
    });
});

Meteor.publish("hangsanxuats", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfHangSanXuatsTotal', HangSanXuats.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfHangSanXuats', HangSanXuats.find(query), {
        noReady: true
    });

    return HangSanXuats.find(query, options);
});
