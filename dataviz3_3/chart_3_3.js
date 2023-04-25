d3.dsv(';', 'c.csv', d3.autoType).then(data => {
  var counts = {};
  data.forEach(function(d) {
    if (d.domicilio_barrio in counts) {
      counts[d.domicilio_barrio]++;
    } else {
      counts[d.domicilio_barrio] = 1;
    }
  });
  var barrios = Object.keys(counts).map(function(key) {
    return { barrio: key, cantidad_denuncias: counts[key] };
  });

  let chart = Plot.plot({
    marks: [
      Plot.barY(data, {
        x: "domicilio_barrio",
        y: "",
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
