// ***************************************************
// PUBLISH / SUBSCRIBE
// ***************************************************

Meteor.publish("skylogs_cauhois_kythuat", function() {
    return SkyLogs.find({
        'subject': 'cauhois',
        'category': 'ky_thuat'
    }, {
        sort: {'when.time': -1},
        limit: 100
    });
});