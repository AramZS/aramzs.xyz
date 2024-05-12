const { toTitleCase, strToSlug } = require("./helpers");
const metadata = require("../src/_data/metadata");
const listData = require("../src/_data/lists-meta");
const readingTime = require("reading-time");
const { DateTime } = require("luxon");
const path = require('node:path');
const fs = require('node:fs');
const util = require("util");
/**
 * Filters
 * @link https://www.11ty.dev/docs/filters/
 * @see https://github.com/11ta/11ta-template/blob/main/utils/filters.js
 */

/**
 * buttons may be an array or a string, when it's an array always return the
 * first element.
 * @param buttons {Array<string>|string}
 * @return {string}
 */
const firstBtn = (buttons) => Array.isArray(buttons)
  ? buttons[0]
  : buttons;

/**
 * dateToFormat allows specifying display format at point of use.
 * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }} uses .timestamp
 * from the _data/build.js export and formats it via dateToFormat.
 * Another usage example used in layouts: {{ post.date | dateToFormat("LLL dd, yyyy") }}
 * And finally, example used in /src/posts/posts.json to format the permalink
 * when working with old /yyyy/MM/dd/slug format from WordPress exports.
 *
 * @param date {Date}
 * @param format {string}
 * @returns {string}
 */
const dateToFormat = (date, format) => {
	return DateTime.fromJSDate(new Date(date), {
		zone: "utc",
	}).toFormat(String(format));
};

/**
 * Universal slug filter strips unsafe chars from URLs
 *
 * @param string {string}
 * @returns {string}
 */
const slugify = (string) => strToSlug(string);

/**
 * Takes a list of slugs and returns them converted to title case.
 *
 * @param list {Array<string>}
 * @return array {Array<{slug:string, title:string}>}
 */
const formatSlugList = (list) => {
	return list.map((slug) => {
		return {
			slug,
			title: toTitleCase(slug),
		};
	});
};

const findBySlug = (collection, slug) => {
	return !slug ? collection : collection.find((item) => item.slug === slug);
};

const values = (obj, key) => obj[key];

const randomItems = (arr, count) => {
	if (!Array.isArray(arr)) throw new Error("arr must be array");
	return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
};

const whereKeyEquals = (collection, key, value) =>
	collection.filter(
		(item) => item[key] === value || (item.data && item.data[key] === value)
	);

const whereKeyFalse = (collection, key) =>
	collection.filter(
		(item) => item[key] === false || typeof item[key] === "undefined"
	);

const whereFileSlugEquals = (collection, value) => {
	return collection
		? collection.find((item) => item.fileSlug === value)
		: undefined;
};

/**
 * Is the given tag a special tag? Special tags are used to denote content that belongs to a list
 * or series with the prefix: list/ or series/. Other special tags might exist in-future, but
 * at time of writing only the aforementioned are used.
 *
 * @param tag {string}
 * @return {boolean}
 */
const isSpecialTag = (tag) => tag && tag.includes("/");

/**
 * Takes a special tag and returns its meta-data.
 *
 * @todo make this work for all tags...
 * @param list {string}
 * @return {{title: string, description: string, name: string, slug: string, url: string }}
 */
const specialTagMeta = (list) => {
	const idx = list.lastIndexOf("/");
	const name = list.substring(idx + 1);
	const slug = strToSlug(name);
	const meta = listData[list] ?? { title: name, description: "" };
	const permalink = meta.permalink ?? `/lists/${slug}/`;

	return {
		...meta,
		name,
		slug,
		permalink,
	};
};

/**
 * Takes a list of tags and returns them mapped as topic or list items.
 *
 * @param list {Array<string>}
 * @returns {Array<{title: string, description: string, slug:string, url: string}>}
 */
const formatTagList = (list) => {
	return list
		? list.map((tag) => {
				if (isSpecialTag(tag)) {
					return specialTagMeta(tag);
				}

				const slug = strToSlug(tag);

				return {
					title: tag,
					description: "",
					slug,
					permalink: `/topic/${slug}`,
				};
		  })
		: [];
};

/**
 * Takes a list and returns the limit number of items.
 *
 * @param array {Array<any>}
 * @param limit {number}
 * @returns {Array<any>}
 */
const limit = (array, limit) => array.slice(0, limit);

const excludeStubs = (collection) =>
	collection.filter(
		(item) => item.data.growthStage && item.data.growthStage !== "stub"
	);

const excludeType = (collection, type) => {
	return !type
		? collection
		: collection.filter((item) => item.data.contentType !== type);
};

const excludeTypes = (collection, types = []) =>
	types.length > 0
		? collection.filter(
				(item) => {
          if (!types){
            return true;
          }
          return types.includes(item.data.contentType) === false}
		  )
		: collection;

const onlyGrowthStages = (collection, stages) => {
	if (!Array.isArray(stages)) stages = [stages];
	return collection.filter((item) =>
		stages.includes(item.data.growthStage ?? "unknown")
	);
};

