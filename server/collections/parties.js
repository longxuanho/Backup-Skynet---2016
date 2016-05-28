Parties.allow({
    insert: function(userId, party) {
        console.log('Server - party: ', party);
        console.log('Server - user: ', userId);
        return userId && party.owner === userId;
    },
    update: function(userId, party, fields, modifier) {
        return userId && party.owner === userId;
    },
    remove: function(userId, party) {
        return userId && party.owner === userId;
    }
});

Meteor.publish("parties", function(options, searchString) {

    if (searchString == null)
        searchString = '';

    Counts.publish(this, 'numberOfParties', Parties.find({
    		'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or: [{
            $and: [{
                'public': true
            }, {
                'public': {
                    $exists: true
                }
            }]
        }, {
            $and: [{
                owner: this.userId
            }, {
                owner: {
                    $exists: true
                }
            }]
        }]
    }), {
        noReady: true
    });

    return Parties.find({
    		'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        $or: [{
            $and: [{
                "public": true
            }, {
                "public": {
                    $exists: true
                }
            }]
        }, {
            $and: [{
                owner: this.userId
            }, {
                owner: {
                    $exists: true
                }
            }]
        }]
    }, options);
});
