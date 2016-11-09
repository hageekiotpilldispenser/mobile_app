angular.module('starter.controllers', ['ionic.cloud'])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $ionicPush) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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

.controller('PrescriptionCtrl', function($scope) {
  $scope.medications = [
    { title: 'Captopril 25mg (3 times/day)', id: 1 },
    { title: 'Candesartan 2mg (2 times/day)', id: 2 },
    { title: 'Bumetanide 1mg (1 times/day)', id: 3 },
    { title: 'Metformina 500mg (2 times/day)', id: 4 },
    { title: 'Gliquidone 30mg (3 times/day)', id: 5 }
  ];
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
          'title': 'Medication Taken (This Month)',
          'is3D': 'true',
          'legend': {position: 'bottom', alignment: 'start' }
      };
})

.controller('MeidcationCtrl', function($scope, $stateParams) {
});
