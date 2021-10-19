import fs, { write } from "fs";
import fetch from "node-fetch";
import axios from "axios";

const sitemap = "https://www.sitename.com/sitemap.xml";
const jsonOutputPath = "./src/results.json";
const resultData = [];

// get the sitemap from the path specified in the sitemap variable
const fetchSiteMap = () => {
  fetch(sitemap)
    .then((response) => response.text())
    .then((text) => createSitemapArray(text))
    .catch((error) => console.log(error));
};

// convert that sitemap into an array of URLs
const createSitemapArray = (sitemapString) => {
  const urlRegex =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const urlsToFilter = [
    ".png",
    ".jpg",
    ".svg",
    "www.sitemaps.org",
    "www.google.com",
  ];

  const filterRegex = new RegExp(urlsToFilter.join("|"));
  const filterTest = (string) => filterRegex.test(string);

  const urlArray = sitemapString.match(urlRegex);
  const filteredUrlArray = urlArray.filter((item) => !filterTest(item));
  checkUrlStatus(filteredUrlArray);
};

const testUrl = (url) =>
  new Promise(function (resolve, reject) {
    // Make a request for a user with a given ID
    axios
      .get(
        url,
        { timeout: 30000 },
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
          },
        }
      )
      .then(function (response) {
        resultData.push({
          url: url,
          status: response.status,
        });
        console.log(response.status, url);
        resolve();
      })
      .catch(function (error) {
        let errorStatus = null;
        if (error.response) errorStatus = error.response.status;
        if (!error.response) console.log(error);
        resultData.unshift({
          url: url,
          status: errorStatus,
        });
        console.log(errorStatus, url);
        reject();
      });
  });

// check the status codes for each the urls
const checkUrlStatus = (urls) => {
  // Promise.all waits until all jobs are resolved
  Promise.allSettled(urls.map((url) => testUrl(url))).then((requests) => {
    writeJson(resultData);
  });
};

// write a json file with the results
const writeJson = (data) => {
  const fileData = JSON.stringify(data);
  fs.writeFile(jsonOutputPath, fileData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Success! Your JSON has been file created.\n");
    }
  });
};

fetchSiteMap();
