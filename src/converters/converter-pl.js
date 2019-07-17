const parsedAndValid = require('../utils').parsedAndValid;
const getDecimalPartIfNeeded = require('../utils').getDecimalIfNeeded;
const getMinuseIfNeeded = require('../utils').getMinusIfNeeded;

const HOUNDREDS = [
	'',
	'sto ',
	'dwieście ',
	'trzysta ',
	'czterysta ',
	'pięćset ',
	'sześćset ',
	'siedemset ',
	'osiemset ',
	'dziewięcset ',
];

const LESS_THAN_TWENTY = [
	'dziesięc ',
	'jedenaście ',
	'dwanaście ',
	'trzynaście ',
	'czternaście ',
	'piętnaście ',
	'szesnaście ',
	'siedemnaście ',
	'osiemnaście ',
	'dziewiętnaście ',
];

const TENTHS = [
	'',
	'dziesięć ',
	'dwadzieścia ',
	'trzydzieści ',
	'czterdzieści ',
	'pięćdziesiąt ',
	'sześćdziesiąt ',
	'siedemdziesiąt ',
	'osiemdziesiąt ',
	'dziewiecdziesiąt ',
];

const UNITS = [
	'',
	'jeden ',
	'dwa ',
	'trzy ',
	'cztery ',
	'pięć ',
	'sześć ',
	'siedem ',
	'osiem ',
	'dziewięć ',
];

const AMOUNTS = [
	['', 'jeden', '', ''],
	['', 'tysiąc ', 'tysiące ', 'tysięcy '],
	['', 'milion ', 'miliony ', 'milionów '],
	['', 'miliard ', 'miliardy ', 'miliardów '],
	['', 'bilion ', 'biliony ', 'bilionów '],
	['', 'biliard ', 'biliardy ', 'biliardów '],
	['', 'trylion ', 'tryliony ', 'trylionów '],
	['', 'tryliard ', 'tryliardy ', 'tryliardów '],
	['', 'kwadrylion ', 'kwadryliony ', 'kwadrylionów '],
];

// Generate updated spelling string and id for AMOUNT
function updateStringAndGetAmountID(houndreds, tenths, units, currentString) {
	let id;

	if (!tenths && !houndreds) {
		if (units === 0) id = 0;
	}

	if (HOUNDREDS[houndreds]) currentString = currentString + HOUNDREDS[houndreds];

	if (tenths == 1 && LESS_THAN_TWENTY[units]) {
		currentString = currentString + LESS_THAN_TWENTY[units];
	} else {
		if (TENTHS[tenths]) currentString = currentString + TENTHS[tenths];
		if (UNITS[units]) currentString = currentString + UNITS[units];
	}

	if (tenths !== 1 && units >= 2 && units <= 4) {
		id = 2;
	} else {
		id = 3;
	}

	return {
		amountID: id,
		updatedString: currentString,
	};
}

function generateWords(number) {
	let amount = 0;
	let words = '';
	let digits = [];
	let i;
	let tmp;
	let num;
	try {
		num = parsedAndValid(number).toString();
	} catch (error) {
		throw error;
	}

	amount = num.length;

	for (i = 0; i <= amount; i++) {
		tmp = num[i] - '0';
		if (tmp > 9) break;
		digits[amount - i - 1] = tmp;
	}

	if (amount === 1 && digits[0] === 0) {
		words = 'zero';
	} else {
		for (i = parseInt((amount - 1) / 3); i >= 0; i--) {
			const { amountID, updatedString } = updateStringAndGetAmountID(
				digits[3 * i + 2],
				digits[3 * i + 1],
				digits[3 * i],
				words,
			);
			words = updatedString + AMOUNTS[i][amountID];
		}
	}

	words = words.trim();

	const decimalPart = getDecimalPartIfNeeded(number);
	words = decimalPart ? words + ' ' + decimalPart : words;

	const minus = getMinuseIfNeeded(number);
	words = minus ? minus + ' ' + words : words;

	return words;
}

module.exports = generateWords;
