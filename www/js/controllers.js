angular.module('starter.controllers', ['angularMoment', 'ngSanitize', 'btford.socket-io'])

  .controller('AppCtrl', function($rootScope, $scope, $ionicModal, $ionicPopup, socket) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.getHeaderClass = function() {
      return $rootScope.headerCSS;
    };
    // An alert dialog
    var showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Notification',
        template: 'Medication is taken.'
      });
      alertPopup.then(function(res) {});
    };

    socket.on('taken', function(data) {
      showAlert();
    });
  })

  .controller('PrescriptionCtrl', function($scope, Medication) {
    $scope.medications = [];
    for (var i = 1; i <= Medication.getLength(); i++) {
      var medication = {};
      medication.title = Medication.getTitle(i);
      medication.schedule = Medication.getSchedule(i);
      medication.image = Medication.getImage(i);
      medication.id = i;
      $scope.medications.push(medication);
    }
  })

  .controller('StatusCtrl', function($scope, $http, $timeout, socket, $translate, Medication) {

    moment.locale($translate.use());

    function groupEvent(data) {
      var sorted = _.sortBy(data, 'time').reverse();
      var groups = _.groupBy(sorted, function(item) {
        return moment(item.time).utc().startOf('day').format();
      });

      var dateEvents = [];
      _.each(groups, function(v, k) {
        var dateEvent = {};
        if (moment().startOf('day').add(8, 'H').isSame(k)) {
          dateEvent.title = 'STATUS_RECENT_TXT';
        } else {
          dateEvent.title = moment(k).utc().format('MMMM D, YYYY');
        }
        dateEvent.events = [];
        _.each(v, function(d, n) {
          var event = {};
          var time = moment(d.time).utc();

          var split_afternoon = 12;
          var split_evening = 18;
          var currentHour = parseFloat(time.format("H"));
          if (currentHour >= split_afternoon && currentHour <= split_evening) {
            event.title = "STATUS_NOON_MED_TITLE";
            event.content = "STATUS_TAKEN_MED_TXT";
            event.imageSrc = "img/noon.jpg";
          } else if (currentHour >= split_evening) {
            event.title = "STATUS_NIGHT_MED_TITLE";
            event.content = "STATUS_TAKEN_MED_TXT";
            event.imageSrc = "img/night.jpg";
          } else {
            event.title = "STATUS_MORNING_MED_TITLE";
            event.content = "STATUS_TAKEN_MED_TXT";
            event.imageSrc = "img/morning.jpg";
          }

          if (!d.taken) {
            event.notTaken = true;
            event.title = "STATUS_MISSING_MED_TITLE";
            event.content = "STATUS_REMIND_TXT";
            event.imageSrc = "img/alarm.jpg";
          }
          event.useImage = true;
          event.time = moment(d.time).subtract(8, 'h').toDate();
          dateEvent.events.push(event);
        })

        dateEvents.push(dateEvent);
      });
      return dateEvents;
    }

    $http.get('http://localhost:3000/taken')
      .then(function(response) {
        var data = response.data;
        $scope.dateEvents = groupEvent(data);

        var date = moment().local().format('MMMM D, YYYY');
        var morning = moment().local().hour(8).minute(0).format('LT');
        var noon = moment().local().hour(14).minute(0).format('LT');
        var night = moment().local().hour(20).minute(0).format('LT');

        if ($scope.dateEvents.length > 0) {
          if ($scope.dateEvents[0].events.length % 3 == 1) {
            $scope.nextMedTitle = "(" + date + " " + noon + ")";
            $scope.nextMeds = Medication.getNoonMed();
          } else if ($scope.dateEvents[0].events.length % 3 == 2) {
            $scope.nextMedTitle = "(" + date + " " + night + ")";
            $scope.nextMeds = Medication.getNightMed();
          } else {
            $scope.nextMedTitle = "(" + date + " " + morning + ")";
            $scope.nextMeds = Medication.getMorningMed();
          }
        }
      })

    socket.on('taken', function(data) {
      $http.get('http://localhost:3000/taken')
        .then(function(response) {
          var data = response.data;
          $scope.dateEvents = groupEvent(data);

          var date = moment().local().format('MMMM D, YYYY');
          var morning = moment().local().hour(8).minute(0).format('LT');
          var noon = moment().local().hour(14).minute(0).format('LT');
          var night = moment().local().hour(20).minute(0).format('LT');

          if ($scope.dateEvents.length > 0) {
            if ($scope.dateEvents[0].events.length % 3 == 1) {
              $scope.nextMedTitle = "(" + date + " " + noon + ")";
              $scope.nextMeds = Medication.getNoonMed();
            } else if ($scope.dateEvents[0].events.length % 3 == 2) {
              $scope.nextMedTitle = "(" + date + " " + night + ")";
              $scope.nextMeds = Medication.getNightMed();
            } else {
              $scope.nextMedTitle = "(" + date + " " + morning + ")";
              $scope.nextMeds = Medication.getMorningMed();
            }
          }
        })
    });
  })

  .controller('ScheduleCtrl', function($scope, $translate, Medication) {

    // Replace with your service
    // Some fake testing data
    var formatDate = function(d1) {
      var strDate = (d1.getDate() < 10) ? ('0' + d1.getDate()) : ('' + d1.getDate());
      var strMonth = (d1.getMonth() + 1 < 10) ? ('0' + (d1.getMonth() + 1)) : (d1.getMonth() + 1);
      return d1.getFullYear() + '-' + strMonth + '-' + strDate;
    };

    var today = new Date();
    var day = today.getDay(),
      diff = today.getDate() - day;
    var begin = new Date(today.setDate(diff));

    $scope.eventSources = [];
    $scope.eventSources[0] = {};
    $scope.eventSources[0].color = 'rgba(79, 182, 232, 0.4)';
    $scope.eventSources[0].textColor = 'white';
    $scope.eventSources[0].events = [];

    for (d = 0; d < 7; d++) {
      for (t = 0; t < 3; t++) {
        var i = 3 * d + t;
        var d1 = new Date(begin);
        d1.setDate(d1.getDate() + d);

        $scope.eventSources[0].events[i] = {};

        var fromTime = '08:00';
        var toTime = '10:00';
        $scope.eventSources[0].events[i].title = ' ';
        $scope.eventSources[0].events[i].type = 'Med';

        if (d < day || (d == day && t < 1)) {
          $scope.eventSources[0].events[i].status = 'past';
        }

        if (t == 1) {
          fromTime = '14:00';
          toTime = '16:00';
          $scope.eventSources[0].events[i].title = ' ';
          $scope.eventSources[0].events[i].taken = true;
        } else if (t == 2) {
          fromTime = '20:00';
          toTime = '22:00';
          $scope.eventSources[0].events[i].title = ' ';
        }

        $scope.eventSources[0].events[i].start = formatDate(d1) + ' ' + fromTime;
        $scope.eventSources[0].events[i].end = formatDate(d1) + ' ' + toTime;
      }
    }

    var d1 = new Date(begin);
    d1.setDate(d1.getDate() + 5);

    $scope.eventSources[1] = {};
    $scope.eventSources[1].color = 'rgba(79, 182, 232, 0.4)';
    $scope.eventSources[1].textColor = 'white';
    $scope.eventSources[1].events = [];
    $scope.eventSources[1].events[0] = {};
    $scope.eventSources[1].events[0].title = ' ';
    $scope.eventSources[1].events[0].type = 'Appt';
    $scope.eventSources[1].events[0].start = formatDate(d1) + ' ' + '11:00';
    $scope.eventSources[1].events[0].end = formatDate(d1) + ' ' + '13:00';

    $scope.eventHeader = "SCHEDULE_NO_EVENT_TXT";
    $scope.medImage = "SCHEDULE_MED_IMAGE";
    $scope.medName = "SCHEDULE_MED_NAME";
    $scope.medQuatity = "SCHEDULE_MED_QUATITY";

    $scope.uiConfig = {
      calendar: {
        defaultView: "agendaWeek",
        allDaySlot: false,
        minTime: "07:00:00",
        maxTime: "23:00:00",
        slotDuration: "01:00:00",
        contentHeight: 'auto',
        height: 'parent',
        displayEventTime: false,
        header: {
          left: '',
          center: '',
          right: ''
        },
        eventRender: function(event, element) {
          if (event.type == 'Appt') {
            element.find(".fc-title").after($("<span class=\"fc-event-icons\"></span>")
              .html("<img class=\"icon\" src=\"img/appt_icon.png\" />"));
          } else if (event.status == 'past') {
            element.find(".fc-title").after($("<span class=\"fc-event-icons\"></span>")
              .html("<img class=\"icon\" src=\"img/pill_icon.png\" /><img class=\"icon\" src=\"img/tick.png\" />"));
          } else {
            element.find(".fc-title").after($("<span class=\"fc-event-icons\"></span>")
              .html("<img class=\"icon\" src=\"img/pill_icon.png\" />"));
          }
        },
        eventClick: function(calEvent, jsEvent, view) {
          $scope.eventHeader = moment(calEvent.start).format('LLL');
          $scope.eventDetails = {};
          $scope.apptDetails = null;

          $(".last-selected").css('background-color', 'rgba(79, 182, 232, 0.4)');
          $(".last-selected").removeClass("last-selected");
          $(this).addClass("last-selected");
          $(this).css('background-color', 'rgba(30, 135, 244, 0.8)');

          if (moment(calEvent.start).hour() == 11) {
            $scope.meds = null;
            $scope.apptDetails = "SCHEDULE_APPOINTMENT_DETAILS";
            $scope.eventDetails.title = "SCHEDULE_APPOINTMENT";
          } else if (moment(calEvent.start).hour() == 8) {
            $scope.meds = Medication.getMorningMed();
            $scope.eventDetails.title = "STATUS_MORNING_MED_TITLE";
          } else if (moment(calEvent.start).hour() == 14) {
            $scope.meds = Medication.getNoonMed();
            $scope.eventDetails.title = "STATUS_NOON_MED_TITLE";
          } else if (moment(calEvent.start).hour() == 20) {
            $scope.meds = Medication.getNightMed();
            $scope.eventDetails.title = "STATUS_NIGHT_MED_TITLE";
          }
        }
      }
    };
    $scope.uiConfig.calendar.lang = $translate.use();
  })

  .controller('MeidcationCtrl', function($scope, $stateParams, Medication) {
    $scope.id = $stateParams.medicationId;
    $scope.getImage = Medication.getImage;
    $scope.getTitle = Medication.getTitle;
    $scope.getDesc = Medication.getDesc;
  })

  .controller('SettingCtrl', function($rootScope, $scope, $state) {

    $scope.items = [{
        title: 'SETTING_LANGUAGE',
        subtitle: 'SETTING_LANGUAGE_USED',
        state: 'app.language'
      },
      {
        title: 'SETTING_ABOUT',
        subtitle: '',
        state: 'app.about'
      },
      {
        title: 'SETTING_COPYRIGHT',
        subtitle: '',
        state: 'app.copyright'
      },
      {
        title: 'SETTING_DISCLAIMER',
        subtitle: '',
        state: 'app.disclaimer'
      },
      {
        title: 'SETTING_TERMS',
        subtitle: '',
        state: 'app.terms'
      },
      {
        title: 'SETTING_VERSION',
        subtitle: '',
        state: 'app.version'
      }
    ];
    $scope.showDetail = function(item) {
      if (item.state) {
        $state.go(item.state);
      }
    }
  })
  .controller('LinkCtrl', function($scope) {
    $scope.items = [{
        title: 'Food and Drug Administration',
        url: 'http://www.fda.gov/'
      },
      {
        title: 'Drugs.com',
        url: 'https://www.drugs.com/'
      },
      {
        title: 'Drug Information Portal',
        url: 'https://druginfo.nlm.nih.gov/drugportal/'
      },
      {
        title: 'Medline Plus',
        url: 'https://medlineplus.gov/'
      },
      {
        title: 'Medscape',
        url: 'http://www.medscape.com/'
      }
    ];
    $scope.openWindow = function(item) {
      window.open(item.url, '_blank');
    }
  })
  .controller('LanguageCtrl', function($scope, $translate) {
    $scope.choice = $translate.use();
    $scope.changeLanguage = function(choice) {
      $translate.use(choice);
    }
  });
