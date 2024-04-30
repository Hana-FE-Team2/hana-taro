function removeAllEventListeners() {
  // This will remove all event handlers bound with jQuery on the body and its children
  $("body").find("*").off(); // Adjust selector as needed for more specific elements
}

function removeAllScripts() {
  $("script").each(function () {
    $(this).remove();
  });
}

function loadScripts(scripts) {
  scripts.each(function () {
    var src = this.src;
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
  });
}

function loadNextContent(nextPage) {
  var overlay = $("<div>")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: 0,
      zIndex: 10000,
    })
    .appendTo("body");

  overlay.animate({ opacity: 1 }, 2000, function () {
    $.get(nextPage, function (data) {
      saveAudioWithStorage();
      // Remove all existing event listeners to prevent duplicates
      removeAllEventListeners();

      var tempDiv = $("<div>").html(data);
      var scripts = tempDiv.find("script").remove();
      $("body").html(tempDiv.html());

      var tempDiv = $("<div>").html(data);
      var scripts = tempDiv.find("script").remove();

      overlay.animate({ opacity: 1 }, 2000, function () {
        overlay.remove();
      });

      $("body").html(tempDiv.html());

      removeAllScripts();

      loadScripts(scripts);
    });
  });
}

function playAudioWithStorage() {
  let audio = $("#background-sound")[0];

  // 이전 페이지에서 저장된 오디오 재생 위치를 가져옵니다.
  let savedTime = localStorage.getItem("audioTime");

  // 이전 페이지에서 저장된 재생 위치가 있을 경우, 해당 위치로 이동합니다.
  if (savedTime !== null) {
    audio.currentTime = parseFloat(savedTime);
  } else {
    audio.currentTime = parseFloat(0.00001);
  }
}

function saveAudioWithStorage() {
  let audio = $("#background-sound")[0];
  localStorage.setItem("audioTime", audio.currentTime.toString());
}
