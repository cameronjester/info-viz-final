import {readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import * as d3 from "d3";

/*
Read the data.
*/

// Parse the string contents as CSV and return an array of objects
function parseCSV(contents) {
  // d3.autoType attempts to automatically convert the types
  return d3.csvParse(contents, d3.autoType);
}

async function readLocal311Data() {
  // get path to the 311 csv file that is in the same directory as this file
  const path = fileURLToPath(import.meta.resolve("./boston_311_data.csv"))
  // read the contents of the file as a string
  const contents = await readFile(path, "utf-8");
  // parse the contents as CSV
  return parseCSV(contents);
}

async function readRemote311Data() {
  // url to the data
  const url = "https://data.boston.gov/dataset/8048697b-ad64-4bfc-b090-ee00169f2323/resource/9d7c2214-4709-478a-a2e8-fb2020a5bb94/download/tmpin_fdqu0.csv"
  // fetch the data
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  // read the contents of the response as a string
  const contents = await response.text();
  // parse the contents as CSV
  return parseCSV(contents);
}

// either read from data.boston.gov or from the local file
// depending on the value of the NODE_ENV environment variable
// which is set in the scripts of package.json
const rows = process.env.NODE_ENV === "production" ? await readRemote311Data() : await readLocal311Data();

/*
Process the data.

Compute any data needed for the dashboard so that the
entire CSV file does not need to be loaded in the browser.
*/

const neighborhoodToCount = Object.fromEntries(
  d3.rollups(
    rows,
    g => g.length,
    d => d.neighborhood
  )
);

const neighborhoods = Array.from(Object.keys(neighborhoodToCount)).sort();

const data = {
  neighborhoods,
  neighborhoodToCount,
  node_env: process.env.NODE_ENV,
};

/*
Output the data.
*/

process.stdout.write(JSON.stringify(data));

