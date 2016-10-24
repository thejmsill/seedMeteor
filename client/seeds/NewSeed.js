Template.NewSeed.events({
  'click .fa-close': () => {
    Session.set('newSeed', false);
  }
});