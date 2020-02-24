#!/usr/bin/env node
const { converter } = require('./converter');

const program = require('commander');

let number;

program
	.arguments('<number>')
	.option('-l, --language <language>', 'a language to spell a number in (pl/en)', 'en')
	.action(passedNumber => {
		number = passedNumber;
	}).argv;

program.parse(process.argv);

const { language } = program;

if (number === undefined) {
	console.error('Pass a number to spell\n');
	program.outputHelp();
	process.exit(1);
}

try {
	const chosenConverter = converter(language);

	output = chosenConverter(number);
	console.log(output);
} catch (e) {
	console.error(e);

	program.outputHelp();
}
