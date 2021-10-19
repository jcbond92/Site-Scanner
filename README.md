# Caterpillar Crawl

Caterpillar crawl is a web scraping tool that makes easy to quickly validate large amounts of data on your websites.

- Check for 200 responses on all your site's resources and pages
- **Coming soon:** Quickly all of your redirects

## Installation

```
npm install caterpillar-crawl
```

## Usage

### Status Checker

Status checker is a tool that will request and parse a sitemap.xml file (or any HTML page), and make HTTP requests to all of the links it finds, returning their status codes. The utility outputs all the results to a json file.

### statusChecker(options)

- `options` <[Object]>
  - `url` <?[string]> the path to your sitemap.xml or the page you want to grab links off of, **required**
  - `path` <?[string]> the path you want to output your JSON file with results to, **required**

### Example Usage

```js
import { statusChecker } from "caterpillar-crawl";

const config = {
  url: "https://www.sitename.com/sitemap.xml",
  path: "./examples/results.json",
};

statusChecker(config);
```
