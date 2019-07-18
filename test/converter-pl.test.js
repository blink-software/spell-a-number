import test from 'ava';

const polishSpellingGenerator = require('../src/converters/converter-pl');

test('it generates correct string for given number', t => {
	t.is(polishSpellingGenerator(0), 'zero');
	t.is(polishSpellingGenerator(1), 'jeden');
	t.is(polishSpellingGenerator(12), 'dwanaście');
	t.is(polishSpellingGenerator(2234), 'dwa tysiące dwieście trzydzieści cztery');
	t.is(
		polishSpellingGenerator(27317644),
		'dwadzieścia siedem milionów trzysta siedemnaście tysięcy sześćset czterdzieści cztery',
	);
});

test('it generates decimal fraction if number is not integer', t => {
	t.is(polishSpellingGenerator(0.33), 'zero 33/100');
	t.is(polishSpellingGenerator(2.45), 'dwa 45/100');
	t.is(polishSpellingGenerator(11), 'jedenaście');
	t.is(polishSpellingGenerator(35.12), 'trzydzieści pięć 12/100');
	t.is(polishSpellingGenerator(101), 'sto jeden');
	t.is(polishSpellingGenerator(111), 'sto jedenaście');
	t.is(polishSpellingGenerator(122.45), 'sto dwadzieścia dwa 45/100');
	t.is(polishSpellingGenerator(1001), 'jeden tysiąc jeden');
	t.is(polishSpellingGenerator(1245.689), 'jeden tysiąc dwieście czterdzieści pięć 69/100');
	t.is(polishSpellingGenerator(1245000), 'jeden milion dwieście czterdzieści pięć tysięcy');
	t.is(polishSpellingGenerator(1001000), 'jeden milion jeden tysiąc');
	t.is(polishSpellingGenerator(1001001), 'jeden milion jeden tysiąc jeden');
	t.is(polishSpellingGenerator(1000000), 'jeden milion');
	t.is(polishSpellingGenerator(1000001), 'jeden milion jeden');
	t.is(polishSpellingGenerator(1010111), 'jeden milion dziesięć tysięcy sto jedenaście');
	t.is(polishSpellingGenerator(1000000000), 'jeden miliard');
	t.is(polishSpellingGenerator(1000000000000), 'jeden bilion');
	t.is(polishSpellingGenerator(1000000000111), 'jeden bilion sto jedenaście');
});

test('it generates minus for negative number', t => {
	t.is(polishSpellingGenerator(0), 'zero');
	t.is(polishSpellingGenerator(-5), 'minus pięć');
	t.is(polishSpellingGenerator(-235), 'minus dwieście trzydzieści pięć');
	t.is(
		polishSpellingGenerator(-3269.75),
		'minus trzy tysiące dwieście sześćdziesiąt dziewięć 75/100',
	);
});

test('should throw error for incorrect (NaN) argument provided', t => {
	const cases = [
		['abc', 'Incorrect number provided: abc'],
		['$%!', 'Incorrect number provided: $%!'],
		['1xas13', 'Incorrect number provided: 1xas13'],
		['1234xaf', 'Incorrect number provided: 1234xaf'],
	];

	cases.forEach(([input, errorMessage]) => {
		const error = t.throws(() => polishSpellingGenerator(input));
		t.is(error.message, errorMessage);
	});
});
