let months2 = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let counts2 = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros

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
        y: "y", // utilizamos "y" para el eje y
        fill: "color", // set the fill attribute to the "color" property of the chartData object
        opacity: 0.9, 
      }),
      Plot.text(chartData.slice(11), {
        x: "x",
        y: "y", // utilizamos "y" para el eje y
        text: d => d3.format(",")(d.y).replace(",", "."),
        fontSize: 14,
        dy: -7,
        align: "center",
        baseline: "bottom",
    }),
    
    ],
    y: {
      grid: false,
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
      fontSize: 14,
      padding: "10px",
      color: "#2f2f2f",
      background: "#f9f7f1",
    },
  });

  // Add chart to the div#chart in index.html
  d3.select('#chart2').append(() => chart)
});


/*Este código toma un archivo CSV llamado '147_vehiculos_mal_estacionados.csv' y lo procesa para generar un gráfico de barras que muestra el número de vehículos mal estacionados por mes.

Primero, carga el archivo CSV utilizando D3 y convierte los valores numéricos en sus respectivos tipos de datos utilizando d3.autoType. Luego, crea un array llamado counts con 12 valores iniciales de cero para representar los meses del año.

El código luego itera sobre cada objeto en el array data y comprueba si la propiedad fecha_ingreso existe en el objeto. Si existe, extrae el mes de la fecha, lo convierte en un índice (restando uno para que se ajuste al índice de un array) y agrega uno al valor correspondiente en el array counts.

A continuación, se crea un array colors que contiene colores para cada mes. El código luego combina los valores de months, counts y colors en un objeto chartData. El objeto chartData tiene propiedades x para el nombre del mes, y para la cantidad de vehículos mal estacionados en el mes y color para el color correspondiente del mes.*/


