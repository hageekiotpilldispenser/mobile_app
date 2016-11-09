// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'googlechart'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
    console.log('stateChangeSuccess');
    if (toState.headerCSS) {
      $rootScope.headerCSS = toState.headerCSS;
    } else {
      $rootScope.headerCSS = 'bar-positive';
    }
    console.log($rootScope.headerCSS);
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicCloudProvider) {

  $ionicCloudProvider.init({
    "core": {
      "app_id": "d7097460"
    },
    "push": {
      "sender_id": "778237935297",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.status', {
    url: '/status',
    views: {
      'menuContent': {
        templateUrl: 'templates/status.html',
        controller: 'StatusCtrl'
      }
    },
    headerCSS: 'bar-custom1'
  })

  .state('app.setting', {
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'templates/setting.html'
        }
      },
      headerCSS: 'bar-custom2'
    })
    .state('app.prescription', {
      url: '/prescription',
      views: {
        'menuContent': {
          templateUrl: 'templates/prescription.html',
          controller: 'PrescriptionCtrl'
        }
      },
      headerCSS: 'bar-custom3'
    })

  .state('app.single', {
    url: '/medication/:medicationId',
    views: {
      'menuContent': {
        templateUrl: 'templates/medication.html',
        controller: 'MeidcationCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/status');
});
