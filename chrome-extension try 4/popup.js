// Code to handle right click event and show context menu
chrome.contextMenus.create({
  id: "refactor_code",
  title: "Refactor code",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId == "refactor_code") {
    chrome.tabs.executeScript(
      {
        code: `
            (async function() {
                const selectedCode = window.getSelection().toString();
                const apiKey = '<API Key>';
                const endpoint = 'https://api.openai.com/v1/engines/refactor/jobs';
                const response = await fetch(endpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                  },
                  body: JSON.stringify({
                    "prompt": selectedCode,
                    "max_tokens":100
                  })
                });
                const result = await response.json();
                const refractedCode = result.choices[0].text;
                alert(refractedCode);
            })();
        `
      },
      function(result) {}
    );
  }
});
