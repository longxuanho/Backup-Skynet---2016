// ***************************************************
// ALLOW / DENY
// ***************************************************

DonVis.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].donvis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].donvis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].donvis[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************

DonVis.before.remove(function(userId, doc) {

    var count = ThietBis.find({
        'don_vi_quan_ly.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('[dvql]thietbis-left', "Không thể gỡ bỏ đơn vị này. Vẫn còn các thiết bị liên quan (phương diện quản lý). [" + count + "]");

    var count = ThietBis.find({
        'don_vi_so_huu.keyId': doc._id
    }).count();

    if (count)
        throw new Meteor.Error('[dvql]thietbis-left', "Không thể gỡ bỏ đơn vị này. Vẫn còn các thiết bị liên quan (phương diện sở hữu). [" + count + "]");

});

DonVis.after.update(function(userId, doc, fieldNames, modifier, options) {

    ThietBis.update({
        'don_vi_quan_ly.keyId': doc._id
    }, {
        $set: {
            'don_vi_quan_ly.$.ten': doc.ten,
            'don_vi_quan_ly.$.ma': doc.ma,
            'don_vi_quan_ly.$.ten_viet_tat': doc.ten_viet_tat,
            'don_vi_quan_ly.$.ten_quoc_te': doc.ten_quoc_te,
            'don_vi_quan_ly.$.phan_loai': doc.phan_loai,
            'don_vi_quan_ly.$.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenDonVisChange: [dvql][lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenDonVisChange: [dvql][thành công!]', result);
    });

    ThietBis.update({
        'don_vi_so_huu.keyId': doc._id
    }, {
        $set: {
            'don_vi_so_huu.$.ten': doc.ten,
            'don_vi_so_huu.$.ma': doc.ma,
            'don_vi_so_huu.$.ten_viet_tat': doc.ten_viet_tat,
            'don_vi_so_huu.$.ten_quoc_te': doc.ten_quoc_te,
            'don_vi_so_huu.$.phan_loai': doc.phan_loai,
            'don_vi_so_huu.$.icon': doc.icon
        }
    }, {
        multi: true
    }, function(error, result) {
        if (error) {
            console.log('Hooks: updateThietBisWhenDonVisChange: [dvsh][lỗi] - ' + error.message);
            throw new Meteor.Error(403, error.message);
        }
        console.log('Hooks: updateThietBisWhenDonVisChange: [dvsh][thành công!]', result);
    });

}, {
    fetchPrevious: false
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("donvis_single", function(id) {
    check(id, String);
    return DonVis.find({
        _id: id
    });
});

Meteor.publish("donvis", function(options, searchString, searchBy) {

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

    Counts.publish(this, 'numberOfDonVisTotal', DonVis.find({
        '$or': query['$or']
    }), {
        noReady: true
    });



    Counts.publish(this, 'numberOfDonVis', DonVis.find(query), {
        noReady: true
    });

    return DonVis.find(query, options);
});
