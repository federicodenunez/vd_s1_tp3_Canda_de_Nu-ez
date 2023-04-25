d3.dsv(';', 'c.csv', d3.autoType).then(data => {
  

  let chart = Plot.plot({
    marks: [
      Plot.barY(data, {
        x: "domicilio_barrio",
        y: "categoria",
        //fill: 'country',
        //sort: 'pop',
        //title: d => d.country + '\n' + d.pop,
      }),
    ],
    marginLeft: 70,
    width: 300,
  })
  d3.select('#chart').append(() => chart)
})
