/*

Use this script to create your own cryptopostal page. Edit the variables below, run `node cryptopostal.js`, and copy all the files (except this one) over to your webhost.

BTW, DO NOT DISTRIBUTE THIS FILE, COMMIT YOUR UNENCRYPTED ADDRESS TO GIT, OR SHOW PEOPLE YOUR PASSPHRASE -- OTHERWISE THIS IS ALL TOTALLY POINTLESS!

@nealrs 2015

*/

var name = "Doofus"; // person name
var avatar = "https://media.giphy.com/media/RFdqSN1xVYJkA/giphy.gif"; // path to headshot (local or remote)
var q1 = "Sting's crush:"; // first question (should be a name)
var q2 = "Jenny's number:"; // second question (should be a numeric string (no spaces/non numeric characters))
var pass = "roxanne8675309"; // your passphrase (e.g. combo of your name + sanitized phone #)
var d1 = "sup3rs3kr1t"; // test phrase
var d2 = "1060 W Addison St.<br>Chicago, IL 60613"; // street address -- leave the <br> in there.
var d3 = "https://www.google.com/maps/place/Wrigley+Field/@41.9484384,-87.6553327,15z/data=!4m2!3m1!1s0x0:0x1cea3ee176ddd646?sa=X&ved=0ahUKEwjBoIy_tNXJAhXFpB4KHY0YCcYQ_BIIhQEwCw"; //map link


/*

DON'T EDIT ANYTHING BELOW

*/

var sjcl = require("sjcl");
var m = require ("mustache");
var fs = require('fs');

// encrypted data
e1 = sjcl.encrypt(pass, d1);
e2 = sjcl.encrypt(pass, d2);
e3 = sjcl.encrypt(pass, d3);

// render template
fs.readFile('template.html', function (err, data) {
  if (err) throw err;
  var html = m.render(data.toString(), {
    name : name,
    avatar : avatar,
    q1 : q1,
    q2 : q2,
    pass : pass,
    testphrase : d1,
    e1 : e1,
    e2 : e2,
    e3 : e3
  });

  // save to disk (index.html)
  fs.writeFile("index.html", html, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("cryptopostal created");
  });
});
