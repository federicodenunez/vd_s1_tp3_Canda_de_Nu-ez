let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts = Array.from({ length: 12 }, () => 0); // inicia el array counts con 12 ceros
let counts_periodo = Array.from({ length: 12 }, () => 0); // inicia el array counts_periodo con 12 ceros

d3.dsv(',', 'data/csv_reducido.csv', d3.autoType).then(data => {


  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // Checkea si existe la fecha
      let mes = parseInt(element.split('/')[1], 10) - 1; // extrae el mes de fecha_ingreso
        counts[mes]++;
    }
  }

  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // Checkea si existe la fecha
      let day = parseInt(element.split('/')[0], 10); // extrae el dia de fecha_ingreso
      let mes = parseInt(element.split('/')[1], 10) - 1; // extrae el mes de fecha_ingreso
      if (day >= 15) { // checkea si el día es después del 15 
        counts_periodo[mes]++;
      }
    }
  }

  const monthData = months.reduce((acc, month, i) => {
    const index = months.indexOf(month);
    acc.push({ x: index, y: counts[index]});
    return acc;
  }, []);
  const periodData = months.reduce((acc, month, i) => {
    const index = months.indexOf(month);
    acc.push({ x: index, y: counts_periodo[index]});
    return acc;
  }, []);


  let chart = Plot.plot({
    width: 700,
    viewBox: "0 0 750 450",
    marks: [
      Plot.line(monthData, {
        x: "x",
        y: "y",
        stroke: "#EFDBDB",
        strokeWidth: 3,
        opacity: 1,
      }),
      Plot.areaY(monthData, {
        x: "x",
        y: "y",
        fill: "#EFDBDB",
        opacity: 0.3,
      }),
      Plot.line(periodData, {
        x: "x",
        y: "y",
        stroke: "#F46A5C",
        strokeWidth: 3,
        opacity: 1,
      }),
      Plot.areaY(periodData, {
        x: "x",
        y: "y",
        fill: "#F46A5C",
        opacity: 1,
      }),

      Plot.text(monthData.slice(11,12),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        dy: -10,
        dx: 24,
        fontSize: 14,
      }),
      Plot.text(monthData.slice(2,3),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        fontWeight: 700,
        dy: -10,
        fontSize: 18,
      }),
      Plot.text(periodData.slice(11,12),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        dy: -10,
        dx: 24,
        fontSize: 14,
      }),
      Plot.text(periodData.slice(2,3),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        fontWeight: 700,
        dy: -10,
        fontSize: 18,
      }),

    ],  
    x: {
      grid: true,
      line: false,
      nice: true,
      label: "",
      tickFormat: d => months[d],
      tickSize: 5, 
    },
    y: {
      zero: false,
      nice: true,
      line: false,
      label: "",
      tickFormat: d3.format("d"),
      domain: [0,65000],
      tickSize: 3, 
      ticks: 6,
    },
    style: {
      padding: "10px",
      color: "#2f2f2f", 
      font: "arial",
      fontSize: 14,
      background: "#f9f7f1",
    },
    
    
  });
  
  d3.select("#chart1").append(() => chart);
  d3.select("#chart1 svg")["_groups"][0][0].setAttribute("viewBox", "0 0 750 450")
});

