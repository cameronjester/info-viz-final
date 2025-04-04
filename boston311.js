import * as d3 from "d3";

const dataPath = "/src/data/boston_311_data.csv"; // Ensure correct path

async function loadData() {
  const data = await d3.csv(dataPath); // Fetch the CSV
  return data;
}

export default loadData;