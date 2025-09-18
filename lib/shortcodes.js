const markdown = require("./helpers/markdown");
const Image = require("@11ty/eleventy-img");
const outdent = require("outdent");
const { stringifyAttributes } = require("./helpers/stringify-attributes");
const fs = require('fs')

module.exports = {
	/**
	 * @see https://gist.github.com/dirtystylus/d488ea82fec9ebda8308a288015d019b
	 * @param {string} image
	 * @param {string} caption
	 * @param {string} alt
	 * @param {string} className
	 * @returns {string}
	 */
	figure: (image, caption, alt, className) => {
		const classMarkup = className ? ` class="${className}"` : "";
		const captionMarkup = caption
			? `<figcaption>${markdown.render(caption)}</figcaption>`
			: "";
		const imgMarkup = alt
			? `<img src="${image}" alt="${alt}" />`
			: `<img src="${image}" />`;
		return `<figure${classMarkup}>${imgMarkup}${captionMarkup}</figure>`;
	},

	image: async (
		src,
		alt,
		className = undefined,
		widths = [400, 800, 1280],
		formats = ["webp", "jpeg", "png"],
		sizes = "100vw"
	) => {
    let sharpOptions = {};
    alt = alt || "";
    if (src.startsWith("public/img/posts/http")){
      let newSrc = src.replace("public/img/posts/","");
      return `<img src="${newSrc}" alt="${alt}" loading="lazy" />`
    }
    if (!fs.existsSync(src)){
      console.error(`Image not found: ${src}`);
      return `<!-- Image ${src} not found -->`;
    }
    // grab the file extension from the src string
    const fileExtension = src.split(".").pop().toLowerCase();
    if (fileExtension === "gif" && !formats.includes("gif")) {
      formats = ["gif"];
      sharpOptions = { animated: true };
    }
		const imageMetadata = await Image(src, {
			widths: [...widths],
			formats: [...formats, null],
			outputDir: "_site/img/optimised",
			urlPath: "/img/optimised",
			sharpOptions,
		});

		const sourceHtmlString = Object.values(imageMetadata)
			// Map each format to the source HTML markup
			.map((images) => {
				// The first entry is representative of all the others
				// since they each have the same shape
				const { sourceType } = images[0];

				// Use our util from earlier to make our lives easier
				const sourceAttributes = stringifyAttributes({
					type: sourceType,
					// srcset needs to be a comma-separated attribute
					srcset: images.map((image) => image.srcset).join(", "),
					sizes,
				});

				// Return one <source> per format
				return `<source ${sourceAttributes}>`;
			})
			.join("\n");

		const getLargestImage = (format) => {
			const images = imageMetadata[format];
			return images[images.length - 1];
		};

		const largestUnoptimizedImg = getLargestImage(formats[0]);
    const attrForImage = {
			src: largestUnoptimizedImg.url,
			// width: largestUnoptimizedImg.width,
			// height: largestUnoptimizedImg.height,
			alt,
			loading: "lazy",
			decoding: "async",
		}; 
    if (largestUnoptimizedImg.width < largestUnoptimizedImg.height){
      attrForImage.width = largestUnoptimizedImg.width
    }
    if (largestUnoptimizedImg.height < largestUnoptimizedImg.width){
      attrForImage.height = largestUnoptimizedImg.height
    }
		const imgAttributes = stringifyAttributes(attrForImage);
		const pictureAttributes = stringifyAttributes({
			class: className,
		});
		const imgHtmlString = `<img ${imgAttributes} ${pictureAttributes} width-check="${largestUnoptimizedImg.width}" >`;

		const picture = `<picture ${pictureAttributes}>${sourceHtmlString}${imgHtmlString}</picture>`;

		return outdent`${picture}`;
	},

	version: () => String(Date.now()),
};
