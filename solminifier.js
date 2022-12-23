const fs = require("fs");

const main = (solFilePath, errorsJSONPath) => {
  let solContent = fs.readFileSync(solFilePath).toString();
  let errors = require(errorsJSONPath);

  for (let errCode in errors) {
    solContent = solContent.replaceAll(errors[errCode], errCode);
  }

  solContent = `// SPDX-License-Identifier: MIT\n\n${solContent}`;

  solContent = solContent
    .split("\n")
    .map(e => e.trimEnd())
    .join("\n")
    .replace(/[\r\n]{4,}/g, '\n');

  fs.writeFileSync(
    solFilePath.substring(0, solFilePath.length - 4) + ".min.sol",
    `${solContent}\n`
  )
}

main(
  process.argv[process.argv.length - 2],
  process.argv[process.argv.length - 1],
);
