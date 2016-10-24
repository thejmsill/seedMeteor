Template.Seed.onCreated(function() {
  this.editMode = new ReactiveVar(false);
  var self = this;
  self.autorun(function() {
    self.subscribe('comments', self.data._id);
  });
});


Template.Seed.helpers({
  updateSeedId: function() {
    return this._id;
  },
  editMode: function() {
    return Template.instance().editMode.get();
  },
  commentCount: function(event, Template) {
    return Comments.find({refId: this._id}).count();
  },
});

Template.Seed.events({
  'click .fa-trash': function() {
    Meteor.call('deleteSeed', this._id);
  },
  'click .fa-close, .cancel': function(event, template) {
    template.editMode.set(!template.editMode.get());
  },
  'click .fa-pencil': function(event, template) {
    template.editMode.set(!template.editMode.get());
  },
  'click .fa-thumbs-up': function() {
    console.log('thumbup', this._id, Meteor.userId());
    Meteor.call('thumbsUp', this._id, Meteor.userId());
  },
  'click .fa-thumbs-down': function() {
    Meteor.call('thumbsDown', this._id, Meteor.userId());
  },
  'click .btn-primary': function(event, template) {
    template.editMode.set(!template.editMode.get());
  },
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM D, YYYY');
});

Template.registerHelper('formatDateTime', function(date) {
  return moment(date).format('MMM D, YYYY - h:mm a');
});

Template.registerHelper('readyDate', function(date, days) {
  var plantDate = Number(moment(date).format('X'));
  var readyDate = Number(days * 24 * 60 * 60) + plantDate;
  return moment.unix(readyDate).format('MMM D, YYYY');
});

Template.registerHelper('zebra', function(index) {
  if (index % 2) {
    return 'even';
  } else {
    return 'odd';
  }
});

Template.registerHelper('round', function(data) {
  return Math.round(data)
});

Template.registerHelper('authorContent', function(author) {
  if (author == Meteor.userId()) {
    return true;
  } else {
    return false;
  }
});