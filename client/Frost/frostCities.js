Template.frostCities.helpers({
  frostLocation: function() {
    return Session.get("frostLocation") || [];
  },
  frostData: function() {
    return Session.get("frostData") || [];
  }
});

Template.frostCities.events({
  'click .nameLoc': (event, template) => {
    var locationId = event.currentTarget.dataset.id;
    Meteor.call('fetchFrostData', locationId, '1', function(err, respJson) {
      if(err) {
        console.log("error occured on receiving data on server. ", err );
      } else {
        console.log("respJson: ", respJson);
        Session.set("frostData",respJson);
      }
    });
  },
});