const onlyTypes = (collection, types = []) =>
	types.length > 0
		? collection.filter((item) => types.includes(item.data.contentType))
		: collection;

const onlyType = (collection, type) => {
	return !type
		? collection
		: collection.filter((item) => item.data.contentType === type);
};

const withoutFeatured = (collection) =>
	collection.filter((item) => {
		return !item.data.featured;
	});

const onlyFeatured = (collection) =>
	collection.filter((item) => {
		return item.data.featured && item.data.featured === true;
	});

const debug = (...args) => {
	console.log('debug filter', ...args);
	debugger;
};

const inspect = (thing) =>
	console.log( 'inspect filter',
		util.inspect(thing, {
			showHidden: false,
			depth: null,
			colors: true,
		})
	);

const ogImageFromSlug = (slug) => {
	const filename = `${slug}.jpg`;
	const filepath = path.join(process.cwd(), `_assets/og-image/${filename}`);

	return fs.existsSync(filepath)
		? `${metadata.url}/img/og-image/${filename}`
		: null;
};

/**
 * Check if a given tag list contains a slug.
 *
 * @param tags {Array<string>}
 * @param slug {string}
 * @returns {boolean}
 */
const includesTag = (tags, slug) =>
	tags.find((tag) => tag.toLowerCase() === slug.toLowerCase()) !== undefined;

/**
 * Excludes special tags denoted by `:`
 *
 * @param tags
 * @returns {*}
 */
const excludeSpecialTags = (tags) =>
	tags.filter((tag) => tag && tag.includes(":") === false);

/**
 * Group a collection by year.
 *
 * @param {Array<any>} collection
 * @returns {Map<number, Array<any>>}
 */
const groupByYear = (collection) =>
	collection.reduce((carry, post) => {
		const year = post.date.getFullYear();
		const group = carry.get(year) ?? [];
		group.push(post);
		carry.set(year, group);
		return carry;
	}, new Map());

  // Match logic from contentPaginatedByYearMonth
  // @TODO: Abstract this filter function into its own function that can go in the `lib` and be shared by this and the other function that uses it. 
  const filterByWritingOnly = (collection) => collection.filter(
    (post) => {
      var usePost = true;
      usePost = ["mirror", "resource"].includes(
        post.data.contentType
      ) === false
      if (post?.data?.tags.includes('writing')) {
        usePost = true;
      }
      usePost = post.data.contentType === "amplify" ? false : usePost;
      return usePost;
    }
  )
/**
 * Group a collection by month.
 * @param {Array<any>} collection
 * @returns {Map<number, Array<any>>}
 */
const groupByMonth = (collection) =>
	collection.reduce((carry, post) => {
		const month = post.date.getMonth();
		const group = carry.get(month) ?? [];
		group.push(post);
		carry.set(month, group);
		return carry;
	}, new Map());

/**
 * Group a collection by item data key.
 * @param {Array<any>} collection
 * @param {string} key
 * @return {Map<string, Array<any>>}
 */
const groupByKey = (collection, key) => {
	let groupedCollection = collection.reduce((carry, post) => {
		const value = post.data[key] ?? "unknown";
		const group = carry.get(value) ?? [];
		group.push(post);
		carry.set(value, group);
		return carry;
	}, new Map());
	return groupedCollection;
};

const padStart = (str, len, filler) => String(str).padStart(len, filler);

const ratingToStars = (rating, max = 5) => {
	if (rating > max) rating = max;
	return "★".repeat(rating).concat(Math.ceil(rating) !== rating ? "½" : "");
};

const seriesPosts = (collection, name) => {
	const key = `series:${name}`;
	if (!collection.hasOwnProperty(key)) return undefined;
	const posts = collection[key] ?? [];

	const collator = new Intl.Collator("en");

	return posts.sort((a, b) => {
		if (a.data.group && b.data.group)
			return collator.compare(a.data.group, b.data.group);

		if (!a.data.group && b.data.group) return -1;
		if (a.data.group && !b.data.group) return 1;

		return 0;
	});
};

const isArray = (arr) => Array.isArray(arr);

const chunkArray = (arr, max = 8) => arr.reduce((carry, item) => {
  if (carry.length === 0) {
    carry.push([item]);
    return carry;
  }

  if (carry[carry.length-1].length + 1 > max) {
    carry.push([item]);
    return carry;
  }

  carry[carry.length-1].push(item);
  return carry;
}, []);

/**
 * Takes a 11ty collection and returns a stats object for presentation
 * TODO: turn this into a 11ty plugin...
 */
