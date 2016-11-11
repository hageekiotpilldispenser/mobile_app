angular.module('starter.controllers', ['ionic.cloud'])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicPush, $cordovaLocalNotification, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var initLoadTime = 2000,
      pollingTime = 60000,
      hasInitialized = false;

  var nextLoad = function() {
    if(!hasInitialized) {
      hasInitialized = true;
      $timeout(getData, initLoadTime);
    } else {
      $timeout(getData, pollingTime);
    }
  };

  var getData = function() {
    $http.get("https://data.sparkfun.com/output/9J8228V88yCW3gd27Ar8", {timeout: 5000})
      .success(function(data) {
        if(typeof data != 'undefined' && data.length > 0) {
          if(typeof data[0] != 'undefined') {
            var hour = data[0].time.substr(0,2);
            var minute = data[0].time.substr(2,4);

            if(hour == "00") {
              hour = 0;
            }

            if(minute == "00") {
              minute = 0;
            }
            var alarmTime = new Date();
            alarmTime.setHours(hour);
            alarmTime.setMinutes(minute);
            alarmTime.setSeconds(0);

            if(alarmTime.getTime() > new Date().getTime()) {
              setupNotification(alarmTime);
            } else {
              var now = new Date();
              setupNotification(new Date(now.getTime() + 30000));
            }
          }
        } else {
          // get schedule time in next polling time
          nextLoad();
        }
      })
      .error(function(data) {
        // get schedule time in next polling time
        nextLoad();
      });
  };

  nextLoad();

  var setupNotification = function(alarmTime) {

      var hour = alarmTime.getHours();

      var msg = "Morning medication is taken";
      if(hour >= 12 && hour < 18) {
        msg = "Noon medication is taken";
      } else if(hour >= 18) {
        msg = "Night medication is taken";
      }

      $cordovaLocalNotification.clearAll();
      $cordovaLocalNotification.schedule({
          id: "TestSchedule",
          date: alarmTime,
          title: "Pill Taken Notification",
          text: msg
      }).then(function () {
          console.log("The notification has been set");
      });
  };

  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    console.log('Token saved:', t.token);
  });

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.getHeaderClass = function() {
    return $rootScope.headerCSS;
  };
})

.controller('PrescriptionCtrl', function($scope, $cordovaBarcodeScanner, Medication) {
  $scope.medications = [];
  for (var i = 1; i <= Medication.getLength(); i++) {
    var medication = {};
    medication.title = Medication.getTitle(i);
    medication.schedule = Medication.getSchedule(i);
    medication.image = Medication.getImage(i);
    medication.id = i;
    $scope.medications.push(medication);
  }

  $scope.scanBarcode = function() {
      speakText("Please scan QR code on dispenser machine.");
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        if(imageData.cancelled) {
          speakText("QR code scan's cancelled.");
        } else {
          speakText("QR code scan's completed.");
        }
      }, function(error) {
          speakText("Error, please try again.");
      });
  };
  var speakText = function(data) {
    alert(data);
    TTS.speak({
         text: data,
         locale: 'en-GB',
         rate: 1.5
     }, function () {
         // Do Something after success
     }, function (reason) {
         // Handle the error case
     });
  };
})

.controller('StatusCtrl', function($scope) {

  $scope.myChartObject = {};

  $scope.myChartObject.type = "PieChart";

  $scope.onions = [
      {v: "Onions"},
      {v: 3},
  ];

  $scope.myChartObject.data = {"cols": [
      {id: "t", label: "Name", type: "string"},
      {id: "s", label: "Count", type: "number"}
  ], "rows": [
      {c: [
          {v: "Taken"},
          {v: 96},
      ]},
      {c: [
          {v: "Late"},
          {v: 2},
      ]},
      {c: [
          {v: "Not-Taken"},
          {v: 2},
      ]}
  ]};

  $scope.myChartObject.options = {
      'is3D': 'true',
      'legend': {position: 'bottom', alignment: 'center' },
      'chartArea': {left:0,top:0,width:'100%',height:'60%'}
  };
})

.controller('ScheduleCtrl', function($scope) {

  var formatDate = function(d1) {
    if(d1.getDate() < 10) {
      return d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-0' + d1.getDate();
    } else {
      return d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
    }
  };

  var today = new Date();
  var day = today.getDay(),
    diff = today.getDate() - day;
  var begin = new Date(today.setDate(diff));

  $scope.eventSources = [];
  $scope.eventSources[0] = {};
  $scope.eventSources[0].color = 'rgb(89, 191, 179)';
  $scope.eventSources[0].textColor = 'white';
  $scope.eventSources[0].events = [];

  for(d = 0; d < 7; d++) {
    for(t = 0; t < 3; t++) {
      var i = 3 * d + t;
      $scope.eventSources[0].events[i] = {};
      $scope.eventSources[0].events[i].title = 'Take Pill';

      var d1 = new Date(begin);
      d1.setDate(d1.getDate() + d);

      var fromTime = '08:00';
      var toTime = '10:00';

      if(t == 1) {
        fromTime = '15:00';
        toTime = '17:00';
      } else if (t == 2) {
        fromTime = '22:00';
        toTime = '24:00';
      }

      $scope.eventSources[0].events[i].start = formatDate(d1) + ' ' + fromTime;
      $scope.eventSources[0].events[i].end = formatDate(d1) + ' ' + toTime;
    }
  }

  $scope.uiConfig = {
      calendar:{
        defaultView: "agendaWeek",
        allDaySlot: false,
        minTime: "06:00:00",
        maxTime: "24:00:00",
        slotDuration: "01:00:00",
        contentHeight: 'auto',
        height: 'parent',
        displayEventTime: false,
        header:{
          left: '',
          center: '',
          right: ''
        }
      }
    };
})

.controller('MeidcationCtrl', function($scope, $stateParams, Medication) {
  $scope.id = $stateParams.medicationId;
  $scope.getImage = Medication.getImage;
  $scope.getTitle = Medication.getTitle;
  $scope.getDesc = Medication.getDesc;
});
