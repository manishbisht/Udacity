const handleSubmit = require("../client/js/formHandler");

document.getElementById('processURLButton').addEventListener('click', () => {
    let URL = document.getElementById('url').value;
    handleSubmit(URL)
});

