// ***************************************************
// COLLECTION HOOK
// ***************************************************

Meteor.users.before.insert(function(userId, doc) {
    if (!doc.profile)
        doc.profile = {};
    doc.profile.search_field = doc._id + ' : ' + doc.username + ' : ' + doc.emails[0].address + ' : ' + doc.profile.name;
});

Meteor.users.before.update(function(userId, doc, fieldNames, modifier, options) {
    if (modifier) {
        if (doc.profile)
            doc.profile.search_field = doc._id + ' : ' + doc.username + ' : ' + doc.emails[0].address + ' : ' + doc.profile.name;
        
        if (doc.profile && doc.profile.avatar && modifier.$set && _.has(modifier.$set, 'profile.avatar')) {
            console.log('removing old avatar... ', doc.profile.avatar.keyId);
            Images.remove({
                _id: doc.profile.avatar.keyId
            });
        }
    }
});


// ***************************************************
// PUB/SUB
// ***************************************************

Meteor.publish("users", function() {
    return Meteor.users.find({}, {
        fields: {
            emails: 1,
            profile: 1,
            status: 1,
            roles: 1
        }
    });
});

Meteor.publish("users_single", function(id) {
    check(id, String);
    return Meteor.users.find({
        _id: id
    }, {
        fields: {
            emails: 1,
            profile: 1,
            status: 1,
            roles: 1
        }
    });
});

Meteor.publish("userStatus", function(options, searchString, searchBy) {

    if (searchString == null)
        searchString = '';
    if (searchBy == null)
        searchBy = 'profile.search_field';
    options = (options) ? options : {};

    options.fields = {
        emails: 1,
        profile: 1,
        status: 1,
        roles: 1,
        createdAt: 1
    }

    var query = {};
    var regex = {
        '$regex': '.*' + searchString || '' + '.*',
        '$options': 'i'
    };

    query[searchBy] = regex;

    return Meteor.users.find(query, options);
});

Meteor.publish("user_statistics", function() {

    Counts.publish(this, 'numberOfUsersTotal', Meteor.users.find({
    }), {
        noReady: true
    });

    Counts.publish(this, 'numberOfUserOnline', Meteor.users.find({
        'status.online': true
    }), {
        noReady: true
    });

    return Meteor.users.find({
    }, {
        fields: {
            emails: 1,
            profile: 1,
            status: 1,
            roles: 1
        }
    });
});


// ***************************************************
// METHODS
// ***************************************************

Meteor.methods({
    /**
     * delete a user from a specific group
     * 
     * @method deleteUser
     * @param {String} targetUserId _id of user to delete
     * @param {String} group Company to update permissions for
     */
    deleteUser: function(targetUserId) {

        if (targetUserId === this.userId)
            throw new Meteor.Error(403, "Bạn không thể xóa tài khoản của chính mình!");

        if (Roles.userIsInRole(targetUserId, ['admin'], 'sky-project')) {
            throw new Meteor.Error(403, "Không thể xóa một user với quyền admin!");
        }

        if (!this.userId ||
            !Roles.userIsInRole(this.userId, ['admin', 'manage-users', 'support-staff'], 'sky-project')) {
            throw new Meteor.Error(403, "Bạn không đủ quyền hạn để xóa user này!");
        }

        // remove permissions for target group
        var groups = ['sky-project', 'ktvt', 'xncg'];
        _.each(groups, function(group) {
            Roles.setUserRoles(targetUserId, [], group);
        });

        // do other actions required when a user is removed...
        Meteor.users.remove({
            _id: targetUserId
        }, function(error, result) {
            if (error) {
                console.log("Có lỗi khi gỡ bỏ tài khoản người dùng: ", error);
            } else {
                console.log("Số lượng tài khoản bị gỡ bỏ: " + result);
            }
        });
    },

    sendVerificationEmail: function(targetUserId) {

        if (!this.userId)
            throw new Meteor.Error(403, "Người dùng chưa đăng nhập!");

        if (!Roles.userIsInRole(this.userId, ['admin', 'super-manager'], 'sky-project'))
            throw new Meteor.Error(403, "Bạn không đủ quyền để thực hiện tác vụ này!");

        if (!targetUserId)
            throw new Meteor.Error(403, "Người dùng không tồn tại!");
 
        Accounts.sendVerificationEmail(targetUserId);
        
        console.log('verification email sended!');
    },

    sendResetPasswordEmail: function(userId) {

        if (!this.userId)
            throw new Meteor.Error(403, "Người dùng chưa đăng nhập!");

        if (!Roles.userIsInRole(this.userId, ['admin', 'super-manager'], 'sky-project'))
            throw new Meteor.Error(403, "Bạn không đủ quyền để thực hiện tác vụ này!");

        if (!userId)
            throw new Meteor.Error(403, "Người dùng không tồn tại!");
 
        Accounts.sendResetPasswordEmail(userId);
        
        console.log('reset password email sended!');
    },

    /**
     * update a user's permissions
     *
     * @param {Object} targetUserId Id of user to update
     * @param {Array} roles User's new permissions
     * @param {String} group Company to update permissions for
     */
    updateRoles: function(targetUserId, roles, group) {
        // Object roles gồm 2 mảng: add và remove
        if (_.isArray(roles['add']) && _.isArray(roles['remove']) && group) {

            if (!targetUserId)
                throw new Meteor.Error(403, "Không có thông tin về Id người dùng.");

            if (_.contains(roles['add'], 'admin') || _.contains(roles['remove'], 'admin'))
                throw new Meteor.Error(403, "Admin không thể thay đổi vai trò của mình cũng như không thể cấp quyền admin cho người khác .");

            if (!this.userId ||
                !Roles.userIsInRole(this.userId, ['manage-users', 'support-staff'], 'sky-project')) {
                throw new Meteor.Error(403, "Bạn không đủ thẩm quyền cập nhật user này!");
            }
            if (roles['add'].length)
                Roles.addUsersToRoles(targetUserId, roles['add'], group);
            if (roles['remove'].length)
                Roles.removeUsersFromRoles(targetUserId, roles['remove'], group);

            console.log('modify roles - done!');
        }
        // do other actions required when a user is updated...
    },

    forceResetUserPassword: function(userId, newPassword) {

        if (!this.userId)
            throw new Meteor.Error(403, "Người dùng chưa đăng nhập!");

        if (!Roles.userIsInRole(this.userId, ['admin'], 'sky-project'))
            throw new Meteor.Error(403, "Bạn không đủ quyền để thực hiện tác vụ này!");

        if (!userId)
            throw new Meteor.Error(403, "Người dùng không tồn tại!");
 
        Accounts.setPassword(userId, newPassword);

        console.log('Reset mật khẩu thành công.');
    },

    checkPassword: function(digest) {
        if (this.userId) {
            var user = Meteor.user();
            var password = {
                digest: digest,
                algorithm: 'sha-256'
            };
            var result = Accounts._checkPassword(user, password);
            return result.error == null;
        } else {
            return false;
        }
    }, 

    verifyReCaptcha: function(recaptchaResponse) {

        var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(recaptchaResponse, this.connection.clientAddress);

        if (!verifyCaptchaResponse.success) {
            console.log('Xác nhận reCAPTCHA thất bại!', verifyCaptchaResponse);
            throw new Meteor.Error(422, verifyCaptchaResponse.error);
        } else
            console.log('Xác nhận reCAPTCHA thành công!');

        //do stuff with your formData

        return true;
    }
})
