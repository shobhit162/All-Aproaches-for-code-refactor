document.getElementById("refactor-button").addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "refactor"}, function(response) {
      console.log(response.result);
    });
  });
});
