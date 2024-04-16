const path = require("path");
const fs = require("fs");

const mainFunction = async (aUrl, filetype, filename, targetFolder) => {
	const destinationFolder =
		targetFolder || path.join(process.cwd(), `public/img/retrieved`);
	let localImageName = filename + `.${filetype}`;
	if (!filename || filename === undefined) {
		console.error(
			"Image request passed undefined filename",
			aUrl,
			filetype,
			filename
		);
		return false;
	}
	let fileStructureName = path.join(
		destinationFolder,
		filename + `.${filetype}`
	);
	if (fs.existsSync(fileStructureName)) {
		return localImageName;
	}
	try {
		let imageBlob = await fetch(aUrl, {
			headers: {
				"User-Agent": "11ty/2.0 ( http://aramzs.github.io )",
			},
		});
		let imageReady = await imageBlob.blob();
		const arrayBuffer = await imageReady.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		// console.log(imageBlob);
		var imageParts = aUrl.split("/");
		var imageName = imageParts[imageParts.length - 1];
		// imageBlob.body.pipe(fs.createWriteStream(`./${imageName}.jpeg`));
		fs.writeFileSync(fileStructureName, buffer);
		return localImageName;
	} catch (e) {
		console.error("Image request failed ", e, aUrl, filetype, filename);
		return false;
	}
};
module.exports = mainFunction;
