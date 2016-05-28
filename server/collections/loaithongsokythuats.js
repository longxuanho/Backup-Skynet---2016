// ***************************************************
// ALLOW / DENY
// **************************************************

LoaiThongSoKyThuats.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].loaithongsokythuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].loaithongsokythuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].loaithongsokythuats[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************

LoaiThongSoKyThuats.before.remove(function(userId, doc) {

    var count = ThietBis.find({
        'thong_so_ky_thuat.loai_thong_so.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('thietbis-left', "Không thể gỡ bỏ thông số kỹ thuật này. Vẫn còn các thiết bị liên quan. [" + count + "]");

});

LoaiThongSoKyThuats.after.update(function(userId, doc, fieldNames, modifier, options) {

    ThietBis.update({
        'thong_so_ky_thuat.loai_thong_so.keyId': doc._id
    }, {
        $set: {
            'thong_so_ky_thuat.$.loai_thong_so.ten': doc.ten,
            'thong_so_ky_thuat.$.loai_thong_so.ma': doc.ma,
            'thong_so_ky_thuat.$.loai_thong_so.don_vi': doc.don_vi,
            'thong_so_ky_thuat.$.loai_thong_so.mo_ta': doc.mo_ta,
            'thong_so_ky_thuat.$.loai_thong_so.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenLoaiThongSoKyThuatsChange: [lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenLoaiThongSoKyThuatsChange: [thành công!]', result);
    });

}, {
    fetchPrevious: false
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("loaithongsokythuats_single", function(id) {
    check(id, String);
    return LoaiThongSoKyThuats.find({
        _id: id
    });
});

Meteor.publish("loaithongsokythuats", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfLoaiThongSoKyThuatsTotal', LoaiThongSoKyThuats.find({
        '$or': query['$or']
    }), {
        noReady: true
    });


    Counts.publish(this, 'numberOfLoaiThongSoKyThuats', LoaiThongSoKyThuats.find(query), {
        noReady: true
    });

    return LoaiThongSoKyThuats.find(query, options);
});
