require('colors');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nombres = [];
let notas = [];
let promedios = [];

function ingresarNombre(indice) {
  return new Promise((resolve) => {
    rl.question(`Estudiante ${indice + 1}: \nNombre: `.bold.blue, (nombre) => {
      nombres.push(`${nombre}`.magenta);
      resolve(nombre);
    });
  });
}

function ingresarNotas(indice) {
  return new Promise((resolve) => {
    let notasEstudiante = [];
    let contador = 1;

    function pedirNota() {
      if (contador <= 4) {
        rl.question(`Nota ${contador}: `.bold.cyan, (nota) => {
          notasEstudiante.push(parseFloat(nota));
          contador++;
          pedirNota();
        });
      } else {
        notas.push(notasEstudiante);
        resolve(notasEstudiante);
      }
    }

    pedirNota();
  });
}

function calcularPromedio(notasEstudiante) {
  let suma = notasEstudiante.reduce((acc, nota) => acc + nota, 0);
  return suma / notasEstudiante.length;
}

function mostrarReporte() {
  let aprobados = 0;
  let reprobados = 0;

  console.log('Reporte de Calificaciones:'.magenta.bold);

  for (let i = 0; i < nombres.length; i++) {
    let promedio = calcularPromedio(notas[i]);
    promedios.push(promedio);
    let estado = promedio >= 7 ? 'Aprobado'.green : 'Reprobado'.red;


    console.log(`${nombres[i].bold}: [${notas[i].map(nota => nota.toFixed(2)).join(', ').cyan}] - Promedio: ${promedio.toFixed(2).yellow} ${estado}`);
    
    if (promedio >= 7) {
      aprobados++;
    } else {
      reprobados++;
    }
  }

  console.log('\nResumen general:'.bold);
  console.log(`${aprobados} estudiante(s) aprobado(s)`.green);
  console.log(`${reprobados} estudiante(s) reprobado(s)`.red);

  rl.close();  
}

async function main() {

  rl.question('¿Cuántos estudiantes desea registrar? ', async (cantidad) => {
    cantidad = parseInt(cantidad);
    
    for (let i = 0; i < cantidad; i++) {
      await ingresarNombre(i); 
      await ingresarNotas(i); 
    }
    
    mostrarReporte();
  });
}

main();