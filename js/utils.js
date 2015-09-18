
!function(global) {
  'use strict';

  var getRoomName = function() {
    var roomName = window.location.hash;

    if (roomName) {
      roomName = roomName.substring(1);
    }

    return roomName;
  };

  global.Utils = {
    getRoomName: getRoomName
  };

}(this);
