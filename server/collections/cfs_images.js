// ***************************************************
// ALLOW / DENY
// ***************************************************

Images.allow({
    insert: function(userId) {
        return (userId ? true : false);
    },
    remove: function(userId) {
        return (userId ? true : false);
    },
    download: function() {
        return true;
    },
    update: function(userId) {
        return (userId ? true : false);
    }
});


// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish('cfs_images', function() {
    return Images.find({});
});
