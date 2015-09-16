
var videos = document.getElementById('videos');

var editToolbar = document.querySelector('.edit-toolbar');

editToolbar.addEventListener('click', function() {
  videos.classList.toggle('edit');
});

var cancelButton = document.querySelector('.remove-toolbar .cancel');

cancelButton.addEventListener('click', function cancelClicked() {
  videos.classList.toggle('edit');
});

var removeButton = document.querySelector('.remove-toolbar .remove');

removeButton.addEventListener('click', function() {
  var modal = document.querySelector('.remove-modal');
  modal.classList.toggle('show');
  modal.addEventListener('click', function modalClicked() {
    modal.removeEventListener('click', modalClicked);
    modal.classList.toggle('show');
  });
});