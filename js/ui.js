!function(global) {
  'use strict';

  var init = function() {
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
  };

  var getVideoLabel = function(video) {
    var date = new Date(video.timestamp);

    return 'Video ' + date.getHours() + ':' + date.getMinutes();
  };

  var getHeaderLabel = function(video) {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    var date = new Date(video.timestamp);
    return date.toLocaleString('en-US', options);
  };

  var isSameCalendarDay = function(videoA, videoB) {
    if (!videoA || !videoB) {
      return false;
    }

    var dateA = new Date(videoA.timestamp);
    var dateB = new Date(videoB.timestamp);

    return dateA.getDate() === dateB.getDate() &&
           dateA.getMonth() === dateB.getMonth() &&
           dateA.getFullYear() === dateB.getFullYear();
  };

  var createVideoItem = function(video) {
    var item = document.createElement('li');

    var label = document.createElement('label');
    label.classList.add('tc-checkbox');

    var input = document.createElement('input');
    input.type = 'checkbox';

    var span = document.createElement('span');
    span.dataset.icon = 'check';
    var text = span.textContent = getVideoLabel(video);

    label.appendChild(input);
    label.appendChild(span);

    var a = document.createElement('a');
    a.href = '#';
    a.textContent = text;

    item.appendChild(label);
    item.appendChild(a);

    return item;
  };

  var renderVideos = function(videos, cleanList) {
    var list = document.querySelector('.video-list-content');

    cleanList && (list.innerHTML = '');

    var sortingDescending = function(a, b) {
      var tA = a.timestamp;
      var tB = b.timestamp;

      return tB - tA;
    }

    videos = Array.isArray(videos) ? videos : [];
    videos.sort(sortingDescending);

    var docFragment = document.createDocumentFragment();

    var lastVideoAdded = null;
    var currentList = null;
    videos.forEach(function(video) {
      if (!isSameCalendarDay(video, lastVideoAdded)) {
        var header = document.createElement('header');
        header.textContent = getHeaderLabel(video);
        docFragment.appendChild(header);

        currentList = document.createElement('ul');
        docFragment.appendChild(currentList);
      }

      currentList.appendChild(createVideoItem(video));
      lastVideoAdded = video;
    });

    list.appendChild(docFragment);
  };

  global.UI = {
    init: init,
    render: renderVideos
  };

}(this);
