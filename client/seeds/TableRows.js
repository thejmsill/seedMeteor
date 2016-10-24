Template.TableRows.helpers({
  pastReady: function(plantingDate, days) {
    var readyDateVal = readyDate(plantingDate, days);
    var dateToday = new Date();
    var nowDate = moment(dateToday).format('MMM D, YYYY');
    if (readyDateVal < nowDate) {
      return true;
    } else {
      return false;
    }
  }
});

Template.TableRows.events({
  'click #plantedCheckbox': function(event, template) {
    Meteor.call('plantedItem', this.uniquePlant, this.planted);
  }
});

function readyDate(date, days) {
  var plantDate = Number(moment(date).format('X'));
  var readyDate = Number(days * 24 * 60 * 60) + plantDate;
  return moment.unix(readyDate).format('MMM D, YYYY');
}

