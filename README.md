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
$ npm link
$ npm test
```

# License

ISC
