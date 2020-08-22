const fp = require("lodash/fp");

let _underscore = fp.replace(/\s+/g, "_"); //无须改动，并在sanitizeNames中使用它

let map = fp.flowRight(_underscore, fp.lowerCase);

let sanitizeNames = fp.map(map);

console.log(sanitizeNames(["Hello World"]));
