let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros
let counts_primer_periodo = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros


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
    //height: 600,
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
      tickSize: 3, // preguntar
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


/*Poner la cantidad del mes que mas tuvo y la cantidad de diciembre para
demostrar que la diferencia no es muy grande.

Paleta de colores:
ROJO:
GRIS ROJO: EFDBDB
GRIS:


  const augustData = [{ x: 7, y: counts[7] }, { x: 7, y: counts_periodo[7] }];
Plot.link(augustData, {
        x: "x",
        y: "y",
        stroke: "#EFDBDB",
        strokeWidth: 3,
        opacity: 1,
      }),



const inicio_ago = { x: 8, y: periodData[8].y };
  const fin_ago = { x: 8, y: monthData[8].y };

  const inicio_dic = { x: 11, y: monthData[11].y };
  const fin_dic = { x: 11, y: periodData[11].y };

  
Plot.link(inicio_ago, fin_ago, {
        stroke: "green",
        strokeWidth: 5,
        opacity: 1,
      }),
      Plot.link(inicio_dic, fin_dic, {
        stroke: "#000",
        strokeWidth: 1,
        opacity: 1,
        arrow: "last",
        arrowSize: 8
      }),
*/ 

