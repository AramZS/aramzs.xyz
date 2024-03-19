module.exports = {
  eleventyComputed: {
    tags: (data) => {
      let finalTags = ["Quote"];
      if (data?.tags){
        finalTags.push(...data.tags.filter(tag => tag !== "Quote"));
      }
      return finalTags;
    }
  }
}
