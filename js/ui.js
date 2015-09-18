!function(global) {
  'use strict';

  var init = function() {
    setRoomName(Utils.getRoomName());
    addToolbarHandlers();
    addListHandler();
  };

  var setRoomName = function(roomName) {
    var element = document.getElementById('roomName');
    element.textContent = roomName;
  };

  var addListHandler = function() {
    var list = document.querySelector('.video-list-content');

    list.addEventListener('click', function(e) {
      var player = document.querySelector('#player');
      var url = e.target.dataset.url;
      url && (player.src = e.target.dataset.url);
    });
  };

  var toggleEdition = function() {
    var videos = document.getElementById('videos');
    videos.classList.toggle('edit');
  };

  var removeItems = function() {
    var items = document.querySelectorAll('.video-list-content input:checked');

    if (items.length === 0) {
      return;
    }

    var modal = document.querySelector('.remove-modal');
    var dismissButton = modal.querySelector('.dismiss');
    var removeButton = modal.querySelector('.remove');

    modal.classList.toggle('show');

    var onClicked = function() {
      dismissButton.removeEventListener('click', onClicked);
      removeButton.removeEventListener('click', onRemoveClicked);
      modal.classList.toggle('show');
    };

    var onRemoveClicked = function() {
      var ids = Array.prototype.map.call(items, function(item) {
        item = item.parentNode.parentNode; // <li> <label> <input>
        var list = item.parentNode;
        list.removeChild(item);

        if (!list.children.length) {
          var header = document.getElementById(list.dataset.belongsTo);
          header && header.parentNode.removeChild(header);
        }

        return item.dataset.id;
      });

      onClicked();
      toggleEdition();
      DB.remove(ids);
    };

    dismissButton.addEventListener('click', onClicked);
    removeButton.addEventListener('click', onRemoveClicked);
  };

  var addToolbarHandlers = function() {
    var editToolbar = document.querySelector('.edit-toolbar');
    editToolbar.addEventListener('click', toggleEdition);

    var cancelButton = document.querySelector('.remove-toolbar .cancel');
    cancelButton.addEventListener('click', toggleEdition);

    var removeButton = document.querySelector('.remove-toolbar .remove');
    removeButton.addEventListener('click', removeItems);
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
    item.dataset.id = video.id;

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
    a.dataset.url = video.url;
    a.textContent = text;

    item.appendChild(label);
    item.appendChild(a);

    return item;
  };

  var renderVideos = function(videos, cleanList) {
    var list = document.querySelector('.video-list-content');

    cleanList && (list.innerHTML = '');

    var sortingDescending = function(a, b) {
      var tA = videos[a].timestamp;
      var tB = videos[b].timestamp;

      return tB - tA;
    };

    var extractVideo = function(id) {
      var video = videos[id];
      video.id = id;
      return video;
    };

    var docFragment = document.createDocumentFragment();

    var lastVideoAdded = null;
    var currentList = null;

    Object.keys(videos)
          .sort(sortingDescending)
          .map(extractVideo)
          .forEach(function(video) {
      if (!isSameCalendarDay(video, lastVideoAdded)) {
        var header = document.createElement('header');
        var id = header.id = 'header-' + video.id;
        header.textContent = getHeaderLabel(video);
        docFragment.appendChild(header);

        currentList = document.createElement('ul');
        currentList.dataset.belongsTo = id;
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
