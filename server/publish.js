Meteor.publish('allseeds', function() {
  return Seeds.find({});
});

Meteor.publish('myseeds', function(userID) {
  return Seeds.find({author:userID});
});

Meteor.publish('singleSeed', function(id) {
  check(id, String);
  return Seeds.find({_id: id});
});

Meteor.publish('comments', function(id) {
  return Comments.find({refId: id});
});

Meteor.publish('users', function(id) {
  return Users.find({_id: id});
});

