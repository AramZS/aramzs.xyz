const fs = require("fs");

module.exports = async function () {
	var sourceData = JSON.parse(
		fs.readFileSync("./src/_dataSources/quotes.json", "utf8")
	);
	// var base = [...sourceData.quotes];
	var init = [
		{
			blockquote: "Everything not saved will be lost",
			cite: { name: "Nintendo Quit Screen" },
			handedFrom: "Simon Dann",
			referringUri: "https://photogabble.co.uk/resources/quotes/",
		},
		//

		// {
		//   blockquote: "",
		//   cite: '',
		// },
	];
	if (sourceData.quotes.length < 0) {
		return init;
	}
	return [...sourceData.quotes, ...init];
};
