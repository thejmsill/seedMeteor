Template.commentForm.events({
  'submit .newcomment'(e) {
    e.preventDefault();
    // Get value from form element
    const target = e.target;
    const name = target.name.value;
    const comment = target.comment.value;
    var id = FlowRouter.getParam('id');
    var insertData = {
      'name': name,
      'comment': comment,
      'refId': id,
      'author': Meteor.userId(),
      'commentDate': Date(),
    };
    Meteor.call('comments.insert', insertData);

    // Clear form
    target.name.value = '';
    target.comment.value = '';
  },
});