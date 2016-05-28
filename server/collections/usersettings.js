// ***************************************************
// ALLOW / DENY
// ***************************************************

UserSettings.allow({
    insert: function(userId, doc) {
        return doc.user.keyId === userId;
    },
    update: function(userId, doc, fields, modifier) {
        return doc.user.keyId === userId;
    },
    remove: function(userId, doc) {
        // Check Roles
        if (Roles.userIsInRole(userId, ['admin', 'super-manager'], 'sky-project'))
            return true;

        return doc.user.keyId === userId;
    }
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

// Meteor.publish("usersettings", function(options) {

//     if (!options || !options.phan_loai)
//         options = {
//             phan_loai: 'uigrid_state'
//         };

//     let selector = {
//         $or: [{
//             $and: [{
//                 'isPublic': true
//             }, {
//                 'isPublic': {
//                     $exists: true
//                 }
//             },  {
//                 'phan_loai': options.phan_loai
//             }]
//         }, {
//             $and: [{
//                 'metadata.nguoi_tao': this.userId
//             }, {
//                 'metadata.nguoi_tao': {
//                     $exists: true
//                 }
//             }, {
//                 'phan_loai': options.phan_loai
//             }]
//         }]
//     };

//     Counts.publish(this, 'numberOfUserSettings', Parties.find(selector), {noReady: true});
//     return UserSettings.find(selector);
// });


Meteor.publish("usersettings", function(options) {

    let selector = {
        $or: [{
            $and: [{
                'isPublic': true
            }, {
                'isPublic': {
                    $exists: true
                }
            }]
        }, {
            $and: [{
                'user.keyId': this.userId
            }, {
                'user.keyId': {
                    $exists: true
                }
            }]
        }]
    };

    Counts.publish(this, 'numberOfUserSettings', UserSettings.find(selector), {
        noReady: true
    });
    return UserSettings.find(selector);
});