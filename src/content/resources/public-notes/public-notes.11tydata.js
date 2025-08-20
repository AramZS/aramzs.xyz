const getPageFolders = (page) => page.filePathStem.substring(
  page.filePathStem.indexOf('resources/') + 'resources/public-notes/'.length,
  page.filePathStem.indexOf(`/${page.fileSlug}`)
).toLowerCase();

const getEventName = (page) => {
  // Get the event name from the level of the file path that follows `public-notes` using regex
  const regex = /resources\/public-notes\/([^/]+)\//;
  const match = page.filePathStem.match(regex);
  return match ? match[1] : 'Event';
};

const generateTitle = (slugString) => {
  // Split camelCase string into words
  const words = slugString.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1); // Capitalize the first word
  return words.join(' ');
};

const getPageResourceType = (page) => {
  let resourceType = getPageFolders(page).split('/')[0]
  console.log('public notes info', resourceType, page)
  return resourceType;
};

module.exports = {
  layout: "layouts/page-public-notes-resource.njk",
  titlePrefix: 'Event Notes: ',
  headingClass: 'resource',
  contentType: 'resource',
  excludeFromFeed: true,
  eleventyComputed: {
    title: (data) => {
      let aliases = data?.aliases && data.aliases.length ? data.aliases[0] : false;
      return `${data.title || aliases || generateTitle(data.page.fileSlug)} - ${getEventName(data.page)}`
    },
    tags: (data) => {
      let tags = data?.tags && data.tags.length ? data.tags : ['event'];
      return tags
    },
    permalink(data) {
      const folders = getPageFolders(data.page);
      //console.log('resource data', data)
      let slug = data.slug ? data.slug : this.slugify(data.title || data.page.fileSlug);
      
      return `resources/public-notes/${folders}/${slug || page.fileSlug}/`
    },

    folder(data) {
      const resourceType = getPageResourceType(data.page);
      // console.log('resourceType', resourceType, data);
      return [
        'resource',
        {href: `/resources/public-notes/${resourceType}/`, text: resourceType, title: 'Goto Archive of all public notes'}
      ];
    },

    /**
     * Resource Type is the base folder of a resource.
     * @param data
     * @returns {string}
     */
    resourceType(data) {
      return 'public-notes'
    },


    eventName(data) {
      return getEventName(data.page); 
    },
  }
};
