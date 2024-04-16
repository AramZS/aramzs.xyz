const getPageFolders = (page) => page.filePathStem.substring(
  page.filePathStem.indexOf('resources/') + 'resources/'.length,
  page.filePathStem.indexOf(`/${page.fileSlug}`)
);

const getPageResourceType = (page) => {
  let resourceType = getPageFolders(page).split('/')[0]
  // console.log('resourceType', resourceType, page)
  return resourceType;
};

module.exports = {
  layout: "layouts/page-resource.njk",
  titlePrefix: 'Resource',
  headingClass: 'resource',
  contentType: 'resource',
  excludeFromFeed: true,
  eleventyComputed: {
    permalink(data) {
      const folders = getPageFolders(data.page);
      //console.log('resource data', data)
      let slug = data.slug ? data.slug : this.slugify(data.title);
      
      return `resources/${folders}/${slug}/`
    },

    folder(data) {
      const resourceType = getPageResourceType(data.page);
      // console.log('resourceType', resourceType, data);
      return [
        'resource',
        {href: `/resources/${resourceType}/`, text: resourceType, title: 'Goto Archive of all resources'}
      ];
    },

    /**
     * Resource Type is the base folder of a resource.
     * @param data
     * @returns {string}
     */
    resourceType(data) {
      return getPageResourceType(data.page);
    },
  }
};
