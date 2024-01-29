"use strict";

function setAttr(token, name, value) {
	const index = token.attrIndex(name);
	const attr = [name, value];

	if (index < 0) {
		token.attrPush(attr);
	} else {
		token.attrJoin(name, attr);
	}
}

const createSkipLink = (TokenConstructor, skipName) => {
	const p_open = new TokenConstructor("paragraph_open", "p", 1);
	setAttr(p_open, "class", "skip-link-graf");
	p_open.level = 0;
	p_open.block = true;
	// p_open.children = []
	const link_open = new TokenConstructor("link_open", "a", 1);
	setAttr(link_open, "href", `#${skipName}`);
	setAttr(link_open, "id", `skip-to-${skipName}`);
	setAttr(link_open, "class", "skip-link");
	link_open.level = 1;
	link_open.meta = ["skip-link"];
	// p_open.children.push(link_open);
	const link_text = new TokenConstructor("text", "", 0);
	link_text.content = "Skip code block ▼";
	link_text.level = 2;
	// p_open.children.push(link_text);
	const link_close = new TokenConstructor("link_close", "a", -1);
	link_close.level = 1;
	// p_open.children.push(link_close);
	const p_close = new TokenConstructor("paragraph_close", "p", -1);
	p_close.block = true;
	p_close.level = 0;
	return { p_open, link_open, link_text, link_close, p_close };
};

const addSkipGrafID = (token, skipName) => {
	setAttr(token, "id", skipName);
};

const codeSkipLink = (md) => {
	md.core.ruler.push("git_skiplink", (state) => {
		const tokens = state.tokens;
		if (state.tokens.length < 1) {
			return;
		}
		// console.log("env", Object.keys(state.env));
		const pageSlug = state.env.page.fileSlug;
		// console.log(tokens[0], tokens[1])
		// We scan from the end, to keep position when new tags added.
		// Use reversed logic in links start/end match
		let i;
		for (i = tokens.length - 1; i >= 0; i--) {
			if (tokens[i].type == "fence" && tokens[i].tag == "code") {
				// console.log(tokens[i-1], tokens[i], tokens[i+1])
				if (tokens[i].meta && tokens[i].meta.includes("skip-added")) {
					// continue;
				}
				if (!state.env.page.hasOwnProperty("skipCount")) {
					state.env.page.skipCount = 0;
				}
				const skipCount = state.env.page.skipCount + 1;
				state.env.page.skipCount = skipCount;
				const skipName = `code-skip-${pageSlug}-${skipCount}`;
				let foundGraf = false;
				let nextI = 0;
				while (!foundGraf) {
					if (
						tokens[i + ++nextI] &&
						tokens[i + nextI].hasOwnProperty("type") &&
						tokens[i + nextI].type === "paragraph_open"
					) {
						foundGraf = true;
						addSkipGrafID(tokens[i + nextI], skipName);
						break;
					} else if (
						!tokens[i + nextI] ||
						!tokens[i + nextI].hasOwnProperty("type")
					) {
						// do something
						// I guess we're at the end?
						foundGraf = true;
						break;
					} else if (i + nextI - 1 >= tokens.length) {
						// I guess we're at the end?
						foundGraf = true;
						break;
					}
				}
				// console.log('Create skip link')
				tokens[i].meta = ["skip-added"];
				const { p_open, link_open, link_text, link_close, p_close } =
					createSkipLink(state.Token, skipName);
				tokens.splice(i, 0, p_close);
				tokens.splice(i, 0, link_close);
				tokens.splice(i, 0, link_text);
				tokens.splice(i, 0, link_open);
				tokens.splice(i, 0, p_open);
			}
		}
	});
};

module.exports = (md) => {
	codeSkipLink(md);
};
