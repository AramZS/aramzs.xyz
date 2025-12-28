// Basic Readwise API Class to provide methods to access the readwise API
// Reader API docs: https://readwise.io/reader_api
// Readwise (highlights) API docs: https://readwise.io/api_deets

/**
 * Readwise API Document Object
 * 
 * @typedef {object} RWDocumentObject
 * @property {string} id - The unique identifier for the document
 * @property {string} url - The Readwise Reader URL for the document
 * @property {string} source_url - The original source URL of the document
 * @property {string} title - The title of the document
 * @property {string} author - The author of the document
 * @property {string} source - The source of the document (e.g., "Reader RSS")
 * @property {string} category - The category of the document (e.g., "rss", "article")
 * @property {string} location - The location of the document (e.g., "feed", "new", "archive")
 * @property {object} tags - An object containing tags associated with the document
 * @property {string} site_name - The name of the site where the document originated
 * @property {number} word_count - The word count of the document
 * @property {string} reading_time - Estimated reading time for the document
 * @property {string} created_at - The creation timestamp of the document
 * @property {string} updated_at - The last updated timestamp of the document
 * @property {string} notes - Any notes associated with the document
 * @property {string} published_date - The published date of the document
 * @property {string} summary - A summary of the document
 * @property {string} image_url - URL to an image associated with the document
 * @property {string|null} parent_id - The parent ID if the document is a highlight or note, null for bookmarks
 * @property {number} reading_progress - The reading progress percentage
 * @property {string|null} first_opened_at - Timestamp of when the document was first opened
 * @property {string|null} last_opened_at - Timestamp of when the document was last opened
 * @property {string} saved_at - Timestamp of when the document was saved
 * @property {string} last_moved_at - Timestamp of when the document was last moved
 */


class ReadwiseAPI {

  constructor(authKey) {
    this.token = authKey;
    this.apiHighlights = 'https://readwise.io/api/v2/';
    this.apiReader = 'https://readwise.io/api/v3/';
    this.apiQueries = {};
  }

  /**
   * [addQueryParams description]
   *
   * @param   {Array<[string, string]>}  params  Array of key-value pairs
   *
   * @return  {[type]}          [return description]
   */
  addQueryParams(params) {
    const queryParams = new URLSearchParams();
    params.forEach((keyvalue) => {
      queryParams.append(keyvalue[0], keyvalue[1]);
    });
    return `?${queryParams.toString()}`;
  }

  async processList(){
    
  }
  /**
   *  
   * Readwise API List Response Object
   * 
   * @typedef {object} RWListResponse
   * @property {Array<RWDocumentObject>|false} results - Array of document objects
   * @property {int} queryCount - count of queries made
   * @description Response object for Readwise Reader API list fetch
   * 
   */
   
  /**
   * 
   * Fetches a list of documents from the Readwise API
   * @param {string} fullUrl - The full URL of the query to the API. Includes endpoint and query parameters.
   * @param {int} queryCount - Count of queries made so far to this specific URL. 
   * @returns {Promise<RWListResponse>} Array of document objects
   * @description Grabs a list of Documents from Readwise Reader API with paging and limits per request. Handles rate limiting by pausing requests when nearing the limit.
   * 
   */
  async fetchList(fullUrl, queryCount){
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Token ${this.token}`,
      },
    });
    try {
      if (!response.ok) {
        console.error('Error fetching data from Readwise API:', response.status, response.statusText);
        if (response.status === 502) {
            console.log('Query limit reached, pausing for a minute');
            await new Promise(resolve => setTimeout(resolve, 60000));
            queryCount = queryCount+1;
            return { response: false, queryCount }
        } else {
          console.log('Query failed with status', response.status);
          return { response: false, queryCount }
        } 
      }
      //console.log('response', await response.text());
      const responseJson = await response.json();
      return { response: responseJson, queryCount }
    } catch (e) {
      console.error('Error parsing response JSON:', e);
      console.error('Response text:', await response.text());
      return { response: false, queryCount };
    }
  }


  async getList(queryParams=[]) {
    let fullData = [];
    let nextPageCursor = null;
    let queryCount = 0;

    const endpoint = 'list/';
    while (true) {
      // Maximum is 20 queries per minute so we pause if we near that.
      if (queryCount >= 18) {
        console.log('Query limit reached, pausing for a minute');
        await new Promise(resolve => setTimeout(resolve, 60000));
        queryCount = 0;
      }

      const fullUrl = `${this.apiReader}${endpoint}${this.addQueryParams(queryParams)}`;
      console.log('Making export api request with full url ' + fullUrl);

      fetchResult = await this.fetchList(fullUrl, queryCount);
      queryCount = fetchResult.queryCount;
      
    }
  }

}

const getReadwiseAPI = async (authKey, since) => {
  // via https://readwise.io/reader_api?__readwiseLocation=
   // use your access token here
  let queryCount = 0;

  /**
   * Fetches a list of documents from the Readwise API
   * @param {string|null} updatedAfter - ISO date string to filter documents updated after this date
   * @param {'new'|'later'|'shortlist'|'archive'|'feed'|null} location - Location filter
   * @returns {Promise<Array<RWDocumentObject>>} Array of document objects
   * 
   * @description Grabs a list of Documents from Readwise Reader API with paging and limits per request. Handles rate limiting by pausing requests when nearing the limit.
   */
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
          responseJson['results'].length === 0 ? console.log('No results found') : console.log('Found ' + responseJson['results'].length + ' results');
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
  if(allData.length === 0){ 
    console.log('No bookmarks found');
    return;
   } else {
     console.log('Found ' + allData.length + ' bookmarks');
   }
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
  fs.writeFileSync(filePath, JSON.stringify(newSinceDate+5), 'utf8');

  return allData;

  // Get all of a user's archived documents
  //const archivedData = await fetchDocumentListApi(null, 'archive');

  // Later, if you want to get new documents updated after some date, do this:
  //const docsAfterDate = new Date(Date.now() - 24 * 60 * 60 * 1000);  // use your own stored date
  //const newData = await fetchDocumentListApi(docsAfterDate.toISOString());
        
}
