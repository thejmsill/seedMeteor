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
  },
  'click .showFrostData': () => {
    navigator.geolocation.getCurrentPosition(function(location) {
      Meteor.call('fetchFrostLocation', location.coords, function(err, respJson) {
        if(err) {
          console.log("error occured on receiving data on server. ", err );
        } else {
          Session.set("frostLocation",respJson);
          document.getElementById('frostCitiesData').className = "table visible";
        }
      });
    });
  }
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}


