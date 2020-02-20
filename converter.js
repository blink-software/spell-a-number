const langs = ['pl', 'en'];

let converters = {};

langs.forEach(lang => {
	converters[lang] = require(`./src/converters/converter-${lang}`);
});

function converter(lang = 'en') {
	// Throw error when cant find converter for specified language
	if (!converters[lang]) {
		throw new ReferenceError(`Cannot find converter for language: ${lang}`);
	}

	return converters[lang];
}

module.exports = {
	converter,
	langs,
};
