Template.frostData.helpers({
  frostData: function() {
    return Session.get("frostData") || [];
  }
});


Template.frostData.StringToDate = function(str,season) {
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
