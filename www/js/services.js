angular.module('starter.services', [])

.factory('Medication', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var medication = [{
    id: 1,
    image: 'img/captopril_25mg.jpg',
    title: 'Captopril 25mg',
    desc: 'Captopril is used to treat high blood pressure (hypertension), congestive heart failure, kidney problems caused by diabetes, and to improve survival after a heart attack.',
    schedule: '(3 times/day)'
  }, {
    id: 2,
    image: 'img/candesartan_4mg.jpg',
    title: 'Candesartan 4mg',
    desc: 'Treating high blood pressure alone or with other medicines. It is used in certain patients to treat heart failure. It may also be used for other conditions as determined by your doctor. Candesartan is an angiotensin II receptor blocker (ARB). It works by relaxing blood vessels. This helps to lower blood pressure.',
    schedule: '(2 times/day)'
  }, {
    id: 3,
    image: 'img/bumetanide_1mg.jpg',
    title: 'Bumetanide 1mg',
    desc: 'Treating swelling caused by excess body water associated with heart failure or kidney or liver disease. It may also be used for other conditions as determined by your doctor. Bumetanide is a loop diuretic. It works by forcing the kidney to eliminate sodium, potassium, and water.',
    schedule: '(1 time/day)'
  }, {
    id: 4,
    image: 'img/glucophage_500mg.jpg',
    title: 'Glucophage 500mg',
    desc: 'Glucophage (metformin) is an oral diabetes medicine that helps control blood sugar levels. Glucophage is used to improve blood sugar control in people with type 2 diabetes. Glucophage is sometimes used in combination with insulin or other medications, but metformin is not for treating type 1 diabetes.',
    schedule: '(2 times/day)'
  }];

  return {
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
});
