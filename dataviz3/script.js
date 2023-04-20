const mapaFetch = d3.json('barrios-caba.geojson');
const dataFetch = d3.dsv(';', 'b.csv', d3.autoType)
console.log(dataFetch)
Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, 
    },
    color: {
      scheme: 'ylorbr',
    },
    marks: [
      Plot.density(data, { x: 'lon', y: 'lat', fill: 'density',bandwidth: 15, thresholds: 30 }),
      Plot.geo(barrios, {
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
    facet: {
      data: data,
      x: d => d3.timeFormat('%B')(d3.timeParse('%d/%m/%Y')(d.fecha_ingreso)),
    },
    fx: {
      domain: ['March', 'December']
    },
    width: 1000
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart').append(() => chartMap)
})
