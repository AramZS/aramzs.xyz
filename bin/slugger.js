var URLSafeBase64 = require("urlsafe-base64");
var slugify = require("slugify");
var tr = require("transliteration");
module.exports = function (name) {
	let safeName = name;
	let slug = slugify(safeName, {
		lower: true,
		strict: true,
		locale: "en",
	});
	if (!slug || (slug && !URLSafeBase64.validate(slug))) {
		console.log("name", name, " with slug ", slug, "failed validation");
		safeName = tr.transliterate(name);

		slug = slugify(safeName, {
			lower: true,
			strict: true,
			locale: "en",
		});
		//safeName = URLSafeBase64.encode(Buffer.from(name));
		console.log(
			"name",
			name,
			" received safe name ",
			safeName,
			"and slug",
			slug
		);
	}
	if (!slug || (slug && !URLSafeBase64.validate(slug))) {
		console.log("name", name, " with slug ", safeName, "failed validation");
		// safeName = tr.transliterate(name);
		safeName = URLSafeBase64.encode(Buffer.from(name));
		console.log("name", name, " received safe name ", safeName);
		slug = slugify(safeName, {
			lower: true,
			strict: true,
			locale: "en",
		});
	}
	return slug;
};
