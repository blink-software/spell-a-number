# spell-a-number

A package that spells integers and floats in multiple languages. Currently
supported are:

-   Polish
-   English

## Description

This project aims to solve the problem of incomplete implementations of number
spelling, mostly in Polish converters, but we support multiple languages.
The package also handles decimal parts.

Thoroughly tested with many manually and automatically generated test cases that
check whether the most-known edge cases are covered.

Works as a JavaScript module and a terminal command.

## Installation

If you want to be able to use the `spell-a-number` terminal command, install the
package globally.

```bash
$ npm install -g spell-a-number
```

Otherwise, the usual install command is enough.

```bash
$ npm install spell-a-number
```

## Usage

### JavaScript

```js
const converters = require('spell-a-number');

const polishConverter = converters('pl');
const englishConverter = converters('en');

console.log(polishConverter(256)); // "dwieście pięćdziesiąt sześć"
console.log(polishConverter(1001.01)); // "jeden tysiąc jeden 1/100"
console.log(englishConverter(256)); // "two hundred fifty-six"
```

### CLI

```
Usage: spell-a-number [options] <number>

Options:
  -l, --language <language>  a language to spell a number in (pl/en) (default: "en")
  -h, --help                 output usage information
```

Examples:

```bash
$ spell-a-number --language pl 1337 # spells 1337 in Polish

$ spell-a-number -l en 1337 # spells 1337 in English

$ spell-a-number 1337 # spells 1337 in English
```

## Tests

```bash
$ npm install
$ npm link
$ npm test
```

If you want to cleanup the symlink created by `npm link`, run `npm unlink`.

## Credits

`spell-a-number` is a rewrite of:

-   [number-to-words](https://github.com/marlun78/number-to-words) (English)
-   [slownie.js](https://github.com/exu/slownie.js) (Polish)

We have fixed numerous bugs and added a lot of tests.

## License

ISC
