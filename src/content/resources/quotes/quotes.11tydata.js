module.exports = {
  eleventyComputed: {
    tags: (data) => {
      let finalTags = ["Quote"];
      if (data?.tags){
        finalTags.push(...data.tags.filter(tag => tag !== "Quote"));
      }
      return finalTags;
    },
    date: (data) => {
      if (!data || data.length < 1 || Object.keys(data).length < 1 || !data.sourceTitle){ return data.date || data.page.date; }
      // console.log('dateCheck', data);
      switch (data.sourceTitle) {
        case "Privacy in Context: Technology, Policy, and the Integrity of Social Life":
          // console.log('item found', data);
          
          var newDate = new Date('2023-03-07'); 
          // https://github.com/11ty/eleventy/issues/2199
          data.page.date = newDate;
          return data.date;
          data.date = newDate;
          return newDate;
          break;
        case "Bullshit Jobs: A Theory":
           // console.log('item found', data);
           var newDate = new Date('2022-11-15'); 
           // https://github.com/11ty/eleventy/issues/2199
           data.page.date = newDate;
           return data.date;
           data.date = newDate;
           return newDate;
           break;       
        default:
          return new Date(data.date);
          break;
      }
      
    }
  }
}
