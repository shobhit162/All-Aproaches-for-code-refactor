document.addEventListener("DOMContentLoaded", function() {
    const refactorButton = document.getElementById("refactor-button");
  
    refactorButton.addEventListener("click", function() {
      // Get the selected code
      chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
      }, function(selectedCode) {
        if (!selectedCode || !selectedCode.length) {
            console.error("No code selected");
            return;
          }
        // Make the API call to OpenAI
        fetch("https://api.openai.com/v1/engines/refactor/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <API_KEY>"
          },
          body: JSON.stringify({
            "model": "refactor",
            "prompt": selectedCode[0],
            "temperature": 0.5
          })
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            // Replace the selected code with the generated code
            chrome.tabs.executeScript({
              code: `
                var selection = window.getSelection();
                var range = selection.getRangeAt(0);
                var textNode = document.createTextNode("${data.choices[0].text}");
                range.deleteContents();
                range.insertNode(textNode);
              `
            });
          })
          .catch(function(error) {
            console.error("Error refactoring code:", error);
          });
      });
    });
  });
  