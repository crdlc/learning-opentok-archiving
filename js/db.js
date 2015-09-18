!function(global) {
  'use strict';

  var rootRef = new Firebase('https://ot-archiving.firebaseio.com');

  var videosRef = rootRef.child(Utils.getRoomName() + '/videos');

  var get = function(callback) {
    videosRef.once('value', function onSuccess(snapshot) {
      var value = snapshot.val();
      value && callback(value);
    }, function onError(errorObject) {
      console.log('Error getting videos from DB', errorObject);
      callback({});
    });
  };

  var remove = function(ids) {
    ids = Array.isArray(ids) ? ids : [];
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
