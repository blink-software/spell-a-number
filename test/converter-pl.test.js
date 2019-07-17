import test from 'ava';


const polishSpellingGenerator = require('../src/converters/converter-pl');

test('it generates correct string for given number', t => {

	t.is(polishSpellingGenerator(0), 'zero');
	t.is(polishSpellingGenerator(1), 'jeden');
	t.is(polishSpellingGenerator(12), 'dwanaście');
	t.is(polishSpellingGenerator(2234), 'dwa tysiące dwieście trzydzieści cztery');
	t.is(polishSpellingGenerator(27317644), 'dwadzieścia siedem milionów trzysta siedemnaście tysięcy sześćset czterdzieści cztery');

});

test('it generates decimal fraction if number is not integer', t => {

	t.is(polishSpellingGenerator(0.33), 'zero 33/100');
	t.is(polishSpellingGenerator(2.45), 'dwa 45/100');
	t.is(polishSpellingGenerator(35.12), 'trzydzieści pięć 12/100');
	t.is(polishSpellingGenerator(122.45), 'sto dwadzieścia dwa 45/100');
	t.is(polishSpellingGenerator(1245.689), 'jeden tysięcy dwieście czterdzieści pięć 69/100');

});

test('it generates minus for negative number', t => {

	t.is(polishSpellingGenerator(0), 'zero');
	t.is(polishSpellingGenerator(-5), 'minus pięć');
	t.is(polishSpellingGenerator(-235), 'minus dwieście trzydzieści pięć');
	t.is(polishSpellingGenerator(-3269.75), 'minus trzy tysiące dwieście sześćdziesiąt dziewięć 75/100');

});

test('should throw error for incorrect (NaN) argument provided', t => {
	t.throws(() => { polishSpellingGenerator('abc'); }, null, 'Incorrect number provided');
	t.throws(() => { polishSpellingGenerator('$%!'); }, null, 'Incorrect number provided');
	t.throws(() => { polishSpellingGenerator('1xas13'); }, null, 'Incorrect number provided');
	t.throws(() => { polishSpellingGenerator('1234xaf'); }, null, 'Incorrect number provided');
});

