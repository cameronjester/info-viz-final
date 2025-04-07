---
toc: false
---

```js
// imports
import * as d3 from "d3";
import {bostonMap} from "./components/boston-map.js";

// load the data
const data = FileAttachment("./data/311.json").json();
const geojson = FileAttachment("./data/boston_zip_codes.geojson").json();
```

```js
// display the data to check that it loaded
display(data);
display(geojson);
```

<div class="hero">
  <h1>Optimizing City Responses: Insights from Boston 311 Data</h1>
  <h2>Welcome to my info viz project!</h2>
  <h3>Boston 311 is an important initiaive that helps city residents take control of issues that officials might not be aware of. Blah Blah Blah fill in later </h3>
</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width, height) => bostonMap(geojson, width, height))
  }</div>
  <div class="card">${
    resize((width, height) => bostonMap(geojson, width, height))
  }</div>
</div>

---

# Reason Count by Zip Code

```js
const neighborhood = view(Inputs.select(data.neighborhoods, {label: "Please select a neighborhood", multiple: false}))
```

<div>${neighborhood}</div>


<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>


