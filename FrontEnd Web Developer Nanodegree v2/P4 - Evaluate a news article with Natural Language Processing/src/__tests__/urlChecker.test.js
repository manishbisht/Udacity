const isValidURL = require("../client/js/urlChecker");

test('The url is valid', () => {
    expect(isValidURL("https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80")).toBeTruthy();
});

test('The url is invalid', () => {
    expect(isValidURL("Invalid URL")).toBeFalsy();
});