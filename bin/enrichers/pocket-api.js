let getPocket = require('pocket-api');
const util = require('util')

const processPocketExport = async () => {
  require('dotenv').config()
  
  let consumer_key = process.env.CON_KEY;
  let access_token = process.env.ACCESS_TOKEN;

  let pocket = new getPocket(consumer_key);
  //sets access_token
  pocket.setAccessToken(access_token)
  const pocketConfigForGet = {
    state: 'all',
    sort: 'newest',
    detailType: 'complete',
    count: 4,
    offset: 0
  }
  //returns articles
  let response = await pocket.getArticles(pocketConfigForGet)
  
  console.log(util.inspect(response, {showHidden: false, depth: null, colors: true}))
};


module.exports = {
  make: async () => {},
	writeAmplify: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = processPocketExport();
		return result;
	},
};
