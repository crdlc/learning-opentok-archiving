!function(global) {
  'use strict';

  var get = function(callback) {
    var ref = new Firebase('https://opentok-recordings.firebaseio.com/videos');

    ref.once('value', function onSuccess(snapshot) {
      callback(snapshot.val());
    }, function onError(errorObject) {
      console.log('Error getting videos from DB', errorObject);
      callback([]);
    });
  };

  global.DB = {
    get: get
  };

}(this);
