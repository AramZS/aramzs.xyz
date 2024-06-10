const ObjectCache = require("../../lib/helpers/cache");
const fetch = require("node-fetch");
const chalk = require("chalk");
const buildData = require("./build");

let hasTimedOut = false;
const fetchUrl = async (url, timeout = 8000) => {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	try {
		console.warn(
			chalk.blue("[@photogabble/bookwyrm]"),
			chalk.green("[OK]"),
			`Fetching: ${url}`
		);
		const response = await fetch(url, { signal: controller.signal });
		clearTimeout(id);
		return response;
	} catch (e) {
		console.warn(
			chalk.blue("[@photogabble/bookwyrm]"),
			chalk.yellow("TIMEOUT"),
			"Upstream has gone away, unable to fetch bookwyrm outbox before timeout"
		);
		hasTimedOut = true;
		throw e;
	}
};

module.exports = async function () {
	if (hasTimedOut) {
		console.log(
			chalk.blue("[@photogabble/bookwyrm]"),
			chalk.yellow("NO-FETCH"),
			"Not re-fetching upstream feed. Restart process to try again"
		);
		return [];
	}

	const username = buildData.bookwyrm.username;
	const cache = new ObjectCache("bookwyrm");

	if (cache.has("books")) {
		console.log(
			chalk.blue("[@photogabble/bookwyrm]"),
			`Found Cached bookwyrm feed for [${username}]…`
		);
		return cache.get("books");
	} else {
		console.log(
			chalk.blue("[@photogabble/bookwyrm]"),
			`Fetching bookwyrm feed for [${username}]...`
		);
	}

	const shelves = ["read", "to-read", "reading"];
	const books = [];
	const authorCache = cache.get("authors") ?? [];

	for (const shelf of shelves) {
		let nextPage = 1;

		while (nextPage) {
			console.log(
				chalk.blue("[@photogabble/bookwyrm]"),
				`Fetching bookwyrm shelf [${shelf}/${nextPage}]`
			);
			let url = `https://${buildData.bookwyrm.instance}/user/${username}/shelf/${shelf}.json?page=${nextPage}`;
      let data = { next: false }
      try {
			  data = await fetchUrl(url).then((res) => res.json());
      } catch (e) {
        console.log(
          chalk.blue("[@photogabble/bookwyrm]"),
          chalk.yellow("TIMEOUT"),
          "Retrieval of Bookwyrm shelf failed, skipping."
        );
        return books;
      }

			for (const item of data.orderedItems) {
				if (!item.openlibraryKey) {
					console.warn(
						chalk.blue("[@photogabble/bookwyrm]"),
						chalk.yellow("OPEN LIBRARY KEY MISSING"),
						`Book ${item.title} <${item.id}> has no open library key set, skipping.`
					);
					continue;
				}
				const authors = await Promise.all(
					item.authors.map(async (id) => {
						const found = authorCache.find(
							(author) => author.id === id
						);
						if (found) return found;
            let data;
            try {
              data = await fetchUrl(`${id}.json`).then((res) =>
                res.json()
              );
            } catch (e) {
              console.warn(
                chalk.blue("[@photogabble/bookwyrm]"),
                chalk.yellow("FETCH FAILED"),
                "Upstream has gone away, unable to fetch bookwyrm authors before timeout"
              );
              return false
            }
						authorCache.push(data);
						return data;
					})
				);
        const authorsClean = authors.filter((author) => author !== false)
				books.push({ ...item, shelf, authorsClean });
			}

			if (data.next) {
				// data.next only exists if there are more pages.
				const matches = data.next.match(/\?page=([0-9]+)/);
				nextPage = matches[1];
			} else {
				nextPage = undefined;
			}
		}
	}

	await cache.set("books", books);
	await cache.set("authors", authorCache, cache.forever);

	return books;
};
