Template.AllSeeds.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('allseeds');
  });
});

Template.AllSeeds.helpers({
    allseeds: ()=> {
    return Seeds.find({}, {sort: {createdAt: -1}});
}
});

Template.AllSeeds.events({
    'click .new-seed': () => {
    Session.set('newSeed', true);
}
});
