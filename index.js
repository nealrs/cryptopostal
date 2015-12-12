/*

USE THIS SCRIPT TO GENERATE YOUR OWN CRYPTOPOSTAL PAGE.

BTW, DO NOT DISTRIBUTE THIS FILE, COMMIT YOUR ADDRESS TO GIT, OR SHOW PEOPLE YOUR PASSPHRASE ALONG WITH ENCRYPTED DATA. OTHERWISE THIS IS ALL TOTALLY POINTLESS!

*/

//////
var sjcl = require("sjcl");
var m = require ("mustache");
var fs = require('fs');
//////

var name = "Devpost"; // person/org name
var avatar = "img/devpost.png"; // path to headshot
var pass = "jessie5558675309"; // your passphrase (e.g. combo of your name + sanitized phone #)
var testphrase = "f00bar"; // test phrase
var d2 = "433 West 14th Street, Suite 3F<br>New York, NY 10014"; // street address -- leave the <br> in there.
var d3 = "https://www.google.com/maps/place/433+W+14th+St+%233f,+New+York,+NY+10014/data=!4m2!3m1!1s0x89c259c09cab1123:0xa6beacfb13dbfcb1?sa=X&ved=0ahUKEwif3amt8dLJAhUHKx4KHU4HCuMQ8gEIGzAA"; //map link

// encrypted data
e1 = sjcl.encrypt(pass, d1);
e2 = sjcl.encrypt(pass, d2);
e3 = sjcl.encrypt(pass, d3);

// write index.html
fs.readFile('template.html', function (err, data) {
  if (err) throw err;
  var html = m.render(data.toString(), {
    name = name,
    avatar = avatar,
    pass = pass,
    testphrase = testphrase,
    e1 = e1,
    e2 = e2,
    e3 = e3
  });

  fs.writeFile("index.html", html, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("cryptopostal created");
  });
});


/*
// now you can set e1, e2, e3 in index.html
console.log("set e1 in your script to: " + e1+'\n');
console.log("set e2 in your script to: " + e2+'\n');
console.log("set e3 in your script to: " + e3+'\n');

// and the proof is in the pudding!
console.log("and here's your test phrase, decrypted: " + sjcl.decrypt(pass, e1)+'\n');
console.log("and here's your address, decrypted: " + sjcl.decrypt(pass, e2)+'\n');
console.log("and here's your map link, decrypted: " + sjcl.decrypt(pass, e3)+'\n');
*/
