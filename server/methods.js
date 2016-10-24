Meteor.methods({
  fetchFrostLocation: function() {
    var url = "http://farmsense-prod.apigee.net/v1/frostdates/stations/?lat=47.60621&lon=-122.332071";
    //synchronous GET
    var result = Meteor.http.get(url, {timeout:30000});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },
  fetchFrostData: function(stationId, season) {
    console.log(stationId, season, 'this is the sation and searon');
    var url = "http://farmsense-prod.apigee.net/v1/frostdates/probabilities/?station="+ stationId +"&season=" + season;
    // var url = "http://farmsense-prod.apigee.net/v1/frostdates/probabilities/?station=284635&season=1";
    //synchronous GET
    var result = Meteor.http.get(url, {timeout:30000});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      console.log("response received.");
      return respJson;
    } else {
      console.log("Response issue: ", result.statusCode);
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },
  thumbsUp: function(id, voter) {
    console.log(voter, 'UP this is voter', id);
    // Seeds.update(id, {$set: {'votes': 1}});
    Seeds.update({'_id':id}, {$set: {'userUnique': 1}},{validate: false});
    // Seeds.update(
  }
});