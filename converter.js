const langs = [
	'pl',
	'en',
];

let converters = {};

langs.forEach(lang => {
	converters[lang] = require(`./src/converters/converter-${lang}`);
});


module.exports = function(lang = 'en') {

	// Throw error when cant find converter for specified language
	if (!converters[lang]) {
		throw new ReferenceError(`Cannot find converter for language: ${lang}`);
	}

	return converters[lang];
};
