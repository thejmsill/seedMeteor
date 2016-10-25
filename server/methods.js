Meteor.methods({
  fetchFrostLocation: function(coords) {
    console.log(coords.latitude,'this is the ',coords.longitude)
    var url = "http://farmsense-prod.apigee.net/v1/frostdates/stations/?lat="+coords.latitude+"&lon="+ coords.longitude;
    //synchronous GET
    var result = Meteor.http.get(url, {timeout:30000});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      return respJson;
    } else {
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  },
  fetchFrostData: function(stationId, season) {
    var url = "http://farmsense-prod.apigee.net/v1/frostdates/probabilities/?station="+ stationId +"&season=" + season;
    // var url = "http://farmsense-prod.apigee.net/v1/frostdates/probabilities/?station=284635&season=1";
    //synchronous GET
    var result = Meteor.http.get(url, {timeout:30000});
    if(result.statusCode==200) {
      var respJson = JSON.parse(result.content);
      return respJson;
    } else {
      var errorJson = JSON.parse(result.content);
      throw new Meteor.Error(result.statusCode, errorJson.error);
    }
  }
});
