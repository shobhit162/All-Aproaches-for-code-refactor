// listens for selected text on the page and sends a message to background.js
document.addEventListener("mouseup", function(event){
    var selectedText = window.getSelection().toString();
    if(selectedText.length > 0){
        chrome.runtime.sendMessage({selectedCode: selectedText}, function(response) {
        });
    }
});
