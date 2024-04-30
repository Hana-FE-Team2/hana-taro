$(document).ready(function () {
  let nextButtonClickCount = 0;
  const messageList = $('#messageList li'); // Get the list of messages
  const maxNextButtonClicks = messageList.length; // Set maxNextButtonClicks to the length of the message list

  // Function to open the modal
  function openModal() {
    const modal = $('#modal');
    // Load modal content from /modal.modal.html
    $.get('/modal.modal.html', function (data) {
      // Insert modal content into the modal div
      modal.modal.html(data);
      // Display the first message from the list
      $('#modal-message').text(messageList.eq(0).text());
      modal.fadeIn();
    });
  }

  // Handle click event on the button to open the modal
  $('#openModal').on('click', function () {
    openModal();
    nextButtonClickCount = 0; // Reset the click count when modal is opened
  });

  // Close modal when close button is clicked
  $(document).on('click', '.close-modal', function () {
    $('#modal').fadeOut();
  });

  // Handle click event on the "Next" button inside the modal
  $(document).on('click', '#nextModal', function () {
    // Increment the click count
    nextButtonClickCount++;

    // Change the message inside the modal
    $('#modal-message').text(messageList.eq(nextButtonClickCount).text());

    // Check if the maximum click count has been reached
    if (nextButtonClickCount >= maxNextButtonClicks - 1) {
      // Subtract 1 to account for array indexing
      // Delay closing the modal by 2 seconds
      setTimeout(function () {
        $('#modal').fadeOut();
      }, 500);
    }
  });
});

$(document).ready(function () {
  // Function to load content from next.html
  function loadNextContent() {
    $.get('next.html', function (data) {
      // Replace the content of the body with the content from next.html
      $('body').html(data);
    });
  }

  // Handle click event on the "next" button
  $('#nextButton').on('click', function () {
    loadNextContent();
  });
});

$(document).ready(function () {
  // Function to load content from next.html
  function moveToHome() {
    $.get('hanat-01.html', function (data) {
      // Replace the content of the body with the content from next.html
      $('body').html(data);
    });
  }

  // Handle click event on the "next" button
  $('#moveToHome').on('click', function () {
    moveToHome();
  });
});
