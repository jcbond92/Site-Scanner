import axios from "axios";
import writeFile from "./write-file.js";

export default function (config: any, urls: any[]) {
  return new Promise(function (resolve, reject) {
    const resultData: { url: any; status: any; }[] = [];

    const testUrl = (url: string) =>
      new Promise<void>(function (resolve, reject) {
        axios
          .get(
            url,
            { timeout: 30000,
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

    console.log("Beginning to crawl links...");
    // Promise.all waits until all jobs are resolved
    Promise.allSettled(urls.map((url: any) => testUrl(url))).then((requests) => {
      if (config.test) resolve(requests);
      if (!config.test) writeFile(config, resultData);
    });
  });
}
