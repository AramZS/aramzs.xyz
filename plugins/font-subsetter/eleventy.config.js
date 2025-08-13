import { handleSubset } from "./plugin.js";

export function configFunction(eleventyConfig, options = {}) {
  handleSubset(eleventyConfig, options);
}
