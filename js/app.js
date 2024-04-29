// function loadNextContent(nextPage) {
//   $.get(nextPage, function (data) {
//     $('body').html(data);
//   });
// }
function removeAllEventListeners() {
  // This will remove all event handlers bound with jQuery on the body and its children
  $('body').find('*').off(); // Adjust selector as needed for more specific elements
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
  $.get(nextPage, function (data) {
    // Remove all existing event listeners to prevent duplicates
    removeAllEventListeners();

    var tempDiv = $('<div>').html(data);
    var scripts = tempDiv.find('script').remove();
    $('body').html(tempDiv.html());

    // It might be prudent to rebind the events or reinitialize scripts here
    removeAllScripts();
    loadScripts(scripts);
  });
}
