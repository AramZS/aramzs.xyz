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
  if (data.hasOwnProperty('tags')) {
    const tagsArray = Object.values(data.tags).reduce((acc, item) => {
      acc.push(item.name.toLowerCase());
      return acc;
    }, []);
    dataSet.tags = tagsArray;
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
  let total = response.hasOwnProperty('total') ? response.total : 1; // keep going if there is no total.
  return {
    resultSet,
    total
  }
};


const getReadwiseAPI = async (authKey, since) => {
  // via https://readwise.io/reader_api?__readwiseLocation=
  const token = authKey; // use your access token here
  let queryCount = 0;

  const fetchDocumentListApi = async (updatedAfter=null, location=null) => {
      let fullData = [];
      let nextPageCursor = null;

      while (true) {
        // Maximum is 20 queries per minute so we pause if we near that.
        if (queryCount >= 18) {
          console.log('Query limit reached, pausing for a minute');
          await new Promise(resolve => setTimeout(resolve, 60000));
          queryCount = 0;
        }
        const queryParams = new URLSearchParams();
        if (nextPageCursor) {
          queryParams.append('pageCursor', nextPageCursor);
        }
        if (updatedAfter) {
          queryParams.append('updatedAfter', updatedAfter);
        }
        if (location) {
          queryParams.append('location', location);
        }
        queryParams.append('withHtmlContent', true); 
        console.log('Making export api request with params ' + queryParams.toString());
        const response = await fetch('https://readwise.io/api/v3/list/?' + queryParams.toString(), {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        try {
          queryCount += 1;
          console.log('Query count', queryCount);
          if (!response.ok) {
            console.error('Error fetching data from Readwise API:', response.status, response.statusText);
            if (response.status === 502) {
                console.log('Query limit reached, pausing for a minute');
                await new Promise(resolve => setTimeout(resolve, 60000));
                queryCount = 0;
            } else {
              break;
            }
          }
          //console.log('response', await response.text());
          const responseJson = await response.json();
          // Only documents with no `parent_id` or `parent_id` set to `null` are valid bookmarks, the rest are highlights or notes.
          const bookmarks = responseJson['results'].filter(doc => !doc.parent_id);
          fullData.push(...bookmarks);
          nextPageCursor = responseJson['nextPageCursor'];
          if (!nextPageCursor) {
            break;
          }
        } catch (e) {
          console.error('Error parsing response JSON:', e);
          console.error('Response text:', await response.text());
          break
        }
      }
      return fullData;
  };
  // Get all of a user's documents from all time
  const allData = await fetchDocumentListApi(since);
  console.log('last document', allData[0]);
  const lastUpdated = allData[0].updated_at;
  
  const newSinceDateObj = new Date(lastUpdated);
  const newSinceDate = newSinceDateObj.valueOf()/1000;

  const sinceDateObj = new Date(since);
  const sinceDate = sinceDateObj.valueOf()/1000;

  if (since){

    if (newSinceDate > sinceDate) {
      console.log('New documents found');
    } else {
      console.log('No new documents found');
    }
  }
  const filePath = path.join(process.cwd(), 'readwise-since.txt');
  fs.writeFileSync(filePath, newSinceDate, 'utf8');

  return allData;

  // Get all of a user's archived documents
  //const archivedData = await fetchDocumentListApi(null, 'archive');

  // Later, if you want to get new documents updated after some date, do this:
  //const docsAfterDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  // use your own stored date
  //const newData = await fetchDocumentListApi(docsAfterDate.toISOString());
        
}


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
