//Base de datos de fichas de personajes
class Personaje {
    constructor(nombre, imagen) {
        this.nombre = nombre
        this.imagen = imagen
    }
}

const personajes = [
    new Personaje("Daenerys Targaryen", "imagen"),
    new Personaje("Jon Snow", "imagen"),
    new Personaje("Drogon", "imagen"),
    new Personaje("Ned Stark", "imagen"),
    new Personaje("El señor de la noche", "imagen"),
    new Personaje("Robert Baratheon", "imagen"),
    new Personaje("Tyrion Lannister", "imagen"),
    new Personaje("Hodor", "imagen")
]

/******  SIMULANDO EL MEMOTEST CON PROMPTS ********/

//Funcion para barajar aleatoriamente las fichas de juego

function barajar(array) {
    array.sort(() => Math.random() - 0.5)
}
const fichasBarajadas = personajes.concat(personajes)
barajar(fichasBarajadas)

alert("Simulacion de memotest: Tenemos 16 fichas, cada una representa a un personaje que se repite dos veces (son 8 personajes). ¡OJO! La simulacion se rompe si se ingresan numeros fuera del rango")

//ciclo para repetir solicitud hasta eliminar todas las fichas

let eleccionA = 0
let eleccionB = 0

while (fichasBarajadas.length != 0) {

    //prompts para ingresar seleccion de fichas 

    eleccionA = parseInt(prompt(`Elija una ficha indicando numero del 0 al ${fichasBarajadas.length - 1}. ¡Recuerda el numero!`))
    alert(`Encontraste a ${fichasBarajadas[eleccionA].nombre}. ¡No lo olvides!`)

    eleccionB = parseInt(prompt(`Elija otra ficha indicando numero del 0 al ${fichasBarajadas.length - 1}.`))

    //while para evitar la trampa (elegir dos veces el mismo numero)

    while (eleccionA === eleccionB) {
        eleccionB = parseInt(prompt("¡NO HAGAS TRAMPA! Elegi una ficha diferente."))
    }

    alert(`Encontraste a ${fichasBarajadas[eleccionB].nombre}.`)


    //condicional para eliminar fichas coincidentes

    if (fichasBarajadas[eleccionA].nombre === fichasBarajadas[eleccionB].nombre) {

        alert(`¡Felicitaciones! Encontraste al par ${fichasBarajadas[eleccionB].nombre}`)

        /* aca debo convertir el numero de la eleccion en el nombre, ya que al aplicar splice dos veces
        me cambia le indice del segundo a eliminar */

        let eliminacion = fichasBarajadas[eleccionA].nombre

        //ciclo for para eliminar pareja encontrada
        for (let i = 0; i < fichasBarajadas.length; i++) {

            if (fichasBarajadas[i].nombre === eliminacion) {
                fichasBarajadas.splice(i, 1)
            }

        }
        for (let i = 0; i < fichasBarajadas.length; i++) {

            if (fichasBarajadas[i].nombre === eliminacion) {
                fichasBarajadas.splice(i, 1)
            }

        }
        /* El ciclo For se repite ya que si las fichas quedaban contiguas, el ciclo solo eliminaba 
        a la primera y dejaba a la segunda sin su par. */
    }
}

alert("¡¡FELICITACIONES!! Encontraste todas las parejas.")