const {exec} = require('child_process');
import test from 'ava';

test.cb('it should print number spelling for provided language', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 215 pl', (err, stdout) => {
		t.is(stdout, 'dwieście piętnaście\n');

		t.end();
	});
});

test.cb('it should print number spelling in english if language not provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 215', (err, stdout) => {
		t.is(stdout, 'two hundred fifteen\n');

		t.end();
	});
});

test.cb('it should print help menu if not supported lang provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 215 xx', (err, stdout) => {
		t.is(stdout.includes('Usage'), true);
		t.is(stdout.includes('spellit <NUMBER> [en|pl]'), true);

		t.end();
	});
});

test.cb('it should print help menu if incorrect number provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 2asd12 en', (err, stdout) => {
		t.is(stdout.includes('Usage'), true);
		t.is(stdout.includes('spellit <NUMBER> [en|pl]'), true);

		t.end();
	});
});

test.cb('it should print error if incorrect number provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 2asd12 en', (err, stdout, stderr) => {
		t.true(stderr.includes('Incorrect number provided: 2asd12'), true);

		t.end();
	});
});

test.cb('it should print error if not supported language provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 212 xx', (err, stdout, stderr) => {
		t.true(stderr.includes('Cannot find converter for language: xx'), true);

		t.end();
	});
});

