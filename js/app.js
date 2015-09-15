
var edit = document.querySelector('.video-toolbar');

edit.addEventListener('click', function() {
  var videos = document.getElementById('videos');
  videos.classList.toggle('edit');
});