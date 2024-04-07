const { processObjectToMarkdown } = require("../json-to-markdown");
const fs = require("fs");
const slugger = require("../slugger");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const transformExportToJSON = (data) => {
  const dom = new JSDOM(data);
  const window = dom.window;
	const document = window.document;
	//const customElements = window.customElements;
	//const HTMLElement = window.HTMLElement;
  var linkList = [...document.querySelectorAll('li')].map(el => { 
    let aChild = el.firstChild; 
    return { 
      link: aChild.href, 
      date: new Date(aChild.getAttribute('time_added')).toISOString(), 
      tags: aChild.getAttribute('tags').split(','),
      title: aChild.innerText,
      content: '' 
    }
  });
  return linkList;
};

const getPocketExport = () => {
  const links = fs.readFileSync(
    "./to-process/ril_export.html",
    "utf8"
  );

  return links;
}

const writeLinkToAmplify = (linkObj) => {
  return processObjectToMarkdown(
    "title",
    "content",
    "./src/content/amplify",
    linkObj
  )
}

const processPocketExport = () => {
  const pocketExport = transformExportToJSON(getPocketExport());
  //write
  let writeResults = pocketExport.map((link) => {
    return writeLinkToAmplify(link);
  })
  return writeResults;
};


module.exports = {
  make: async () => {},
	writeAmplify: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = processPocketExport();
		return result;
	},
};
