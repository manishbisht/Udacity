const handleSubmit = require("../client/js/formHandler");

test('Form is submitted when the URL is valid', () => {
    expect(handleSubmit("https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80")).toBeTruthy();
});

test('Form is not submitted when the URL is invalid', () => {
    expect(handleSubmit("Invalid URL")).toBeFalsy();
});
