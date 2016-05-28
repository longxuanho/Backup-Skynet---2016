// **************************************************
// ALLOW / DENY
// **************************************************

CauHois.allow({
    insert: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-insert'].cauhois[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return userId && doc.metadata.nguoi_tao === userId;
        }
        return false;
    },
    update: function(userId, doc, fields, modifier) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-update'].cauhois[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    },
    remove: function(userId, doc) {
        // Check Roles
        var group = Meteor.settings.private.roles['master-group'];
        var rights = Meteor.settings.private.rights['can-remove'].cauhois[group];

        if (Roles.userIsInRole(userId, rights, group)) {
            return true;
        }
        return false;
    }
});


// ***************************************************
// COLLECTION HOOKS
// ***************************************************
CauHois.after.insert(function(userId, doc) {
    // Sau khi tạo mới câu hỏi thi -> ghi vào log
    let user = Meteor.users.findOne({_id: userId});
    if (user) {
        let now = new Date,
            new_log = {
                subject: 'cauhois',
                category: 'ky_thuat',
                section: doc.phan_loai.nhom_tb.ten,
                action: 'Tạo mới',
                user: {
                    userId: userId,
                    userName: user.profile ? user.profile.name : 'Vô danh',
                    userEmail: user.emails[0].address
                },
                target: {
                    keyId: doc._id,
                    ref: doc.noi_dung.tieu_de,
                },
                when: {
                    time: now,
                    time_day_str: moment(now).format('YYYY-MM-DD'),
                    time_month_str: moment(now).format('YYYY-MM'),
                    time_year_str: moment(now).format('YYYY')
                }
            }
            SkyLogs.insert(new_log, (error) => {
                if (error) {
                    console.log('SkyLogs - Error: ', error.reason);
                }
            });
    }
});

CauHois.after.remove(function(userId, doc) {
    // Sau khi gỡ bỏ câu hỏi thi -> ghi vào log
    let user = Meteor.users.findOne({_id: userId});
    if (user) {
        let now = new Date,
            new_log = {
                subject: 'cauhois',
                category: 'ky_thuat',
                section: doc.phan_loai.nhom_tb.ten,
                action: 'Gỡ bỏ',
                user: {
                    userId: userId,
                    userName: user.profile ? user.profile.name : 'Vô danh',
                    userEmail: user.emails[0].address
                },
                target: {
                    keyId: doc._id,
                    ref: doc.noi_dung.tieu_de,
                },
                when: {
                    time: now,
                    time_day_str: moment(now).format('YYYY-MM-DD'),
                    time_month_str: moment(now).format('YYYY-MM'),
                    time_year_str: moment(now).format('YYYY')
                }
            }
        SkyLogs.insert(new_log, (error) => {
            if (error) {
                console.log('SkyLogs - Error: ', error.reason);
            }
        });
    }
});

