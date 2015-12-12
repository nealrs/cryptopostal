# Cryptopostal

### [Live Demo](http://nealrs.github.io/cryptopostal)

![](http://i.imgur.com/8IyLjQf.gif)


## Wut?

I feel like I'm constantly telling people my mailing address. I wish there was a way to make my address public and easy to find. Then again, I don't want to get tons of spam from people I barely know. So, I'd also need a way to lock out people who don't know much about me.

That's what went through my head last Wednesday when 4 people asked me for my mailing address. So I built Cryptopostal, a secure mailing address distribution system.

## How well do you know me?

If you can spell my middle name and you know my phone number, you can probably figure out / social engineer my address. So that's my acceptance criteria.

## Going crypto

I decided to build a static site / web form that would accept two inputs and if correct, display my address. It took like 10 minutes. But since my address was in the source code, it wasn't secure at all.

I thought about doing a remote database lookup to returning the address (name / phone could be the login / password), but that's a colossal waste of resources just to validate 2 inputs. A static solution would be more efficient.

Then it hit me - crypto! I could encrypt my address, store it in the source code, and decrypt it locally when the proper answers are provided. Supes elegant, no?

### Here's how I did it

I used the Stanford JavaScript Crypto Library (SJCL) to encrypt my data because it's small, works locally in the browser or node. It also has a super simple API.

Using the correct answers [name+phone] as my passphrase, I encrypted three strings and stored them as JS variables:

- `e1`, a random string of characters ~ `sup3rs3kr1t` - this could be any random string of characters.
- `e2`, the address (br is optional / for line breaking) ~`1060 W Addison St.<br>Chicago, IL 60613`
- `e3`, a Google Maps link ~ `https://goo.gl/92pTKS`

When a visitor submits the form, the `checkit()` method does the following:

1. Sanitize and concatenate the name and phone inputs into a passphrase.
2. Decrypt e1 and compare it to the plaintext `sup3rs3kr1t`. If it's a match, our answers are correct.
3a. If step 2 was successful, decrypt e2 &amp; e3, update placeholder HTML elements with those strings, and then unhide the address field.
3b. If step 2 fails, display an error message

[As you can see in my full-on 80s demo, it works pretty well and it's super fun](http://nealrs.github.io/cryptopostal).

## Roll your own

I wrote a generator script in node so you can create your own Cryptopostal page just by filling in a few variables:

1. Clone the repo
2. Run `npm install`
3. Edit variables in `index.js` (name, avatar, q1, q2, pass, d1, d2, d3)
4. Run `node index.js`
5. Upload `index.html` + the `css`, `js`, and `img` directories to you webhost.
6. Do _not_ upload index.js.
