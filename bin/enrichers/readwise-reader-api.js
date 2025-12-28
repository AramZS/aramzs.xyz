const util = require('util');
const slugger = require("../slugger");
const { processObjectToMarkdown } = require("../json-to-markdown");
const fs = require('fs');
const path = require('path');


const dateInfoObjMaker = (initialDateString) => {
  let dateString = '';
  console.log('initialDateString', initialDateString);
  try {
    dateString = initialDateString || '';
  } catch (e) { 
    console.log('Date error', el, aChild);
    throw new Error('Could not parse date' + el)
  }
  let dateObj = {};
  try {
    dateObj = new Date(dateString);
  } catch (e) {
    console.log('Date error at date parse time', e, dateString);
    throw new Error('Could not parse date' + dateString)
  }
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
  return {
    year: year,
    month: month,
    day: day,
    dateFileString: dateFileString,
    isoDate: isoDate
  }  
}

const createReadwiseObj = (data) => {
  let dateInfoObj = {};
  try {
    dateInfoObj = dateInfoObjMaker(data.saved_at);
  } catch (e) {
    console.log('Date error', e, data.saved_at);
    throw new Error('Could not parse date ' + data.saved_at)
  }
  console.log('Date processed to', dateInfoObj);
  const { isoDate, day, month, year, dateFileString } = dateInfoObj;

  let dataSet = { 
    link: data.source_url, 
    date: isoDate, 
    title: data.title,
    description: data.summary,
    author: data.author,
    content: data.html_content,
    isBasedOn: data.source_url,
    slug: slugger(dateFileString + "-" + data.source_url),
    dateFolder: `${year}/${month}/${day}`,
    cover_image: data.hasOwnProperty('image_url') ? data.image_url : false

  }
  /**
   * 	"tags": {
				"ai": {
					"name": "ai",
					"type": "auto",
					"created": 1752023680831
				},
				"video": {
					"name": "video",
					"type": "auto",
					"created": 1752023680831
				}
			},
   *
   */
  if (data.hasOwnProperty('tags') && data.tags) {
    const tagsArray = Object.values(data.tags).reduce((acc, item) => {
      acc.push(item.name.toLowerCase());
      return acc;
    }, []);
    dataSet.tags = tagsArray;
  } else {
    dataSet.tags = [];
    console.log('No tags found for', data.title);
  }
  return dataSet;
}


const writeLinkToAmplify = (linkObj) => {
  if (!linkObj.hasOwnProperty('title')) {
    console.log('Skipping writing a link with no title', linkObj);
    return
  }
  return processObjectToMarkdown(
    "title",
    "content",
    `./src/content/amplify/${linkObj.dateFolder}`,
    linkObj,
    true
  )
}

const processReadwiseExport = async (allData) => {
  if (!allData || allData.length === 0) { return false; }
  let linkList = Object.values(allData).map((data) => {
    return createReadwiseObj(data);
  });

  var fullLinkSet = linkList.filter(e => e);
  console.log(util.inspect(fullLinkSet, {showHidden: false, depth: null, colors: true}));
  if (!linkList || linkList.length === 0 ) {
    console.log('No more items to process');
    return { resultSet: [], total: 0 }
  }
  const results = fullLinkSet.map((link) => {
    const result = writeLinkToAmplify(link);
    console.log("link write result", result);
    return result;
  })
  let resultSet = await Promise.all(results);
  return {
    resultSet,
    total: resultSet.length
  }
};




const walkReadwiseReaderAPI = async () => {

  // let resultSet = [];

  require("dotenv").config();
  const readwiseToken = process.env.READWISE_TOKEN;

  const filePath = path.join(process.cwd(), 'readwise-since.txt');
  // Read the string from pocket-since.txt
  let since = false; // Default value if file does not exist or is empty
  if (fs.existsSync(filePath)) {
      since = fs.readFileSync(filePath, 'utf8').trim();
      console.log('Read since date from file', since);
      let sinceObj = new Date(parseInt(since)*1000);
      since = sinceObj.toISOString();
  }  

  if (!readwiseToken) {
    console.error('READWISE_TOKEN is not set in .env file');
    return false;
  } else {
    console.log('Using READWISE_TOKEN from .env file');
    console.log('Since date is', since);
    const allData = await getReadwiseAPI(readwiseToken, since);
    let resultObj = await processReadwiseExport(allData);
  }

  // return result;
}


module.exports = {
  make: async () => {},
  writeAmplify: async () => {
    //var finishedArray = await Promise.all(quoteArray);
    var result = walkReadwiseReaderAPI();
    return result;
  },
};
