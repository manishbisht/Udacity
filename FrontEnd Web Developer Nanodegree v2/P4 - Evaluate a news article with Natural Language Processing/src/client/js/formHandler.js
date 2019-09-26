import {isValidURL} from './urlChecker'

function handleSubmit() {
    // check that the given URL is valid
    let URL = document.getElementById('url').value

    if (URL && isValidURL(URL)) {
        fetch('http://localhost:8080/test/' + encodeURIComponent(URL))
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('results').innerHTML = JSON.stringify(res.message)
            })
    } else {
        alert("Please enter valid URL")
    }
}

export {handleSubmit}
