const validUrl = require('valid-url');

function isValidURL(URL) {
    return validUrl.isUri(URL)
}

export { isValidURL }
