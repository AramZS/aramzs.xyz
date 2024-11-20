let getPocket = require('pocket-api');


const processPocketExport = async () => {
  require('dotenv').config()
  
  let consumer_key = process.env.CON_KEY;
  let access_token = process.env.ACCESS_TOKEN;

  let pocket = new getPocket(consumer_key);
  //sets access_token
  pocket.setAccessToken(access_token)
  
  //returns articles
  let response = await pocket.getArticles()
  
  console.log(response);
  
};


module.exports = {
  make: async () => {},
	writeAmplify: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = processPocketExport();
		return result;
	},
};