const collectionStats = (collection) => {
	const numberFormatter = new Intl.NumberFormat("en-GB", {
		maximumSignificantDigits: 3,
	});

	const stats = collection.reduce(
		(stats, item) => {
			stats.totalItems++;
			if (stats.firstItem === null) stats.firstItem = item;
      let content = item.templateContent || item.content;
			const itemStats = readingTime(content);
			const wordCount = itemStats.words;

			if (wordCount > stats.longestItem.wordCount) {
				stats.longestItem.wordCount = wordCount;
				stats.longestItem.item = item;
			}

			stats.totalWords += wordCount;

			// Year stats
			const year = item.date.getFullYear();
			const yearStats = stats.byYear.get(year) ?? {
				year,
				totalWords: 0,
				totalItems: 0,
			};

			yearStats.totalItems++;
			yearStats.totalWords += wordCount;

			stats.byYear.set(year, yearStats);

			return stats;
		},
		{
			totalWords: 0,
			totalItems: 0,
			firstItem: null,
			longestItem: {
				wordCount: 0,
				item: null,
			},
			byYear: new Map(),
		}
	);

	// Number formatting

	stats.avgWords =
		stats.totalItems > 0
			? numberFormatter.format(stats.totalWords / stats.totalItems)
			: 0;

	stats.totalWords = numberFormatter.format(stats.totalWords);
	stats.totalItems = numberFormatter.format(stats.totalItems);
	stats.longestItem.wordCount = numberFormatter.format(
		stats.longestItem.wordCount
	);

	stats.byYear = Array.from(stats.byYear.values())
		.map((year) => {
			return {
				...year,
				totalWords: numberFormatter.format(year.totalWords),
				totalItems: numberFormatter.format(year.totalItems),
				avgWords:
					year.totalItems > 0
						? numberFormatter.format(
								year.totalWords / year.totalItems
						  )
						: 0,
			};
		})
		.sort((a, b) => a.year - b.year);

	return stats;
};

/**
 * Takes a list of names or pages and returns a map with them sorted into A-Z + #, ? buckets.
 *
 * @see https://github.com/benjifs/benji/blob/65e82aade03efde17cb04c31ce4f13d59dbfeff3/.eleventy.js#L71-L85
 * @param collection
 * @returns {Map<any, any>}
 */
const alphabetSort = (collection) => {
	const alphabet = [
		"#",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"?",
	];

	const sorted = alphabet.reduce((res, letter) => {
		res.set(letter, []);
		return res;
	}, new Map());

	for (let item of collection) {
		const title = typeof item === "string" ? item : item?.data?.title;

		if (!title) continue;

		let key = (title[0] || "?").toUpperCase();
		key = alphabet.includes(key) ? key : !isNaN(key) ? "#" : "?";
		sorted.get(key).push(typeof item === "string" ? title : item);
	}
	return sorted;
};

const dateSort = (arrayOfObjects, key) => {
	arrayOfObjects.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b[key]) - new Date(a[key]);
	});
	return arrayOfObjects;
};

const mixedDataSortWatchedMedia = (arrayOfObjects) => {
	let standardizedArrayOfObjects = arrayOfObjects.map((item) => {
		if (item.data) {
			let newObject = {
				...item.data,
				content: item.content,
				date: item.date,
			};
			return newObject;
		}
		return item;
	});
	const sorted = dateSort(standardizedArrayOfObjects, "watchedDate");
	return sorted;
};

const isoDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString();
}

const json = (object) => JSON.stringify(object);

const joinList = (list) => {
  if (!Array.isArray(list)) return list;

  const items = [...list];

  const last = items.pop();
  const remaining = items.length > 1
    ? items.join(', ')
    : items.pop();
  return `${remaining} and ${last}`;
};

const stripAllQuotes = (str) => {
    // Replace smart quotes first
    str = str.replace(/[\u2018\u2019]/g, "'"); // Replacing left and right single smart quotes with regular single quotes
    str = str.replace(/[\u201C\u201D]/g, '"'); // Replacing left and right double smart quotes with regular double quotes

    // Replace regular quotes
    str = str.replace(/['"]/g, ''); // Removing both single and double quotes

    return str;
}

module.exports = {
	dateToFormat,
	slugify,
	isSpecialTag,
	specialTagMeta,
	formatSlugList,
	findBySlug,
	values,
	whereKeyEquals,
	whereFileSlugEquals,
	whereKeyFalse,
	formatTagList,
	limit,
	excludeStubs,
	excludeType,
	excludeTypes,
	onlyGrowthStages,
	onlyTypes,
	onlyType,
	withoutFeatured,
	onlyFeatured,
	debug,
	ogImageFromSlug,
	includesTag,
	excludeSpecialTags,
	groupByYear,
	groupByMonth,
	groupByKey,
  filterByWritingOnly,
	padStart,
	ratingToStars,
	seriesPosts,
	collectionStats,
	alphabetSort,
	randomItems,
	isArray,
	inspect,
	mixedDataSortWatchedMedia,
  isoDate,
  firstBtn,
  json,
  joinList,
  chunkArray,
  stripAllQuotes
};
