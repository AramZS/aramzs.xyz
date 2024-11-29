const {
	setupMarkdownIt,
	parseCollectionHashtags,
} = require("./helpers/hashtags");
const { chunk } = require("./helpers");
const { slugify, padStart, specialTagMeta } = require("./filters");
const listData = require("../src/_data/lists-meta");

// This function returns a reducer function for paginating custom taxonomy such as
// the content types used in this digital garden.
//
// Written with inspiration from:
// @see https://www.webstoemp.com/blog/basic-custom-taxonomies-with-eleventy/
// @todo make compatible with 11tys official pagination interface
// @todo add test
const paginateContentTaxonomy = (baseSlug = "", perPage = 10) => {
	return (pages, taxonomy) => {
		const slugs = [];
		const chunks = chunk(taxonomy.items, perPage);
		chunks.forEach((content, idx) => {
			slugs.push(
				idx > 0
					? `${baseSlug}${taxonomy.slug}/${idx + 1}`
					: `${baseSlug}${taxonomy.slug}`
			);
		});
		const totalPages = slugs.length;
		chunks.forEach((items, idx) => {
			pages.push({
				title: taxonomy.name,
				slug: slugs[idx],
				pageNumber: idx + 1,
				totalPages,
				pageSlugs: {
					all: slugs,
					next: slugs[idx + 1] || null,
					previous: slugs[idx - 1] || null,
					first: slugs[0] || null,
					last: slugs[slugs.length - 1] || null,
				},
				items,
			});
		});
		return pages;
	};
};

const md = setupMarkdownIt(require("markdown-it")());

