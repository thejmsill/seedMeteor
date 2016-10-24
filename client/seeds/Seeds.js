Template.Seeds.onCreated(function() {
  var self = this;
  self.autorun(function() {
    userID =  Meteor.userId();
    self.subscribe('myseeds', userID);
  });
});

Template.Seeds.helpers({
  myseeds: ()=> {
    return Seeds.find({author:Meteor.userId()},{sort: {createdAt: -1}});
  }
});

Template.Seeds.events({
  'click .new-seed': () => {
    Session.set('newSeed', true);
  }
});
