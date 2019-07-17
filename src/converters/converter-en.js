const parsedAndValid = require('../utils').parsedAndValid;
const getDecimalPartIfNeeded = require('../utils').getDecimalIfNeeded;
const getMinuseIfNeeded = require('../utils').getMinusIfNeeded;

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;
const ONE_TRILLION = 1000000000000;
const ONE_QUADRILLION = 1000000000000000;
const MAX = 9007199254740992;

const LESS_THAN_TWENTY = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
];

const TENTHS_LESS_THAN_HUNDRED = [
	'zero',
	'ten',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
];

function generateWords(number) {
	let remainder, word;

	// Arguments provided after first run
	let words = arguments[1];
	let initialNumber = arguments[2];

	// We’re done
	if (number === 0) {
		if (!words) {
			words = 'zero';
			initialNumber = number;
		} else {
			words = words.join(' ').replace(/,$/, '');
		}

		const decimalPart = getDecimalPartIfNeeded(initialNumber);
		words = decimalPart ? words + ' ' + decimalPart : words;

		const minus = getMinuseIfNeeded(initialNumber);
		words = minus ? minus + ' ' + words : words;

		return words;
	}

	// First run
	if (!words) {
		initialNumber = number;
		words = [];

		try {
			number = parsedAndValid(number);
		} catch (err) {
			throw err;
		}
	}

	if (number < 20) {
		remainder = 0;
		word = LESS_THAN_TWENTY[number];
	} else if (number < ONE_HUNDRED) {
		remainder = number % TEN;
		word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
		// In case of remainder, we need to handle it here to be able to add the “-”
		if (remainder) {
			word += '-' + LESS_THAN_TWENTY[remainder];
			remainder = 0;
		}
	} else if (number < ONE_THOUSAND) {
		remainder = number % ONE_HUNDRED;
		word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';
	} else if (number < ONE_MILLION) {
		remainder = number % ONE_THOUSAND;
		word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand';
	} else if (number < ONE_BILLION) {
		remainder = number % ONE_MILLION;
		word = generateWords(Math.floor(number / ONE_MILLION)) + ' million';
	} else if (number < ONE_TRILLION) {
		remainder = number % ONE_BILLION;
		word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion';
	} else if (number < ONE_QUADRILLION) {
		remainder = number % ONE_TRILLION;
		word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion';
	} else if (number <= MAX) {
		remainder = number % ONE_QUADRILLION;
		word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion';
	}

	words.push(word);

	return generateWords(remainder, words, initialNumber);
}

module.exports = generateWords;
