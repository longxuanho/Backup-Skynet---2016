// **************************************************
// ALLOW / DENY
// **************************************************

SuaChuas.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].suachuas[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].suachuas[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].suachuas[group];

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

Meteor.publish("suachuas", function(fromDate, toDate) {

    if (!fromDate) 
        fromDate = moment().format("YYYY-MM-DD");

    var query = {
        '$or': []
    };
    if (!toDate) {
        query['$or'] = [
            {'thong_ke.thoi_gian.bat_dau.ngay': { $gte: fromDate } },
            {'thong_ke.thoi_gian.ket_thuc.ngay': { $gte: fromDate } },
            {'trang_thai': { $in: ["Đang sửa chữa", "Chuẩn bị bàn giao"] } }
        ]
    } else {
        query['$or'] = [
            {'thong_ke.thoi_gian.bat_dau.ngay': { $gte: fromDate, $lte: toDate } },
            {'thong_ke.thoi_gian.ket_thuc.ngay': { $gte: fromDate, $lte: toDate } },
            {'trang_thai': { $in: ["Đang sửa chữa", "Chuẩn bị bàn giao"] } }
        ]
    }    

    Counts.publish(this, 'numberOfSuaChuasTotal', SuaChuas.find({
    }), {
        noReady: true
    });

    return SuaChuas.find(query);
});

Meteor.publish("suachuas-all", function(options, searchString) {
    if (searchString == null)
        searchString = '';

    var query = {
        $or: []
    };

    var regex = {
        '$regex': '.*' + searchString || '' + '.*',
        '$options': 'i'
    };

    query['$or'].push({ 'ma_tb.ma_tb' : regex });
    query['$or'].push({ 'ma_tb.dvql' : regex });
    query['$or'].push({ 'noi_dung' : regex });

    return SuaChuas.find(query);
});
