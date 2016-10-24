import { Random } from 'meteor/random'
Seeds = new Mongo.Collection('seeds');

Seeds.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});

seeds = new SimpleSchema({
  planted: {
    type: Boolean,
    optional: true,
    defaultValue: 0,
    autoform: {
      type: "hidden"
    }
  },
  seedName: {
    type: String,
    optional: true,
    autoform: {
      type: "typeahead",
      options: function () {
        return [
          {label: "Arugula", value: 'Arugula'},
          {label: "Bell Peppers", value: 'Bell Peppers'},
          {label: "Beet", value: 'Beet'},
          {label: "Broccoli", value: 'Broccoli'},
          {label: "Butter Lettuce", value: 'Butter Lettuce'},
          {label: "Cabbage", value: 'Cabbage'},
          {label: "Carrots", value: 'Carrots'},
          {label: "Celery", value: 'Celery'},
          {label: "Corn", value: 'Corn'},
          {label: "Cucumber", value: 'Cucumber'},
          {label: "Dill", value: 'Dill'},
          {label: "Green Beans", value: 'Green Beans'},
          {label: "Kale", value: 'Kale'},
          {label: "Lettuce", value: 'Lettuce'},
          {label: "Peas", value: 'Peas'},
          {label: "Pole Beans", value: 'Pole Beans'},
          {label: "Pumpkins", value: 'Pumpkins'},
          {label: "Squash", value: 'Squash'},
          {label: "Radish", value: 'Radish'},
          {label: "Romaine Lettuce", value: 'Romaine Lettuce'},
          {label: "Snow Peas", value: 'Snow Peas'},
          {label: "Sugar Peas", value: 'Sugar Peas'},
          {label: "Swiss Chard", value: 'Swiss Chard'},
          {label: "Tomatoes", value: 'Tomatoes'},
          {label: "Zucchini", value: 'Zucchini'},
        ];
      }
    }
  },
  numberDays: {
    type: Number,
    label: "Number of Days till Maturation",
    optional: true,
  },
  plantingDate: {
    type: Date,
    label: "Planting Date",
    defaultValue: function() {
      return todaysDate();
    },
  },
  uniquePlant: {
    type: String,
    autoValue: function() {
      return Random.id(10)
    },
    autoform: {
      type: "hidden"
    }
  }
});

// const votingIds = new SimpleSchema({
//   userUnique: {
//     type: String,
//   }
// });

ListSchema = new SimpleSchema({
  name: {
    type: String,
    label: "List Name"
  },
  description: {
    type: 'textarea',
    label: "Description"
  },
  seeds: {
    type: [seeds]
  },
  author: {
    type: String,
    label: "Author",
    defaultValue: function() {
      return Meteor.userId();
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    defaultValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  votingIds: {
    type: [Object],
  },
  "votingIds.$.userUnique": {
    type: String,
    optional: true,
    defaultValue: function () {
      return Meteor.userId();
    },
  },
  votes: {
    type: Number,
    defaultValue: 0,
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  deleteSeed: function(id) {
    Seeds.remove(id);
  },
  thumbsUp: function(id, voter) {
    Seeds.update(id, {
      $inc: {
        'votes': +1
      }
    });
    Seeds.update({'_id':id}, {$addToSet: {'userUnique': voter}});
  },
  thumbsDown: function(id, voter) {
    Seeds.update(id, {
      $inc: {
        'votes': -1
      }
    });
  },
  plantedItem: function(id, currentState) {
    Seeds.update(
      {"seeds.uniquePlant": id},
      {$set: {"seeds.$.planted": !currentState}});
  },
});



Seeds.attachSchema( ListSchema );

var todaysDate = function() {
  var dateToday = new Date();
  var dd = dateToday.getDate();
  if(dd<10) {
    dd='0'+dd
  }
  var mm = dateToday.getMonth()+1;
  if(mm<10) {
    mm='0'+mm
  }
  var yyyy = dateToday.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};