module.exports = function loadCollection(eleventyConfig) {
	// Filter draft posts when deployed into production
	const post = (collection) =>
		(process.env.BUILD_DRAFTS // leveraging the eleventy.config.drafts.js plugin's "Only show drafts in serve/watch modes" feature
			? [...collection.getFilteredByGlob("./src/content/**/*.md")]
			: [...collection.getFilteredByGlob("./src/content/**/*.md")].filter(
					(post) => {
            if(post.data.draft || (post.data.hasOwnProperty('publish') && post.data.publish === false))  {
              return false;
            } else {
              return true;
            }
          }
			  )
		).map(parseCollectionHashtags(md, eleventyConfig.globalData.tagAtlas));

	// Written for #20, this creates a collection of all tags
	// @see https://github.com/photogabble/website/issues/20
	const contentTags = (collection) =>
		Array.from(
			post(collection).reduce((tags, post) => {
				if (post?.data?.tags)
					post.data.tags.forEach(
						(tag) => !tag.includes("list/") && tags.add(tag.trim().toLowerCase())
					);
				return tags;
			}, new Set())
		)
			.map((name) => {
				return {
					name,
					slug: slugify(name),
					items: collection
						.getFilteredByTag(name)
						?.filter(
							(item) =>
								item.data.growthStage &&
								item.data.growthStage !== "stub"
						)
						.reverse(),
				};
			})
			.filter((name) => name.items.length > 0 && !name.name.includes(":"))
			.sort((a, b) => b.items.length - a.items.length);

	const contentTypes = (collection) =>
		Object.values(
			post(collection)
				.reverse()
				.reduce(
					(types, post) => {
						const section =
							post.data.growthStage &&
							post.data.growthStage === "stub"
								? "stub"
								: post.data.contentType;

						if (post.data.contentType && types[section])
							types[section].items.push(post);

						return types;
					},
					{
						stub: {
							id: "stub",
							name: "Stubs",
							slug: "stubs",
							items: [],
						},
						glossary: {
							id: "glossary",
							name: "Glossary",
							slug: "glossary",
							items: [],
						},
						thought: {
							id: "thought",
							name: "Thoughts",
							slug: "thoughts",
							items: [],
						},
						noteworthy: {
							id: "noteworthy",
							name: "Noteworthy",
							slug: "noteworthy",
							items: [],
						},
						essay: {
							id: "essay",
							name: "Essays",
							slug: "essays",
							items: [],
						},
						tutorial: {
							id: "tutorial",
							name: "Tutorials",
							slug: "tutorials",
							items: [],
						},
						project: {
							id: "project",
							name: "Projects",
							slug: "projects",
							items: [],
						},
						changelog: {
							id: "changelog",
							name: "Changelog",
							slug: "changelog",
							items: [],
						},
						resource: {
							id: "resource",
							name: "Resources",
							slug: "resources",
							items: [],
						},
            amplify: {
							id: "amplify",
							name: "Amplify",
							slug: "amplify",
							items: [],
						},
					}
				)
		);

    const mediaTypes = (collection) =>
		Object.values(
			post(collection)
				.reverse()
				.reduce(
					(types, post) => {
						const section =
							post.data.growthStage &&
							post.data.growthStage === "stub"
								? "stub"
								: post.data.mediaType;

						if (post.data.mediaType && types[section])
							types[section].items.push(post);

						return types;
					},
					{
						film: {
							id: "film",
							name: "Films",
							slug: "film",
							items: [],
						},
						tv: {
							id: "tv",
							name: "TV",
							slug: "tv",
							items: [],
						},
					}
				)
		);

	const resources = (collection) =>
		contentTypes(collection).find((type) => type.id === "resource").items;

	const resourcesPaginatedByType = (collection) => {
		let result = Array.from(
			resources(collection)
				.reduce((types, post) => {
					// console.log("resource types", types, post);
					if (!post.data.resourceType) return types;

					const id = post.data.resourceType;
          let name = id;
          switch (id) {
            case "mirrored":
              name = "mirrored code snippets"
              break;
          
            default:
              break;
          }
					const resourceType = types.get(post.data.resourceType) || {
						id,
						name: name,
						slug: `resources/${id}/`,
						items: [],
					};

					resourceType.items.push(post);
					types.set(id, resourceType);
					// console.log("resource type set", id, resourceType);
					return types;
				}, new Map())
				.values()
		).reduce(paginateContentTaxonomy(), []);
		//console.log("resource type result", result);
		return result;
	};

	const contentPaginatedByType = (collection) =>
		contentTypes(collection)
			.filter(
				(type) =>
					["project", "resource", "glossary", "amplify"].includes(type.id) ===
					false
			)
			.reduce(paginateContentTaxonomy(), []);

	const contentPaginatedByTopic = (collection) =>
		contentTags(collection).reduce(paginateContentTaxonomy("topic/"), []);

	const contentPaginatedByYearMonth = (collection) =>
		Array.from(
			post(collection)
				.filter(
					(post) => {
            var usePost = true;
            if (process.env.IS_LOCAL === "true" && (!post?.data?.tags || !post?.data?.tags.length > 0)) {
              console.log('Post has no tags', post.data.title, post.page.inputPath);
            }
						usePost = ["mirror", "resource"].includes(
							post.data.contentType
						) === false
            if (post?.data?.tags && post?.data?.tags.includes('writing')) {
              usePost = true;
            }
            usePost = post.data.contentType === "amplify" ? false : usePost;
            return usePost;
          }
				)
				.reduce((carry, post) => {
          // console.log('post writing page date page candidates ', post.data.title)
					const key = `${post.date.getFullYear()}/${post.date.getMonth()}`;
					const month = post.date.getMonth() + 1;
					const segment = carry.get(key) ?? {
						title: `Planted in ${post.date.toLocaleString("en-us", {
							month: "long",
						})}/${post.date.getFullYear()}`,
						slug: `${post.date.getFullYear()}/${padStart(
							month,
							2,
							"0"
						)}`,
						pageNumber: 1,
						totalPages: 1,
						items: [],
					};

					if (
						post.data.growthStage &&
						post.data.growthStage !== "stub"
					)
						segment.items.push(post);

					carry.set(key, segment);
					return carry;
				}, new Map())
				.values()
		);


    const amplifiesPaginatedByYearMonth = (collection) =>
		Array.from(
			post(collection)
				.filter(
					(post) => {
            var usePost = false;
						usePost = ["bookmarks", "amplify"].includes(
							post.data.contentType
						) === true
            if (post?.data?.tags && post?.data?.tags.includes('amplify')) {
              usePost = true;
            }
            return usePost;
          }
				)
				.reduce((carry, post) => {
          // console.log('post writing page date page candidates ', post.data.title)
					const key = `${post.date.getFullYear()}/${post.date.getMonth()}`;
					const month = post.date.getMonth() + 1;
					const segment = carry.get(key) ?? {
						title: `Amplified in ${post.date.toLocaleString("en-us", {
							month: "long",
						})}/${post.date.getFullYear()}`,
						slug: `${post.date.getFullYear()}/${padStart(
							month,
							2,
							"0"
						)}`,
						pageNumber: 1,
						totalPages: 1,
						items: [],
					};

					segment.items.push(post);

					carry.set(key, segment);
					return carry;
				}, new Map())
				.values()
		);


	const nowUpdates = (collection) => [
		...collection
			.getFilteredByGlob("./src/now/*.md")
			.filter((post) => !post.data.draft),
	];

	const collectSpecialTaggedContent = (prefix, collection) =>
		Array.from(
			post(collection).reduce((lists, post) => {
				if (post.data.tags) {
					for (const tag of post.data.tags) {
						if (!tag.includes(prefix)) continue;
						lists.add(tag);
					}
				}
				return lists;
			}, new Set())
		).map((list) => {
			return {
				...specialTagMeta(list),
				items: collection.getFilteredByTag(list)?.reverse(),
			};
		});

	/**
	 * Lists and Collections of posts into a special grouping.
	 *
	 * This is used for displaying special pages such as the blog roll which is essentially
	 * a special view on bookmark posts tagged with list/blogroll. Week in Review and my
	 * 365-Day project's also have special views for their output.
	 *
	 * Lists are canonically different to topics, while topics are groupings of different posts that
	 * are taxonomically similar, lists and collections are groupings of different posts
	 * that might never have overlapping topics.
	 *
	 * @param collection
	 * @return {{name: string, description: string, title: string, items: *, slug: string, url: string}[]}
	 */
	const lists = (collection) =>
		collectSpecialTaggedContent("list/", collection);

  const musicPreview = (collection) =>{
    var allMusic = collectSpecialTaggedContent("list/music", collection);
    var specificMusic = allMusic[0];
    specificMusic.items = (specificMusic.items.filter(item => item?.data?.tags?.includes("list/music") && item.data.contentType == "resource" && item.data.resourceType != "bookmarks")).slice(0, 8);
    specificMusic.name = "Music Preview";
    specificMusic.slug = "musicPreview"
    specificMusic.permalink = "/musicpreview";
    return specificMusic;
  }

	/**
	 * Post Series.
	 *
	 * This is used for grouping tightly coupled posts into a series. It's similar to lists,
	 * however while a list might include a lot of different posts under one banner, a
	 * series is one giant post that has been split over several pages. This is
	 * useful for long-running tutorial series and dev-logs.
	 *
	 * Posts within a series can display their Series Listing for quick navigation
	 * between series posts.
	 *
	 * @param collection
	 * @return {{name: string, description: string, title: string, items: *, slug: string, url: string}[]}
	 */
	const series = (collection) =>
		collectSpecialTaggedContent("series/", collection);

	return {
		post,
		contentTags,
		contentTypes, // Todo: rename writing
    mediaTypes,
		contentPaginatedByType, // Todo: rename writingPaginatedBy...
    amplifiesPaginatedByYearMonth,
		contentPaginatedByTopic,
		contentPaginatedByYearMonth,
		nowUpdates,
		resources,
		resourcesPaginatedByType,
		lists,
		series,
    musicPreview
	};
};
