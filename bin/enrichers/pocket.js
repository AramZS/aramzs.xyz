const { processObjectToMarkdown } = require("../json-to-markdown");
const fs = require("fs");
const slugger = require("../slugger");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const capitalize = (word) => {
  const capitalized = word.charAt(0).toUpperCase()
+ word.slice(1)
  return capitalized;
}
const transformExportToJSON = (data) => {
  const dom = new JSDOM(data);
  const window = dom.window;
	const document = window.document;
  //console.log(data);
	//const customElements = window.customElements;
	//const HTMLElement = window.HTMLElement;
  var linkList = [...document.querySelectorAll('li')].map(el => { 
    console.log("el ", el, "el.outerHTML ", el.outerHTML, "el.firstChild.tagName ", el.firstChild.tagName, "el.querySelector", el.querySelector('A') )
    if (el.firstChild.tagName !== 'A') return;
    let aChild = el.firstChild; 
    let dateString = '';
    try {
      dateString =  aChild.getAttribute('time_added');
    } catch (e) { 
      console.log('Date error', el, aChild);
      throw new Error('Could not parse date' + el)
    }
    let dateObj = new Date(parseInt(dateString) * 1000);
          // Generate a file-slug YYYY-MM-DD string from the date
          let date = dateObj;
          let yearFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric' });

          let year = yearFormatter.format(dateObj);
          // Use Intl.DateTimeFormat to get the month in New York timezone
          let monthFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: '2-digit' });
          let month = monthFormatter.format(date);
          // Use Intl.DateTimeFormat to get the day in New York timezone
          let dayFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', day: '2-digit' });
          let day = dayFormatter.format(date);
          let dateFileString = `${year}-${month}-${day}`;
          let isoDate = '';
    try {
      isoDate = dateObj.toISOString();
    } catch (e) {
      console.log('Date error', e, dateString);
      throw new Error('Could not parse date' + dateString)
    }
    let dataSet = { 
      link: aChild.href, 
      date: isoDate, 
      tags: aChild.getAttribute('tags').split(',').filter(e => e).map(tag => tag.toLowerCase()),
      title: aChild.textContent,
      content: '',
      isBasedOn: aChild.href,
      slug: slugger(dateFileString + "-" + aChild.textContent),
      dateFolder: `${year}/${month}/${day}`
    }
    console.log('dataset', dataSet);
    return dataSet;
  });
  return linkList.filter(e => e);
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
    `./src/content/amplify/${linkObj.dateFolder}`,
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
