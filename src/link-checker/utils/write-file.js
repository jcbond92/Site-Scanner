import fs, { write } from "fs";

export default function (config, data) {
  return new Promise(function (resolve, reject) {
    const fileData = JSON.stringify(data);
    fs.writeFile(config.path, fileData, (err) => {
      if (err) {
        console.error("Bad file path in config.path!", err);
        reject("error");
      } else {
        console.log("Success! Your JSON has been file created.\n");
        const fileExists = fs.existsSync(config.path);
        resolve(fileExists);
      }
    });
  });
}
