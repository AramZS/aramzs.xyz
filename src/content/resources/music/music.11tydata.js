module.exports = {
  eleventyComputed: {
    tags: (data) => {
      let finalTags = ["list/music"];
      if (data?.tags){
        finalTags.push(...data.tags.filter(tag => tag !== "list/music"));
      }
      return finalTags;
    }
  }
}
