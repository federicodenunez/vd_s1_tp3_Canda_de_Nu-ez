const mapaFetch2 = d3.json('barrios-caba.geojson')
const dataFetch2 = d3.dsv(';', 'data/a_2.csv', d3.autoType)

Promise.all([mapaFetch2, dataFetch2]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  (reclamosPorBarrio.get(nombreBarrio) || []).length
    d.properties.DENUNCIAS = cantReclamos

  })

  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 8,
      scheme: 'reds',
      label: 'Cantidad de denuncias, 15/12 - 31/12',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO + "\n" + d.properties.DENUNCIAS,
          fill: "WHITE",
          stroke: "#262626",
          textAnchor: "center",
          dx: 1 ,
          filter: (d) => d.properties.DENUNCIAS > 10
        })
      )
    ],
    style: {
      fontSize: 14,
      padding: "10px",
      color: "#2f2f2f",
      background: "#f9f7f1",
    }
  })
  /* Agregamos al DOM la visualización chartMap */
  d3.select("#chart3_2").append(() => chartMap)

  let a = d3.select("#chart3_2 svg")["_groups"][0][0];
  a.classList.add("fondo_leyenda");
})
