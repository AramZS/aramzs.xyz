let getPocket = require('pocket-api');
const util = require('util');
const slugger = require("../slugger");
const { processObjectToMarkdown } = require("../json-to-markdown");
const fs = require('fs');
const path = require('path');

const dateInfoObjMaker = (initialDateString) => {
  let dateString = '';
  try {
    dateString = initialDateString || '';
  } catch (e) { 
    console.log('Date error', el, aChild);
    throw new Error('Could not parse date' + el)
  }
  let dateObj = {};
  try {
    dateObj = new Date(parseInt(dateString) * 1000);
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

const createPocketObj = (data) => {
  if (data.hasOwnProperty('status') && data.status === '2') {
    console.log('Skipping deleted item', data);
    return
  }
  if (!data.hasOwnProperty('time_added') || !data.hasOwnProperty('resolved_url')) {
    console.log('Skipping item that does not have the needed properties', data);
    return
  }
  let dateInfoObj = {};
  try {
    dateInfoObj = dateInfoObjMaker(data.time_added);
  } catch (e) {
    console.log('Date error', e, data.time_added);
    throw new Error('Could not parse date ' + data.time_added)
  }
  console.log('Date processed to', dateInfoObj);
  const { isoDate, day, month, year, dateFileString } = dateInfoObj;

  const tagsArray = Object.values(data.tags).reduce((acc, item) => {
    acc.push(item.tag.toLowerCase());
    return acc;
  }, []);
  let dataSet = { 
    link: data.resolved_url, 
    date: isoDate, 
    tags: tagsArray,
    title: data.resolved_title,
    description: data.excerpt,
    content: data.excerpt,
    isBasedOn: data.resolved_url,
    slug: slugger(dateFileString + "-" + data.resolved_url),
    dateFolder: `${year}/${month}/${day}`,
    cover_image: data.hasOwnProperty('top_image_url') ? data.top_image_url : false

  }

  return dataSet;
}


const writeLinkToAmplify = (linkObj) => {
  return processObjectToMarkdown(
    "title",
    "content",
    `./src/content/amplify/${linkObj.dateFolder}`,
    linkObj,
    true
  )
}

const processPocketExport = async (offset) => {
  require('dotenv').config();
  var offsetCount = offset || 0;
  console.log('processPocketExport');
  let consumer_key = process.env.CON_KEY;
  let access_token = process.env.ACCESS_TOKEN;
  if (offset > 30*29){
    console.log('Offset is too high, stopping');
    return { resultSet: [], total: 0 }
  }
  const filePath = path.join(process.cwd(), 'pocket-since.txt');
  // Read the string from pocket-since.txt
  let since = false; // Default value if file does not exist or is empty
  if (fs.existsSync(filePath)) {
    since = fs.readFileSync(filePath, 'utf8').trim();
  }  

  let pocket = new getPocket(consumer_key);
  //sets access_token
  pocket.setAccessToken(access_token)
  const pocketConfigForGet = {
    state: 'all',
    sort: 'newest',
    detailType: 'complete',
    count: 30, // Never more than 30
    offset: offsetCount
  }

  // since ? pocketConfigForGet.since = since : null;
  pocketConfigForGet.since = "1532166480";
  //returns articles
  let response = await pocket.getArticles(pocketConfigForGet)
  
  console.log(util.inspect(response, {showHidden: false, depth: null, colors: true}));
  if (response.list.length === 0 || response.error != null) {
    console.log('No more items to process');
    return { resultSet: [], total: 0 }
  }
  let lastSince = response.since;
  fs.writeFileSync(filePath, lastSince.toString(), 'utf8');
  let linkList = Object.values(response.list).map((data) => {
    return createPocketObj(data);
  });

  var fullLinkSet = linkList.filter(e => e);
  console.log(util.inspect(fullLinkSet, {showHidden: false, depth: null, colors: true}));
  const results = fullLinkSet.map((link) => {
    const result = writeLinkToAmplify(link);
    console.log("link write result", result);
    return result;
  })
  let resultSet = await Promise.all(results);
  let total = response.total;
  return {
    resultSet,
    total
  }
};

const walkPocketAPI = async () => {
  // let resultObj = await processPocketExport(0);
  let offset = 0;
  let total = 0;
  // let resultSet = [];

  do {
    let resultObj = await processPocketExport(offset);
    // resultSet = resultSet.concat(resultObj.resultSet);
    total = resultObj.total;
    offset += resultObj.resultSet.length;
  } while (total > 0);

  return resultSet;
  // return result;
}


module.exports = {
  make: async () => {},
	writeAmplify: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = processPocketExport();
		return result;
	},
};
