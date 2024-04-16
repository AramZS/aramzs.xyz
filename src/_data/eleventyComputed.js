module.exports = {
  breadcrumbs: (data) => {
    if (!data.collections.all || data.collections.all.length === 0) return [];
    const crumbs = [
      {href: '/', text: '~', title: 'Back to homepage'}
    ];
    // Manage allowed folders
    // @TODO - Mirrored code snippets should be under resources. 
    let folders = data?.folder ?? [];
    if (Array.isArray(folders) === false) folders = [folders];

    if (['project', 'resource', 'amplify'].includes(data?.contentType)) folders = folders.filter(f => f !== 'writing');

    for (const folder of folders) {
      if (typeof folder === 'string') {
        switch (folder) {
          case 'about':
            crumbs.push({href: '/about/', text: 'about', title: 'Goto About page'});
            break;
          case 'types':
            crumbs.push({href: '/about/content/', text: 'types', title: 'Goto Content Types info page'});
            break;
          case 'writing':
            crumbs.push({href: '/writing/', text: 'writing', title: 'Goto Archive of all posts'});
            break;
          case 'topic':
            crumbs.push({href: '/topic/', text: 'topics', title: 'Goto list of all topics'});
            break;
          case 'resource':
            crumbs.push({href: '/resources/', text: 'resources', title: 'Goto Archive of all resources'});
            break;
          case 'lists':
            crumbs.push({href: '/lists/', text: 'lists', title: 'Goto Archive of all lists'});
            break;
          case 'stats':
            crumbs.push({href: '/stats/', text: 'stats', title: 'Goto writing stats'});
            break;
          case 'amplify':
            crumbs.push({href: '/amplify/', text: 'amplify', title: 'Goto amplified links'});
            break;
        }
      } else {
        crumbs.push(folder);
      }
    }

    // Add link to content type archive page. This is used by writing content pages so I don't have to
    // set the folder within the computed date for each content type. The exception is resources where
    // the folder is computed based upon resourceType.
    if (data.contentType && !data.resourceType) {
      const found = data.collections.contentTypes.find(t => t.id === data.contentType);
      if (!found) return crumbs;

      crumbs.push({
        href: `/${found.slug}`,
        text: found.name.toLowerCase(),
        title: `Goto Archive of all ${found.name}`
      });
    }
    return crumbs;
  }
}
