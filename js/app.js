
!function(global) {
  'use strict';

  var init = function() {
    UI.init();

    DB.get(function(result) {
      UI.render(result, true);
    });
  };

  init();

}(this);
