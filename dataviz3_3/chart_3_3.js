d3.dsv(';', 'c.csv', d3.autoType).then(data => {
  
  stateage = {
    const data = await FileAttachment("a.csv").csv({typed: true});
    const ages = data.columns.slice(1); // convert wide data to tidy data
    return Object.assign(ages.flatMap(age => data.map(d => ({state: d.name, age, population: d[age]}))), {ages});
  }

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
