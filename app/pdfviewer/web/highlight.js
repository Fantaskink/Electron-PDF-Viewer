document.addEventListener('DOMContentLoaded', function() {
    let highlightButton = document.getElementById('highlightText');

    highlightButton.addEventListener('click', highlight);
  });
  

function highlight() {

      var event = document.createEvent('CustomEvent');
      event.initCustomEvent('find', true, true, {
        query: "Paul Owen",
        caseSensitive: true,
        highlightAll: true,
      });
      return window.dispatchEvent(event);

}