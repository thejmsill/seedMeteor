Template.SeedSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleSeed', id);
  });
  self.autorun(function() {
    self.subscribe('comments');
  });
});

Template.SeedSingle.helpers({
  seed: ()=> {
    var id = FlowRouter.getParam('id');
    return Seeds.findOne({_id: id});
  },
  seedsExist: function(seed) {
    if (seed != undefined) {
      return true;
    } else {
      return false;
    }
  },
});

Template.SeedSingle.events({
  'click .comment': () => {
    Session.set('commentMode', true);
  },
  'click .fa-close': () => {
    Session.set('commentMode', false);
  }
});