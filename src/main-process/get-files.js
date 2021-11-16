const fs = require("fs");
const find = require("findit");
const Promise = require("bluebird");
const mm = Promise.promisify(require("musicmetadata"));

const getFiles = function(dir) {
  return new Promise((resolve, reject) => {
    const finder = find(dir, null);
    let files = [];
    let cover = "";

    finder.on("file", (file, stat) => {
      files.push({ file, stat });
    });

    finder.on("end", () => {
      const result = files.filter(el => isMusic(el.file));

      Promise.map(result, el => getFileInfo(el.file)).then(resolve);
    });

    finder.on("error", reject);
  });
};

const getFileInfo = function(file) {
  const stream = fs.createReadStream(file);

  return mm(stream).then(metadata =>
    Object.assign({}, metadata, {
      path: file
    })
  );
};

const isMusic = function(filename) {
  const a = filename.split(".");
  const ext = a[a.length - 1];
  const valid = ["mp3", "wav"];
  return valid.indexOf(ext) !== -1;
};

const isCoverImage = function(filename) {
  const a = filename.split(".");
  const ext = a[a.length - 1];
  const valid = ["jpg", "png"];
  return valid.indexOf(ext) !== -1;
};

module.exports = getFiles;
