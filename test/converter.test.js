import test from 'ava';

const converter = require('../converter');

const converter_blank = converter();
const converter_en = converter('en');
const converter_pl = converter('pl');

test('it should return polish spelling if polish language specified', t => {
	t.is(converter_pl(213), 'dwieście trzynaście');
});

test('it should return english spelling if english language specified', t => {
	t.is(converter_blank(213), 'two hundred thirteen');
});

test('it should return english spelling if no language specified', t => {
	t.is(converter_en(213), 'two hundred thirteen');
});

test('its should throw error if provided language not supported', t => {
	const error = t.throws(() => {
		const converter_xx = converter('xx');
		converter_xx(200);
	});
	t.is(error.message, 'Cannot find converter for language: xx');
});
