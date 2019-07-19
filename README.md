# spellit

Spell numbers in Polish and English both via CLI and in JavaScript.

# Installation

```bash
$ npm install spellit

# or

$ yarn add spellit

# if you also want the CLI version

$ npm i -g spellit

# or

$ yarn global add spellit
```

# Basic Usage

### CLI

```bash
$ spellit <number> [en/pl] # english by default
```

### JavaScript

```js
const spellit = require('spellit');

const polishCoverter = spellit('pl');
const englishConverter = spellit('en');

console.log(polishCoverter(256)); // dwieście pięćdziesiąt sześć
console.log(englishConverter(256)); // two hundred fifty-six
```

# Tests

```bash
$ npm install
$ npm link
$ npm test
```

# Credits

`spellit` is a rewrite of both [number-to-words](https://github.com/marlun78/number-to-words) for the English converter and [slownie.js](https://github.com/exu/slownie.js/blob/master/lib/slownie.js) for the Polish converter.

# License

ISC
