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
  },
  'click .showFrostData': () => {
    Meteor.call('fetchFrostLocation', function(err, respJson) {
      if(err) {
        console.log("error occured on receiving data on server. ", err );
      } else {
        Session.set("frostLocation",respJson);
        document.getElementById('frostCitiesData').className = "table visible";
      }
    });
  }
});

Template.SeedSingle.StringToDate = function(str,season) {
  var season = parseInt(season);
  var today = new Date();
  var mon = 0;
  var day = 0;
  if(str.slice(0,1) != '0'){
    mon = parseInt(str.slice(0,2));
  } else {
    mon = parseInt(str.slice(1,2));
  }

  if(str.slice(2,3) != '0'){
    day = parseInt(str.slice(2,4));
  } else {
    day = parseInt(str.slice(3,4));
  }

  if((season == 1 && today.getMonth() <= mon-1) || (season == 2 && today.getMonth() <= mon-1)){
    var dateVal = new Date(today.getFullYear(),mon-1,day);
    return moment(dateVal).format('MMM D, YYYY');
  } else if((season == 1 && today.getMonth() > mon-1) || (season == 2 && today.getMonth() > mon-1)){
    var dateVal = new Date(today.getFullYear()+1,mon-1,day);
    return moment(dateVal).format('MMM D, YYYY');
  }
}
