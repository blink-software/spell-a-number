
function isFinite(value) {
	return !(typeof value !== 'number' ||
	value !== value || value === Infinity ||
	value === -Infinity);
}

function isFloat(number) {
	return number % 1 !== 0;
}

function parsedAndValid(number) {
	if (!isFinite(parseFloat(number)) || parseFloat(number) != number) {
		throw new TypeError(`Incorrect number provided: ${number}`);
	}
	const num = Math.abs(parseInt(number, 10));

	return num;
}

function getDecimalPart(number) {
	const decimal = Math.abs(number % 1);
	const decimalWords = (decimal.toPrecision(2) * 100).toString() + '/100';

	return decimalWords;
}

function getDecimalIfNeeded(number) {
	if (isFloat(number)) {
		return getDecimalPart(number);
	}

	return null;
}

function getMinusIfNeeded(number) {
	if (number < 0) {
		return 'minus';
	}

	return null;
}

module.exports = {
	parsedAndValid,
	getDecimalIfNeeded,
	getMinusIfNeeded,
};
