const { exec } = require('child_process');
const test = require('ava');

test.cb('it should print number spelling for the provided language (pl)', t => {
	exec('/usr/lib/node_modules/spellit/cli.js -l pl 215', (err, stdout) => {
		t.is(stdout, 'dwieście piętnaście\n');

		t.end();
	});
});

test.cb('it should print number spelling for the provided language (en)', t => {
	exec('/usr/lib/node_modules/spellit/cli.js -l en 215', (err, stdout) => {
		t.is(stdout, 'two hundred fifteen\n');

		t.end();
	});
});

test.cb('it should print number spelling in english if language not provided', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 215', (err, stdout) => {
		t.is(stdout, 'two hundred fifteen\n');

		t.end();
	});
});

test.cb('it should print an unsupported language error message and help', t => {
	exec('/usr/lib/node_modules/spellit/cli.js -l xxx 215', (err, stdout, stderr) => {
		t.is(stderr.includes('Cannot find converter for language: xxx'), true);
		t.is(stdout.includes('Usage: cli [options] <number>'), true);

		t.end();
	});
});

test.cb('it should print an incorrect number provided error message and help', t => {
	exec('/usr/lib/node_modules/spellit/cli.js 2asd12', (err, stdout, stderr) => {
		t.is(stderr.includes('Incorrect number provided: 2asd12'), true);
		t.is(stdout.includes('Usage: cli [options] <number>'), true);

		t.end();
	});
});

test.cb('it should print a no number provided error message and help', t => {
	exec('/usr/lib/node_modules/spellit/cli.js', (err, stdout, stderr) => {
		t.is(stderr.includes('Pass a number to spell'), true);
		t.is(stdout.includes('Usage: cli [options] <number>'), true);

		t.end();
	});
});
