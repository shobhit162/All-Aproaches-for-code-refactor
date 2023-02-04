chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "refactor") {
      chrome.tabs.executeScript({
        code: `(async function() {
          const selectedCode = window.getSelection().toString();
          const apiKey = 'YOUR_OPENAI_API_KEY';
          const model = 'YOUR_OPENAI_MODEL';
          const url = 'https://api.openai.com/v1/engines/' + model + '/jobs';
          const response = await fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
              "prompt": selectedCode,
              "max_tokens": 100
            })
          });
          const json = await response.json();
          const refactoredCode = json.choices[0].text;
          return refactoredCode;
        })();`
      }, function(result) {
        sendResponse({result: result[0]});
      });
      return true;
    }
  }
);
