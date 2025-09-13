const ColorThief = require('colorthief');
const path = require('node:path');
const readingTime = require("reading-time");

/**
 * Sourced from Thomas Park's iTunes Expanding Album Effect (2012)
 * @see https://24ways.org/2010/calculating-color-contrast
 * @param color {Array<number>}
 * @return {number}
 */
function getContrastYIQ(color) {
  const r = color[0],
    g = color[1],
    b = color[2];

  return ((r*299)+(g*587)+(b*114))/1000;
}

/**
 * Sourced from Thomas Park's iTunes Expanding Album Effect (2012)
 * @param yiq {number}
 * @return {Array<number>}
 */
function getDefaultColor(yiq){
  return (yiq >= 128) ? [0, 0, 0] : [255, 255, 255];
}

/**
 * Sourced from Thomas Park's iTunes Expanding Album Effect (2012)
 * @see https://thomaspark.co/2012/12/the-itunes-expanding-album-effect-in-css-js/
 * @param color
 * @param palette
 * @return {{primary: Array<number>, secondary: Array<number>}}
 */
function inverseColors(color, palette) {
  const yiq = getContrastYIQ(color);
  let colors = [],
    primary,
    secondary;

  for (let i = 0; i < palette.length; i++) {
    if (Math.abs(getContrastYIQ(palette[i]) - yiq) > 80) {
      colors.push(palette[i]);
    }
  }

  primary = colors[0] ? colors[0] : getDefaultColor(yiq);
  secondary = colors[1] ? colors[1] : getDefaultColor(yiq);

  return {primary, secondary};
}

/**
 * Uses Colour Thief library to return a colour palette generated from
 * an image source.
 * @param src {string}
 * @param numColours {number}
 * @return {Promise<{primary: Array, palette: Array}>}
 */
const imgColours = async (src, numColours = 5) => {
  const img = path.join(process.cwd(), 'public', src);

  const primary = await ColorThief.getColor(img);
  const palette = await ColorThief.getPalette(img, numColours);

  return {
    primary,
    palette,
    inverse: inverseColors(primary, palette),
  }
};


/**
 * Takes a 11ty collection and returns a stats object for presentation
 * TODO: turn this into a 11ty plugin...
 */
const collectionStats = async (collection) => {
  const numberFormatter = new Intl.NumberFormat("en-GB", {
    maximumSignificantDigits: 3,
  });

  const stats = await collection.reduce(
    async (statsPromise, item) => {
      const stats = await statsPromise;
      stats.totalItems++;
      if (stats.firstItem === null) stats.firstItem = item;
      let content = item.content || await item.content.read() || await item.templateContent.read();
      // console.log('collectionStats item', item.url, item.fileSlug, content);
      const itemStats = readingTime(content);
      const wordCount = itemStats.words;
      const longestItemWordCount = stats.longestItem.wordCount;

      if (wordCount > longestItemWordCount) {
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
    new Promise((resolve) => resolve({
      totalWords: 0,
      totalItems: 0,
      firstItem: null,
      longestItem: {
        wordCount: 0,
        item: null,
      },
      byYear: new Map(),
    }))
  );

  // Number formatting
  //console.log('stats', stats);
  //process.exit(0);
  // @TODO used https://github.com/11ty/eleventy/issues/3630 and prob should find a better way to do this...
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

module.exports = {
  imgColours,
  collectionStats,
}
