function refactorCode(){
        // Make the API call to OpenAI
        const selectedCodeText = "int a=0; b=0; cout<<a+b;"
        fetch("https://api.openai.com/v1/engines/refactor/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
          },
          body: JSON.stringify({
            "model": "refactor",
            "prompt": selectedCodeText,
            "temperature": 0.5
          })
        })
        .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            }) 
          .catch(function(error) {
            console.error("Error refactoring code:", error);
          });          
  
        }
        refactorCode();