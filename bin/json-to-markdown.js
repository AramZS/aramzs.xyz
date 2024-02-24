const matter = require("gray-matter");
const slugger = require("./slugger");
const fs = require("fs");
/**
 * Take a string that has a YAML block in it and
 * return that YAML block as a JS Object
 *
 * @param   {str}  text  A text file rendered as a string
 *
 * @return  {obj}        Object from the YAML contained in the string
 */
const getYAMLData = (text) => {
	if (!text || text.length < 13) {
		return false;
	}
	const dataObj = { ...matter(text) };
	if (dataObj.isEmpty) {
		return false;
	}
	return dataObj;
};

/**
 * Take a JS Object and return a string of markdown
 *
 * @param   {obj}  dataObj  Object with data and content keys
 *
 * @return  {str}           String of markdown
 */
const dataToMarkdown = (dataObj) => {
	const mdReadyString = matter.stringify(dataObj.content, dataObj.data);
	return mdReadyString;
};

const writeDataToMarkdown = (pathString, fileSlug, dataObj, content) => {
	try {
		fs.mkdirSync(`${pathString}`, { recursive: true });
		fs.writeFileSync(
			`${pathString}/${fileSlug}.md`,
			dataToMarkdown({
				data: dataObj,
				content: content,
			})
		);
		result = true;
		console.log("wrote md file", `${pathString}/${fileSlug}.md`);
	} catch (e) {
		console.log("Error Writing New File", e);
		result = false;
	}
	return result;
};

/**
 * Take a titleProp, contentProp, path, and object
 * and write a markdown file to the path with the
 * object's data and content
 *
 * @param   {str}  titleProp   The key to use as the title
 * @param   {str}  contentProp The key to use as the content
 * @param   {str}  pathString        The path to write the file to
 * @param   {obj}  obj         The object to write
 *
 * @return  {bool}             True if the file was written
 */
const processObjectToMarkdown = (titleProp, contentProp, pathString, obj) => {
	const fileSlug = slugger(obj[titleProp]);
	let content = "";
	if (contentProp) {
		content = obj[contentProp];
		delete obj[contentProp];
	}
	if (!obj.hasOwnProperty("date")) {
		obj.date = new Date().toISOString();
	}
	if (fs.existsSync(`${pathString}/${fileSlug}.md`)) {
		console.log("File Exists", `${pathString}/${fileSlug}.md`);
		let oldMarkdown = "";
		try {
			oldMarkdown = fs.readFileSync(
				`${pathString}/${fileSlug}.md`,
				"utf8"
			);
		} catch (e) {
			console.log("Error Reading Existing File", e);
			//return false;
		}
		const oldData = getYAMLData(oldMarkdown);
		if (oldData) {
			// console.log("Old Data", oldData);
			const newData = { ...obj, ...oldData.data };
			const newContent =
				oldData.content.length > 1 ? oldData.content : content;

			return writeDataToMarkdown(
				pathString,
				fileSlug,
				newData,
				newContent
			);
		} else {
			// console.log("Old Data is Empty", oldData);
			return writeDataToMarkdown(pathString, fileSlug, obj, content);
		}
	}
	return writeDataToMarkdown(pathString, fileSlug, obj, content);
};

module.exports = {
	processObjectToMarkdown,
};
