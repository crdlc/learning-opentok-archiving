!function(global) {
  'use strict';

  var get = function() {
    return [
      {
        url: 'https://github.com/nraychaudhuri/html5-rocks/raw/master/code/' +
             'sample_video.ogg',
        timestamp: Date.now() + (3* 24 * 60 * 60 * 1000) + (60 * 1000)
      }, {
        url: 'https://github.com/nraychaudhuri/html5-rocks/raw/master/code/' +
             'sample_video.ogg',
        timestamp: Date.now()
      }, {
        url: 'https://github.com/nraychaudhuri/html5-rocks/raw/master/code/' +
             'sample_video.ogg',
        timestamp: Date.now() - (24 * 60 * 60 * 1000) - (60 * 1000)
      }, {
        url: 'https://github.com/nraychaudhuri/html5-rocks/raw/master/code/' +
             'sample_video.ogg',
        timestamp: Date.now() - (4 * 60 * 60 * 1000)
      }
    ];
  };

  global.DB = {
    get: get
  };

}(this);
