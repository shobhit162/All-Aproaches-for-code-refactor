var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.openai.com/v1/engines/refactor/jobs');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer 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');

var code = "int main(){\n  cout << \"Hello World!\";\n  return 0;\n}";

var data = JSON.stringify({
  "prompt": code,
  "max_tokens": 100,
  "temperature": 0.5
});

xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    var response = JSON.parse(xhr.responseText);
    var refractedCode = response.choices[0].text;
    console.log(refractedCode);
  }
};

xhr.send(data);
