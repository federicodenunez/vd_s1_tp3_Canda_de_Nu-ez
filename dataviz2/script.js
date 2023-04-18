let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_primer_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros


d3.dsv(',', 'csv_reducido.csv', d3.autoType).then(data => {

  //data = data.filter(d => d.prestacion == "VEHÍCULO MAL ESTACIONADO");

  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // check if fecha_ingreso property exists
      let mes = parseInt(element.split('/')[1], 10) - 1; // get month from date string and subtract 1 to get index
        counts[mes]++;
    }
  }

  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // check if fecha_ingreso property exists
      let day = parseInt(element.split('/')[0], 10); // get day from date string
      let mes = parseInt(element.split('/')[1], 10) - 1; // get month from date string and subtract 1 to get index
      if (day >= 15) { // check if day is greater or equal to 15
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
  /*const MonthData_mitad = months.reduce((acc, month, i) => {
    const index = months.indexOf(month);
    acc.push({ x: index, y: counts[index]/2});
    return acc;
  }, []);

  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // check if fecha_ingreso property exists
      let day = parseInt(element.split('/')[0], 10); // get day from date string
      let mes = parseInt(element.split('/')[1], 10) - 1; // get month from date string and subtract 1 to get index
      if (day < 15) { // check if day is greater or equal to 15
        counts_primer_periodo[mes]++;
      }
    }
  }

  const primer_periodData = months.reduce((acc, month, i) => {
    const index = months.indexOf(month);
    acc.push({ x: index, y: counts_primer_periodo[index]});
    return acc;
  }, []);
  */

  let chart = Plot.plot({
    width:700,
    marks: [
      Plot.line(monthData, {
        x: "x",
        y: "y",
        stroke: "gray",
        strokeWidth: 3,
        opacity: 0.8,
      }),
      Plot.line(periodData, {
        x: "x",
        y: "y",
        stroke: "black",
        strokeWidth: 4,
        opacity: 0.8,
      }),
    ],  
    x: {
      line: false,
      nice: true,
      label: "",
      tickFormat: d => months[d],
    },
    y: {
      nice: true,
      line: false,
      domain: [0,65000],
    },
    style: {
      padding: "10px",
      color: "black",
    },
  });

  d3.select("#chart").append(() => chart);
});

/*Poner la cantidad del mes que mas tuvo y la cantidad de diciembre para
demostrar que la diferencia no es muy grande.

Tambien puedo plantear el ratio de complaints por mes
ratio = report del mes / reports anuales*/ 

/* Sacar los 0*/ 