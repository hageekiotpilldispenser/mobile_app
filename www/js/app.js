// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ui.calendar', 'angularMoment', 'pascalprecht.translate'])

  .run(function($ionicPlatform, $rootScope, $timeout) {
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
    $rootScope.$on('$stateChangeSuccess', function(evt, toState) {
      if (toState.headerCSS) {
        $rootScope.headerCSS = toState.headerCSS;
      } else {
        $rootScope.headerCSS = 'bar-positive';
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $translateProvider) {

    $translateProvider.useSanitizeValueStrategy('escaped');

    $translateProvider.translations('en', {
      MENU_NAME: 'Steve Jobs',
      MENU_ITEM_STATUS: 'Status',
      MENU_ITEM_SCHEDULE: 'Schedule',
      MENU_ITEM_PRESCRIPTION: 'Prescription',
      MENU_ITEM_LINK: 'Useful Link',
      MENU_ITEM_SETTING: 'Setting',
      SCHEDULE_NO_EVENT_TXT: 'Please select an event',
      SCHEDULE_APPOINTMENT: 'Follow-up appointment',
      SCHEDULE_APPOINTMENT_DETAILS: 'Virtual Hospital Cardiology 6/F',
      SCHEDULE_MED_IMAGE: 'Image',
      SCHEDULE_MED_NAME: 'Name',
      SCHEDULE_MED_QUATITY: 'Quatity',
      STATUS_RECENT_TXT: 'Recent',
      STATUS_NEXT_MED_TITLE: 'Next Medication',
      STATUS_MORNING_MED_TITLE: 'Morning Medication',
      STATUS_NOON_MED_TITLE: 'Noon Medication',
      STATUS_NIGHT_MED_TITLE: 'Night Medication',
      STATUS_MISSING_MED_TITLE: 'Missing Medication',
      STATUS_TAKEN_MED_TXT: 'Taken medication',
      STATUS_REMIND_TXT: 'Remind him',
      SETTING_LANGUAGE: 'Language',
      SETTING_LANGUAGE_USED: 'English',
      SETTING_ABOUT: 'About',
      SETTING_COPYRIGHT: 'Copyright',
      SETTING_DISCLAIMER: 'Disclaimer',
      SETTING_TERMS: 'Terms of Use',
      SETTING_VERSION: 'Version',
      PRESCRIPTION_3_TIMES: '(3 times/day, 1 tab/time)',
      PRESCRIPTION_2_TIMES: '(2 times/day, 1 tab/time)',
      PRESCRIPTION_1_TIMES: '(1 time/day, 1 tab/time)',
      MED1_DESC: '<h3>Uses</h3><p>Eclipse is used to treat high blood pressure (hypertension). Lowering high blood pressure helps prevent strokes, heart attacks, and kidney problems. It is also used to treat heart failure, protect the kidneys from harm due to diabetes, and to improve survival after a heart attack.</p>' +
        '<h3>Side Effect</h3><p>Dizziness, lightheadedness, or loss of taste may occur as your body adjusts to the medication. Dry cough may also occur. If any of these effects persist or worsen, tell your doctor or pharmacist promptly.</p>' +
        '<h3>Precautions</h3><p>This drug may make you dizzy. Do not drive, use machinery, or do any activity that requires alertness until you are sure you can perform such activities safely. Limit alcoholic beverages.</p>',
      MED2_DESC: '<h3>Uses</h3><p>Tictac is used to treat high blood pressure (hypertension). Lowering high blood pressure helps prevent strokes, heart attacks, and kidney problems. Candesartan belongs to a class of drugs called angiotensin receptor blockers (ARBs). It works by relaxing blood vessels so blood can flow more easily.</p>' +
        '<h3>Side Effect</h3><p>Dizziness, tiredness, or lightheadedness may occur as your body adjusts to the medication. Runny nose or sore throat may also occur. If any of these effects persists or worsens, tell your doctor or pharmacist promptly.</p>' +
        '<h3>Precautions</h3><p>This drug may make you dizzy. Do not drive, use machinery, or do any activity that requires alertness until you are sure you can perform such activities safely. Limit alcoholic beverages.</p>',
      MED3_DESC: '<h3>Uses</h3><p>Seirogan is used to reduce extra fluid in the body (edema) caused by conditions such as heart failure, liver disease, and kidney disease. This can lessen symptoms such as shortness of breath and swelling in your arms, legs, and abdomen. Bumetanide is a "water pill" (diuretic) that causes you to make more urine. This helps your body get rid of extra water and salt.</p>' +
        '<h3>Side Effect</h3><p>This medication may cause a serious loss of body water (dehydration) and salt/minerals. Tell your doctor right away if you have any of these unlikely but serious side effects: muscle cramps, weakness, unusual tiredness, confusion, severe dizziness, fainting, drowsiness, unusual dry mouth/thirst, nausea, vomiting, fast/irregular heartbeat.</p>' +
        '<h3>Precautions</h3><p>This drug may make you dizzy. Do not drive, use machinery, or do any activity that requires alertness until you are sure you can perform such activities safely. Limit alcoholic beverages.</p>',
      DISCLAIMER_TEXT: 'The information (including health information) provided in this mobile app is for general educational purposes and reference only. Whilst efforts will be made to ensure its accuracy, no guarantee can be provided. Individuals should consult their own doctors for any medical condition that they may have, rather than relying on the information provided in this mobile app.',
      TERMS_TEXT: 'The organization may make changes to any information on this mobile app including the Terms of Use at any time as it sees fit. By your accessing and/or using this mobile app, you agree to the Terms of Use, which may be amended from time to time without prior notice. If you do not agree to the Terms of Use, please do not access and/or use this mobile app. You are advised to check the Terms of Use every time you use this mobile app.',
      COPYRIGHT_TEXT: 'Unless otherwise indicated, all copyright and other intellectual property rights in the contents on this mobile app including all texts, graphics, videos, audio clips, drawings, diagrams, photographs, compilation of data, layout, and any other materials, belong to the organization absolutely.',
      ABOUT_TEXT: 'This mobile app provides useful drug-related informtion. This mobile app shows prescription and allows you to check medication status whereever you are. This mobile app can notify you as soon as the medication is taken.'
    });

    $translateProvider.translations('zh-tw', {
      MENU_NAME: '史蒂夫',
      MENU_ITEM_STATUS: '最新狀態',
      MENU_ITEM_SCHEDULE: '時間表',
      MENU_ITEM_PRESCRIPTION: '藥方',
      MENU_ITEM_LINK: '有用連結',
      MENU_ITEM_SETTING: '設定',
      SCHEDULE_NO_EVENT_TXT: '請選擇事件',
      SCHEDULE_APPOINTMENT: '覆診',
      SCHEDULE_APPOINTMENT_DETAILS: '虛擬醫院 心臟科 6樓',
      SCHEDULE_MED_IMAGE: '圖片',
      SCHEDULE_MED_NAME: '名稱',
      SCHEDULE_MED_QUATITY: '數量',
      STATUS_RECENT_TXT: '最近',
      STATUS_NEXT_MED_TITLE: '下次服藥',
      STATUS_MORNING_MED_TITLE: '早上服藥',
      STATUS_NOON_MED_TITLE: '中午服藥',
      STATUS_NIGHT_MED_TITLE: '晩間服藥',
      STATUS_MISSING_MED_TITLE: '忘記服藥',
      STATUS_TAKEN_MED_TXT: '已服藥',
      STATUS_REMIND_TXT: '提醒他',
      SETTING_LANGUAGE: '語言',
      SETTING_LANGUAGE_USED: '繁體中文',
      SETTING_ABOUT: '關於',
      SETTING_COPYRIGHT: '版權及知識產權',
      SETTING_DISCLAIMER: '免責聲明',
      SETTING_TERMS: '使用條款',
      SETTING_VERSION: '版本',
      PRESCRIPTION_3_TIMES: '(每日3次, 每次1粒)',
      PRESCRIPTION_2_TIMES: '(每日2次, 每次1粒)',
      PRESCRIPTION_1_TIMES: '(每日1次, 每次1粒)',
      MED1_DESC: '<h3>藥物作用</h3><p>主治高血壓(血壓偏高)。預防中風，心臟病發作及腎臟等問題。</p>' +
        '<h3>副作用</h3><p>持續乾咳、頭暈、皮膚癢或紅疹、發燒、腹瀉、食慾差、噁心、疲倦。</p>' +
        '<h3>注意事項</h3><p>此藥可使人昏昏欲睡，如服後有此情況，不得駕駛或操作機械。藥物不應與酒精類飲品同服。</p>',
      MED2_DESC: '<h3>藥物作用</h3><p>抑制血管張力素和受體(Receptor)的作用﹑使血管平滑肌收縮的作用降低﹑使血管適當的擴張﹑而達到降血壓的目的。</p>' +
        '<h3>副作用</h3><p>頭昏 / 暈眩、頭痛。</p>' +
        '<h3>注意事項</h3><p>此藥可使人昏昏欲睡，如服後有此情況，不得駕駛或操作機械。藥物不應與酒精類飲品同服。</p>',
      MED3_DESC: '<h3>藥物作用</h3><p>它可以用來預防高血壓﹑消除身體的水腫，以及預防充血性心衰竭。如果體內含過多的水分，將會增加血管內部的壓力，造成水腫或高血壓，最後心臟可能會因為長久的負荷，而產生心衰竭。此藥的作用，就是能夠幫助腎臟，將體內多餘的水分經由尿液排出，而達到治療的目的。</p>' +
        '<h3>副作用</h3><p>服用此藥後，可能會產生頭暈目眩的副作用，尤其剛開始服藥期間。</p>' +
        '<h3>注意事項</h3><p>此藥可使人昏昏欲睡，如服後有此情況，不得駕駛或操作機械。藥物不應與酒精類飲品同服。</p>',
      DISCLAIMER_TEXT: '本流動應用程式提供的資料(包括健康資訊)僅擬作為一般教育用途及參考之用。我們會力求資料準確，但無法作出保證。你如果有任何醫療問題，應向自己的醫生查詢，而不應單單倚賴本流動應用程式提供的資料。',
      TERMS_TEXT: '本機構可在有需要時，隨時更改流動應用程式內的任何資訊，包括本使用條款內容。如閣下進入本流動應用程式，即表示閣下同意本用條款(條款可隨時作更改而不事先作出通知)。如閣下不同意本使用條款，請不要進入及／或使用本流動應用程式。 閣下宜每次使用本流動應用程式時查閱本使用條款。',
      COPYRIGHT_TEXT: '除特別指明外，所有本流動應用程式內容的版權及知識產權包括所有文字、圖片、影片、錄音、繪圖、圖表、相片、數據編彙、版面設計及任何其他材料，均全權屬本機構所擁有。',
      ABOUT_TEXT: '本流動應用程式旨在提供藥物有關資訊。本流動應用程式可顯示藥方及服藥情況，讓你無論身處何地亦可查詢病人的服藥資訊。本流動應用程式可在病人服藥時通知你'
    });

    $translateProvider.preferredLanguage('zh-tw');

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
        headerCSS: 'bar-custom2'
      })

      .state('app.link', {
        url: '/link',
        views: {
          'menuContent': {
            templateUrl: 'templates/link.html',
            controller: 'LinkCtrl'
          }
        },
        headerCSS: 'bar-custom1'
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

      .state('app.schedule', {
        url: '/schedule',
        views: {
          'menuContent': {
            templateUrl: 'templates/schedule.html',
            controller: 'ScheduleCtrl'
          }
        },
        headerCSS: 'bar-custom5'
      })

      .state('app.medication', {
        url: '/medication/:medicationId',
        views: {
          'menuContent': {
            templateUrl: 'templates/medication.html',
            controller: 'MeidcationCtrl'
          }
        },
        headerCSS: 'bar-custom4'
      })

      .state('app.setting', {
        url: '/setting',
        views: {
          'menuContent': {
            templateUrl: 'templates/setting.html',
            controller: 'SettingCtrl'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.language', {
        url: '/language',
        views: {
          'menuContent': {
            templateUrl: 'templates/language.html',
            controller: 'LanguageCtrl'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.copyright', {
        url: '/copyright',
        views: {
          'menuContent': {
            templateUrl: 'templates/copyright.html'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.disclaimer', {
        url: '/disclaimer',
        views: {
          'menuContent': {
            templateUrl: 'templates/disclaimer.html'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.terms', {
        url: '/terms',
        views: {
          'menuContent': {
            templateUrl: 'templates/terms.html'
          }
        },
        headerCSS: 'bar-custom6'
      })

      .state('app.version', {
        url: '/version',
        views: {
          'menuContent': {
            templateUrl: 'templates/version.html'
          }
        },
        headerCSS: 'bar-custom6'
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/status');
  });
