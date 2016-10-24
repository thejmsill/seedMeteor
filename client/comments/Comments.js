Template.Comments.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('comments', id);
  });
});

Template.Comments.helpers({
  comments: ()=> {
    var id = FlowRouter.getParam('id');
    return Comments.find({refId: id});
  },
});
