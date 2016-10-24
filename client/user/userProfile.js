Users = Meteor.users;

Template.userProfile.helpers({
  user: function(event, Template) {
    return Users.findOne({_id: Meteor.userId()});
  },
});

Template.userProfile.events({
  'submit #formID': function(event, template) {
    event.preventDefault();
    Meteor.call('userData', event.target.profilename.value);
  }
});

