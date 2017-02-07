angular.module('starter.services', [])

  .factory('Medication', function() {
    // Might use a resource here that returns a JSON array

    // Replace with your service
    // Some fake testing data
    var medication = [{
      id: 1,
      image: 'img/pill1_600.jpg',
      title: 'Eclipse 25mg',
      desc: 'MED1_DESC',
      schedule: 'PRESCRIPTION_3_TIMES'
    }, {
      id: 2,
      image: 'img/pill2_600.jpg',
      title: 'Tictac 4mg',
      desc: 'MED2_DESC',
      schedule: 'PRESCRIPTION_2_TIMES'
    }, {
      id: 3,
      image: 'img/pill3_600.jpg',
      title: 'Seirogan 1mg',
      desc: 'MED3_DESC',
      schedule: 'PRESCRIPTION_1_TIMES'
    }];

    return {
      getMorningMed: function() {
        var meds = [];
        var ids = [1];
        for (id in ids) {
          var med = {};
          med.name = medication[ids[id]].title;
          med.url = medication[ids[id]].image;
          med.quatity = 1;
          meds.push(med);
        }
        return meds;
      },
      getNoonMed: function() {
        var meds = [];
        var ids = [0,1,2];
        for (id in ids) {
          var med = {};
          med.name = medication[ids[id]].title;
          med.url = medication[ids[id]].image;
          med.quatity = 1;
          meds.push(med);
        }
        return meds;
      },
      getNightMed: function() {
        var meds = [];
        var ids = [0,2];
        for (id in ids) {
          var med = {};
          med.name = medication[ids[id]].title;
          med.url = medication[ids[id]].image;
          med.quatity = 1;
          meds.push(med);
        }
        return meds;
      },
      getImage: function(id) {
        for (var i = 0; i < medication.length; i++) {
          if (medication[i].id === parseInt(id)) {
            return medication[i].image;
          }
        }
        return null;
      },
      getTitle: function(id) {
        for (var i = 0; i < medication.length; i++) {
          if (medication[i].id === parseInt(id)) {
            return medication[i].title;
          }
        }
        return null;
      },
      getDesc: function(id) {
        for (var i = 0; i < medication.length; i++) {
          if (medication[i].id === parseInt(id)) {
            return medication[i].desc;
          }
        }
        return null;
      },
      getSchedule: function(id) {
        for (var i = 0; i < medication.length; i++) {
          if (medication[i].id === parseInt(id)) {
            return medication[i].schedule;
          }
        }
        return null;
      },
      getLength: function() {
        return medication.length;
      }
    };
  })
  .factory('socket', function(socketFactory) {
    var myIoSocket = io.connect('http://localhost:3000');

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });
    return mySocket;
  });
