let months2 = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts2 = Array.from({ length: 12 }, () => 0); // inicia el array counts con 12 ceros

d3.dsv(';', 'data/trafico.csv', d3.autoType).then(data => {

  data = data.filter(d => d.prestacion == "VEHÍCULO MAL ESTACIONADO");

  for (let index = 0; index < data.length; index++) { // itera todas las filas
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // checkea si el valor no es vacío
      let day = parseInt(element.split('/')[0], 10); // extrae el día
      let mes = parseInt(element.split('/')[1], 10) - 1; // 
      if (day >= 15) { // toma solo la segunda quincena
        counts2[mes]++;
      }
    }
  }

  const colors = ["#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#EFDBDB", "#F46A5C"]; // Array de colores para cada mes

  const chartData = months2.reduce((acc, month, i) => {
    const index = months2.indexOf(month);
    acc.push({ x: index, y: counts2[index], color: colors[index] });
    return acc;
  }, []);


  let chart = Plot.plot({
    marks: [
      Plot.barY(chartData, {
        x: "x",
        y: "y", 
        fill: "color", // color es el array de colores para cada mes que definimos arriba
        opacity: 0.9, 
      }),
      Plot.text(chartData.slice(11), {
        x: "x",
        y: "y", 
        text: d => d3.format(",")(d.y).replace(",", "."),
        fontSize: 14,
        fontWeight: 700,
        dy: -7,
        align: "center",
        baseline: "bottom",
    }),
    
    ],
    y: {
      grid: true,
      label: "", 
      nice: true,
      ticks: 6,
      tickFormat: d3.format("d"),
      tickSize: 3,
      scale: d3.scaleLinear().domain([0, Math.max(1, d3.max(counts))]).nice() // especificamos la escala 
    },
    x: {
      label: "", 
      tickSize: 3,
      tickFormat: d => months[d],
    },
    style: {
      fontSize: 13,
      padding: "10px",
      color: "#2f2f2f",
      background: "#f9f7f1",
    },
  });

  d3.select('#chart2').append(() => chart)
});




