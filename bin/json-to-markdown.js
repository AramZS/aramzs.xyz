const matter = require("gray-matter");
const slugger = require("./slugger");
const fs = require("fs");

// From: https://stackoverflow.com/questions/25456013/javascript-deepequal-comparison
function deepEqual(obj1, obj2) {

  if(obj1 === obj2) // it's just the same object. No need to compare.
      return true;

  if(isPrimitive(obj1) && isPrimitive(obj2)) // compare primitives
      return obj1 === obj2;

  if(Object.keys(obj1).length !== Object.keys(obj2).length)
      return false;

  // compare objects with same number of keys
  for(let key in obj1)
  {
      if(!(key in obj2)) return false; //other object doesn't have this prop
      if(!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

//check if value is primitive
function isPrimitive(obj)
{
  return (obj !== Object(obj));
}

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
	const ordered = Object.keys(dataObj.data)
		.sort()
		.reduce((obj, key) => {
			obj[key] = dataObj.data[key];
			return obj;
		}, {});
  if (!dataObj.hasOwnProperty("content")  || !dataObj.content || dataObj.content.length < 1) {
    dataObj.content = " ";
  }
	const mdReadyString = matter.stringify(dataObj.content, ordered);
	return mdReadyString;
};

const writeDataToMarkdown = (
	pathString,
	fileSlug,
	dataObj,
	content,
	oldMarkdown
) => {
	try {
		let mdString = dataToMarkdown({
			data: dataObj,
			content: content,
		});
		if (oldMarkdown) {
			if (oldMarkdown === mdString) {
				// Don't rewrite a file if the content hasn't changed
				console.log(
					"No Content Change Detected",
					`${pathString}/${fileSlug}.md`
				);
				return true;
			}
		}
		fs.mkdirSync(`${pathString}`, { recursive: true });
		fs.writeFileSync(`${pathString}/${fileSlug}.md`, mdString);
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
 * @param   {bool}  neverOverwrite True to never 
 *                             overwrite an existing file
 *
 * @return  {bool}             True if the file was written
 */
const processObjectToMarkdown = (titleProp, contentProp, pathString, obj, neverOverwrite) => {
	const fileSlug =
		obj.hasOwnProperty("slug") && obj.slug.length > 1
			? obj.slug
			: slugger(obj[titleProp]);
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
    if (neverOverwrite){
      console.log('Never overwriting existing file')
      return true;
    }
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
				oldData.content.length > 3 ? oldData.content : content;
      // Don't touch the file if we don't need to.
      if (((oldData.content.length > 1 && content.length <= 3) || oldData.content == content) && deepEqual(newData, oldData.data)) {
        return true;
      }
			return writeDataToMarkdown(
				pathString,
				fileSlug,
				newData,
				newContent,
				oldMarkdown
			);
		} else {
			// console.log("Old Data is Empty", oldData);
			return writeDataToMarkdown(
				pathString,
				fileSlug,
				obj,
				content,
				false
			);
		}
	}
	return writeDataToMarkdown(pathString, fileSlug, obj, content);
};

module.exports = {
	processObjectToMarkdown,
};
