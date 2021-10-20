import fetchSitemap from "./utils/fetch-sitemap.js";

export default function (config: { url: string; path: string; test: boolean;}) {
  if (!config.url) {
    console.log(
      "No config.url provided. Add a link to a sitemap or webpage to grab links."
    );
    return false;
  }
  if (!config.path) {
    console.log(
      "No config.path provided. Add a path to output your results to."
    );
    return false;
  }

  fetchSitemap(config);
}
