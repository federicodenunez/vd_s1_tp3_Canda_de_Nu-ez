Promise.all([
    d3.dsv(';', 'data/a.csv', d3.autoType),
    d3.dsv(';', 'data/a_2.csv', d3.autoType)
  ]).then(([data1, data2]) => {
    
    // Agrupa los datos por barrio de "domicilio_barrio" y cuenta cuantas veces aparece en el dataset
    const counts3 = Array.from(d3.rollup(data1, 
      v => v.length, 
      d => d.domicilio_barrio
    ));
    
    const counts4 = Array.from(d3.rollup(data2, 
      v => v.length, 
      d => d.domicilio_barrio
    ));
  
    // filtramos para solo tener los barrios con más de 10 denuncias en ambos datasets
    const filtered_counts3 = counts3.filter(d => d[1] > 10 && counts4.some(c => c[0] === d[0] && c[1] > 10));
    const filtered_counts4 = counts4.filter(d => d[1] > 10 && counts3.some(c => c[0] === d[0] && c[1] > 10));
  
    // Ordenar los valores por orden descendente de frecuencia
    filtered_counts3.sort((a, b) => d3.descending(a[1], b[1]));
    filtered_counts4.sort((a, b) => d3.descending(a[1], b[1]));
  
    // Crear el gráfico de barras
    let chart = Plot.plot({
      color: {
        legend: true,
      },
      marks: [
        
        Plot.barY(filtered_counts3, {
          
          x: d => d[0], // barrio
          y: d => d[1], // Frecuencia del barrio
          fill: '#EFDBDB', // Color de las barras para el primer conjunto de datos
          opacity: 0.9, 
          width: 20,
        }),
        Plot.barY(filtered_counts4, {
          
          x: d => d[0], // barrio
          y: d => d[1], // Frecuencia del barrio
          fill: '#F46A5C', // Color de las barras para el segundo conjunto de datos
          opacity: 0.9, 
          width: 20,
        }),
      ],
      x: {
        tickSize: 0,
      },
      y: {
        grid: true,
        domain: [0,50],
        ticks: 5,
      },
      width: 700,
      height: 400,
      style: {
        padding: "10px",
        color: "#2f2f2f",
        background: "#f9f7f1",
      },

    });
  
    d3.select('#chart3_3').append(() => chart);
  });
 
  
  