CauHois.after.update(function(userId, doc) {
    // Sau khi gỡ bỏ câu hỏi thi -> ghi vào log
    let user = Meteor.users.findOne({_id: userId});
    if (user) {
        let now = new Date,
            new_logs = [],
            insert_log = function(updateLog, log_arr) {
                let new_log = {
                        subject: 'cauhois',
                        category: 'ky_thuat',
                        section: doc.phan_loai.nhom_tb.ten,
                        action: 'Cập nhật',
                        user: {
                            userId: userId,
                            userName: user.profile ? user.profile.name : 'Vô danh',
                            userEmail: user.emails[0].address
                        },
                        target: {
                            keyId: doc._id,
                            ref: doc.noi_dung.tieu_de,
                            field: updateLog.field,
                            desc: updateLog.desc,
                            from: updateLog.from,
                            to: updateLog.to
                        },
                        when: {
                            time: now,
                            time_day_str: moment(now).format('YYYY-MM-DD'),
                            time_month_str: moment(now).format('YYYY-MM'),
                            time_year_str: moment(now).format('YYYY')
                        }
                    };
                log_arr.push(new_log);
            };
        if (doc.phan_loai.nhom_tb.ten !== this.previous.phan_loai.nhom_tb.ten)
            insert_log({
                field: 'phan_loai.nhom_tb.ten',
                desc: 'Nhóm thiết bị',
                from: this.previous.phan_loai.nhom_tb.ten,
                to: doc.phan_loai.nhom_tb.ten
            }, new_logs);
        if (doc.phan_loai.nhom_cau_hoi.ten !== this.previous.phan_loai.nhom_cau_hoi.ten)
            insert_log({
                field: 'phan_loai.nhom_cau_hoi.ten',
                desc: 'Nhóm nội dung',
                from: this.previous.phan_loai.nhom_cau_hoi.ten,
                to: doc.phan_loai.nhom_cau_hoi.ten
            }, new_logs);
        if (doc.phan_loai.muc_do.ten !== this.previous.phan_loai.muc_do.ten)
            insert_log({
                field: 'phan_loai.muc_do.ten',
                desc: 'Mức độ',
                from: this.previous.phan_loai.muc_do.ten,
                to: doc.phan_loai.muc_do.ten
            }, new_logs);
        if (doc.fields.tags !== this.previous.fields.tags)
            insert_log({
                field: 'fields.tags',
                desc: 'Tag',
                from: this.previous.fields.tags,
                to: doc.fields.tags
            }, new_logs);
        if (doc.fields.loai_tb !== this.previous.fields.loai_tb)
            insert_log({
                field: 'fields.loai_tb',
                desc: 'Loại thiết bị',
                from: this.previous.fields.loai_tb,
                to: doc.fields.loai_tb
            }, new_logs);
        if (doc.fields.bac_thi !== this.previous.fields.bac_thi)
            insert_log({
                field: 'fields.bac_thi',
                desc: 'Bậc thi',
                from: this.previous.fields.bac_thi,
                to: doc.fields.bac_thi
            }, new_logs);
        if (doc.fields.correctAnswer !== this.previous.fields.correctAnswer)
            insert_log({
                field: 'fields.correctAnswer',
                desc: 'Đáp án đúng',
                from: this.previous.fields.correctAnswer,
                to: doc.fields.correctAnswer
            }, new_logs);
        if (doc.noi_dung.thong_ke.numOfUrlHinhAnhs !== this.previous.noi_dung.thong_ke.numOfUrlHinhAnhs)
            insert_log({
                field: 'noi_dung.thong_ke.numOfUrlHinhAnhs',
                desc: 'Hình ảnh',
                from: this.previous.noi_dung.thong_ke.numOfUrlHinhAnhs.toString(),
                to: doc.noi_dung.thong_ke.numOfUrlHinhAnhs.toString()
            }, new_logs);
        if (doc.noi_dung.thong_ke.numOfLuaChons !== this.previous.noi_dung.thong_ke.numOfLuaChons)
            insert_log({
                field: 'noi_dung.thong_ke.numOfLuaChons',
                desc: 'Số lựa chọn',
                from: this.previous.noi_dung.thong_ke.numOfLuaChons.toString(),
                to: doc.noi_dung.thong_ke.numOfLuaChons.toString()
            }, new_logs);
        // Trường hợp số lựa chọn không đổi nhưng thay đổi nội dung lựa chọn
        if (doc.noi_dung.thong_ke.numOfLuaChons === this.previous.noi_dung.thong_ke.numOfLuaChons) {
            _.each(_.keys(doc.fields.lua_chons), (key) => {
                if (doc.fields.lua_chons[key] !== this.previous.fields.lua_chons[key])
                    insert_log({
                        field: 'doc.fields.lua_chons[' + key + ']',
                        desc: 'Lựa chọn',
                        from: this.previous.fields.lua_chons[key],
                        to: doc.fields.lua_chons[key]
                    }, new_logs);
            });
        }
        if (doc.noi_dung.tieu_de !== this.previous.noi_dung.tieu_de)
            insert_log({
                field: 'noi_dung.tieu_de',
                desc: 'Nội dung',
                from: this.previous.noi_dung.tieu_de,
                to: doc.noi_dung.tieu_de
            }, new_logs);

        // Nếu có bất cứ thay đổi nào trong phạm vi, ghi vào SkyLogs
        if (new_logs.length) {
            _.each(new_logs, (item) => {
                SkyLogs.insert(item);   
            });
        }  
    }
});

// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("cauhois", function(options, searchString, searchBy, tags, loaitbs, bacthis) {

    // Check Security...
    let group = Meteor.settings.private.roles['master-group'],
        rights = Meteor.settings.private.rights['can-view'].cauhois[group];

    if (this.userId && Roles.userIsInRole(this.userId, rights, group)) {
        if (searchString == null)
            searchString = '';
        if (searchBy == null)
            searchBy = 'noi_dung.tieu_de';

        var query = {};
        var regex = {
            '$regex': '.*' + searchString || '' + '.*',
            '$options': 'i'
        };

        if (!_.isEmpty(tags)) {
            query['tags'] = {
                $in: tags
            };
        }

        if (!_.isEmpty(loaitbs)) {
            query['phan_loai.loai_tb'] = {
                $in: loaitbs
            };
        }

        if (!_.isEmpty(bacthis)) {
            query['phan_loai.bac_thi'] = {
                $in: bacthis
            };
        }

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

        Counts.publish(this, 'numberOfCauHois', CauHois.find(query), {
            noReady: true
        });

        return CauHois.find(query, options);
    }
    return;    
});

Meteor.publish("cauhois_statistics", function(section) {
    if (!section)
        section = 'ky_thuat';

    Counts.publish(this, 'numberOfCauHoisTotal', CauHois.find({
    }), {
        noReady: true
    });

    return CauHois.find({
        'lop.ma': section
    }, {
        fields: {
            _id: 1,
            phan_loai: 1,
            fields: 1
        }
    });
});
