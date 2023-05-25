// BASE DE DATOS: fichas de personajes

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

// FUNCIONES: barajar, eliminacion, proceso principal

// barajar fichas
function barajar(array) {
    array.sort(() => Math.random() - 0.5)
}

// evitando la trampa
function antiTrampa(eleccionA, eleccionB) {

    while (eleccionA === eleccionB) {
        eleccionB = parseInt(prompt("¡NO HAGAS TRAMPA! Elegi una ficha diferente."))
    }

    alert(`Encontraste a ${fichasBarajadas[eleccionB].nombre}.`)
}

// eliminando coincidencias
function comparacion(eleccionA, eleccionB) {

    if (fichasBarajadas[eleccionA].nombre === fichasBarajadas[eleccionB].nombre) {

        alert(`¡Felicitaciones! Encontraste al par ${fichasBarajadas[eleccionB].nombre}`)

        //conviritendo index a nombre para evitar cambio de numero
        let eliminacion = fichasBarajadas[eleccionA].nombre

        for (let i = 0; i < fichasBarajadas.length; i++) {

            if (fichasBarajadas[i].nombre === eliminacion) {
                fichasBarajadas.splice(i, 1)
            }

        }

        //repeticion del bucle para evitar omision de parejas contiguas
        for (let i = 0; i < fichasBarajadas.length; i++) {

            if (fichasBarajadas[i].nombre === eliminacion) {
                fichasBarajadas.splice(i, 1)
            }

        }
    }

}

//ejecucion del juego
function procesoPrincipal() {
    alert("Simulacion de memotest")

    const fichasBarajadas = personajes.concat(personajes)
    barajar(fichasBarajadas)

    while (fichasBarajadas.length != 0) {

        let eleccionA = parseInt(prompt(`Elija una ficha indicando numero del 0 al ${fichasBarajadas.length - 1}. ¡Recuerda el numero!`))
        alert(`Encontraste a ${fichasBarajadas[eleccionA].nombre}. ¡No lo olvides!`)

        let eleccionB = parseInt(prompt(`Elija otra ficha indicando numero del 0 al ${fichasBarajadas.length - 1}.`))

        antiTrampa(eleccionA, eleccionB)

        comparacion(eleccionA, eleccionB)

    }
    alert("¡¡FELICITACIONES!! Encontraste todas las parejas.")
}
