import test from 'ava';

const englishSpellingGenerator = require('../src/converters/converter-en');

test('it generates correct string for given number', t => {
	t.is(englishSpellingGenerator(0), 'zero');
	t.is(englishSpellingGenerator(1), 'one');
	t.is(englishSpellingGenerator(12), 'twelve');
	t.is(englishSpellingGenerator(2234), 'two thousand two hundred thirty-four');
	t.is(
		englishSpellingGenerator(27317644),
		'twenty-seven million three hundred seventeen thousand six hundred forty-four',
	);
});

test('it generates decimal fraction if number is not integer', t => {
	t.is(englishSpellingGenerator(0.33), 'zero 33/100');
	t.is(englishSpellingGenerator(2.45), 'two 45/100');
	t.is(englishSpellingGenerator(35.12), 'thirty-five 12/100');
	t.is(englishSpellingGenerator(122.45), 'one hundred twenty-two 45/100');
	t.is(englishSpellingGenerator(1245.689), 'one thousand two hundred forty-five 69/100');
});

test('it generates minus for negative number', t => {
	t.is(englishSpellingGenerator(0), 'zero');
	t.is(englishSpellingGenerator(-5), 'minus five');
	t.is(englishSpellingGenerator(-235), 'minus two hundred thirty-five');
	t.is(englishSpellingGenerator(-3269.75), 'minus three thousand two hundred sixty-nine 75/100');
});

test('should throw error for incorrect (NaN) argument provided', t => {
	t.throws(
		() => {
			englishSpellingGenerator('abc');
		},
		null,
		'Incorrect number provided',
	);
	t.throws(
		() => {
			englishSpellingGenerator('$%!');
		},
		null,
		'Incorrect number provided',
	);
	t.throws(
		() => {
			englishSpellingGenerator('1xas13');
		},
		null,
		'Incorrect number provided',
	);
	t.throws(
		() => {
			englishSpellingGenerator('1234xaf');
		},
		null,
		'Incorrect number provided',
	);
});
