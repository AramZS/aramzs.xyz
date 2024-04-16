// const contrast = require("get-contrast");
const contrast = require('get-contrast')

window.contrast = contrast;

console.log('contrast test', contrast.ratio("#fafafa", "rgba(0,0,0,.75)"));
