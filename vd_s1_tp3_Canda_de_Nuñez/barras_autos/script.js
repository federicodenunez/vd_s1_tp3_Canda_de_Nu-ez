let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let counts = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros

d3.dsv(';','sistema-unico-de-atencion-ciudadana-2021.csv', d3.autoType).then(data => {

  data = data.filter(d => d.prestacion == "VEHÍCULO MAL ESTACIONADO");

  for (let index = 0; index < data.length; index++) {
    const element = data[index]["fecha_ingreso"];
    if (element != undefined) { // check if fecha_ingreso property exists
      let mes = parseInt(element.split('/')[1], 10) - 1; // get month from date string and subtract 1 to get index
      console.log(mes); 
      counts[mes]++;
    }
  }
  console.log(counts);

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#1f77b4", "#ff7f0e"]; // array of colors for each month

  const chartData = months.map((month, i) => ({ x: month, y: counts[i], color: colors[i] })).sort((a, b) => months.indexOf(a.x) - months.indexOf(b.x));

  let chart = Plot.plot({
    marks: [
      Plot.barY(chartData, {
        x: "x",
        y: "y", // utilizamos "y" para el eje y
        fill: "color" // set the fill attribute to the "color" property of the chartData object
      })
    ],
    y: {
      grid: true,
      scale: d3.scaleLinear().domain([0, Math.max(1, d3.max(counts))]).nice() // especificamos la escala lineal de D3
    },
  });


  // Add chart to the div#chart in index.html
  d3.select('#chart').append(() => chart)
});








/*Este código toma un archivo CSV llamado '147_vehiculos_mal_estacionados.csv' y lo procesa para generar un gráfico de barras que muestra el número de vehículos mal estacionados por mes.

Primero, carga el archivo CSV utilizando D3 y convierte los valores numéricos en sus respectivos tipos de datos utilizando d3.autoType. Luego, crea un array llamado counts con 12 valores iniciales de cero para representar los meses del año.

El código luego itera sobre cada objeto en el array data y comprueba si la propiedad fecha_ingreso existe en el objeto. Si existe, extrae el mes de la fecha, lo convierte en un índice (restando uno para que se ajuste al índice de un array) y agrega uno al valor correspondiente en el array counts.

A continuación, se crea un array colors que contiene colores para cada mes. El código luego combina los valores de months, counts y colors en un objeto chartData. El objeto chartData tiene propiedades x para el nombre del mes, y para la cantidad de vehículos mal estacionados en el mes y color para el color correspondiente del mes.*/


