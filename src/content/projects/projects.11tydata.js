module.exports = {
  layout: "layouts/page-project.njk",
  contentType: 'project',
  permalinkBase: 'projects',
  language: null,
  status: null,
  collections: ["projects"], // https://hamatti.org/snacks/fix-templatecontent-too-early-in-eleventy/
  eleventyComputed: {
    permalink(data) {
      return `projects/${this.slugify(data.title)}/`
    }
  }
};
