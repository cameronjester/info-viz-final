import * as d3 from "d3";

export function bostonMap(geojson, width, height) {
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

  const projection = d3.geoAlbers()
      .fitSize([width, height], geojson);

  const path = d3.geoPath().projection(projection);

  svg.selectAll('path')
    .data(geojson.features)
    .join('path')
      .attr('d', path)
      .attr('fill', 'steelblue')
      .attr('stroke', 'white');

  return svg.node();
}
