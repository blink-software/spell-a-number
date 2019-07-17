#!/usr/bin/env node
const converter = require('./converter');

const number = process.argv[2];
const lang = process.argv[3];

function printHelp() {
	console.log('\033[33m');
	console.log('Usage:');
	console.log('spellit <NUMBER> [en|pl]');
	console.log('\033[32mCurrently supported languages: en, pl');
	console.log('\033[0m');
}

try {
	const chosenConverter = converter(lang);

	output = chosenConverter(number);

	console.log(output);
}
catch (e) {
	printHelp();

	console.error(e);
}
