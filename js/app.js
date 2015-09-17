
UI.init();
DB.get(function(result) {
  UI.render(result, true);
});
