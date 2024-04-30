function removeAllEventListeners() {
  $('body').find('*').off();
}

function removeAllScripts() {
  $('script').each(function () {
    $(this).remove();
  });
}

function loadScripts(scripts) {
  scripts.each(function () {
    var src = this.src;
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
  });
}

function loadNextContent(nextPage) {
  var overlay = $('<div>')
    .css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: 0,
      zIndex: 10000,
    })
    .appendTo('body');

  overlay.animate({ opacity: 1 }, 2000, function () {
    $.get(nextPage, function (data) {
      removeAllEventListeners();

      var tempDiv = $('<div>').html(data);
      var scripts = tempDiv.find('script').remove();

      overlay.animate({ opacity: 1 }, 2000, function () {
        overlay.remove();
      });

      $('body').html(tempDiv.html());

      removeAllScripts();

      loadScripts(scripts);
    });
  });
}
