let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_primer_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros


d3.dsv(',', 'csv_reducido.csv', d3.autoType).then(data => {

  //data = data.filter(d => d.prestacion == "VEHÍCULO MAL ESTACIONADO");

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

  /*const linkData = [
    { x: 0, y: monthData[8]},
    { x: 1, y: monthData[12]},
    { x: 2, y: periodData[8]},
    { x: 3, y: periodData[12]}
  ];*/
  //console.log(linkData)
  // quiero hacer un link (=flecha) que vaya de la parte roja de agosto a la parte gris
  


  let chart = Plot.plot({
    width:700,
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
        dy: -15,
        dx: -18,
      }),
      Plot.text(monthData.slice(2,3),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        dy: -10,
      }),

      Plot.text(periodData.slice(11,12),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        dy: -14,
        dx: -18,
      }),
      Plot.text(periodData.slice(2,3),{
        x: "x",
        y: "y",
        text: d => d3.format(",")(d.y).replace(",", "."),
        dy: -10,
      }),

    ],  
    x: {
      zero: false,
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
      tickSize: 3, // preguntar
      ticks: 6,
    },
    style: {
      padding: "10px",
      color: "black", // elegir un gris para el texto, gris oscuro
      font: "arial",
      fontSize: 14,
    },
  });

  d3.select("#chart").append(() => chart);
});

/*Poner la cantidad del mes que mas tuvo y la cantidad de diciembre para
demostrar que la diferencia no es muy grande.

Paleta de colores:
ROJO:
GRIS ROJO: EFDBDB
GRIS:



*/ 

