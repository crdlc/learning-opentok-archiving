!function(global) {
  'use strict';

  var rootRef = new Firebase('https://ot-archiving.firebaseio.com');

  var get = function(callback) {
    var videosRef = rootRef.child('videos');

    videosRef.once('value', function onSuccess(snapshot) {
      callback(snapshot.val());
    }, function onError(errorObject) {
      console.log('Error getting videos from DB', errorObject);
      callback({});
    });
  };

  var remove = function(ids) {
    ids = Array.isArray(ids) ? ids : [];
    var videosRef = rootRef.child('videos');
    ids.forEach(function(id) {
      var video = videosRef.child(id);
      video && video.remove();
    });
  };

  global.DB = {
    get: get,
    remove: remove
  };

}(this);
