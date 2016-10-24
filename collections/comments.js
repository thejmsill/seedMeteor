Comments = new Mongo.Collection('comments');

Comments.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
});

Meteor.methods({
  'comments.insert'(dataInsert) {
    Comments.insert({
      name: dataInsert.name,
      comment: dataInsert.comment,
      refId: dataInsert.refId,
      author: dataInsert.author,
      commentDate: dataInsert.commentDate
    });
  },
});