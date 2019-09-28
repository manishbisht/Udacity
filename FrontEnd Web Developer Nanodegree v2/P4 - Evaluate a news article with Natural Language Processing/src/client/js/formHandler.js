const { fetch } = require('whatwg-fetch');
const isValidURL = require('./urlChecker');

function handleSubmit(URL) {
    // check that the given URL is valid
    if (URL && isValidURL(URL)) {
        fetch('http://localhost:8080/test/' + encodeURIComponent(URL))
            .then(res => res.json())
            .then(function (res) {
                let response = res.message;
                console.log(response)
                document.querySelector('section.url-results #polarity').innerHTML = response.polarity
                document.querySelector('section.url-results #subjectivity').innerHTML = response.subjectivity
                document.querySelector('section.url-results #polarity_confidence').innerHTML = response.polarity_confidence
                document.querySelector('section.url-results #subjectivity_confidence').innerHTML = response.subjectivity_confidence
                document.querySelector('section.url-results #excerpt').innerHTML = response.text
            })
        return true;
    } else {
        let resultElement = document.getElementById('results')
        if (resultElement) {
            resultElement.innerHTML = "Please enter valid URL"
        }
        console.log("Please enter valid URL");
        return false;
    }
}

module.exports = handleSubmit;
