// BASE DE DATOS: fichas de personajes

class Personaje {
    constructor(nombre, imagen, hallado) {
        this.nombre = nombre
        this.imagen = imagen
        this.hallado = hallado
    }
}

const personajes = [
    new Personaje("Daenerys Targaryen", "../media/personajes/daenerys-targaryen.jpg", false),
    new Personaje("Jon Snow", "../media/personajes/jon-snow.jpg", false),
    new Personaje("Drogon", "../media/personajes/drogon.jpg", false),
    new Personaje("Ned Stark", "../media/personajes/ned-stark.webp", false),
    new Personaje("El señor de la noche", "../media/personajes/night-king.webp", false),
    new Personaje("Robert Baratheon", "../media/personajes/robert-baratheon.webp", false),
    new Personaje("Tyrion Lannister", "../media/personajes/tyrion-lannister.jpg", false),
    new Personaje("Hodor", "../media/personajes/hodor.jpg", false)
]

// SETEO DEL JUEGO

// Generando mazo y barajandolo
const mazo = personajes.concat(personajes)
const barajar = ((array) => {
    array.sort(() => Math.random() - 0.5)
})(mazo)

// tomando del documento elementos de las fichas
const divs = document.getElementsByClassName("tablero__ficha") //divs contenedores
const dorso = document.getElementsByClassName("tablero__ficha--dorso") //img del trono
const retrato = document.getElementsByClassName("tablero__ficha--retrato") //img del personaje

for (let i = 0; i < retrato.length; i++) { // repartiendo retratos ocultos

    retrato[i].style.display = "none"
    retrato[i].src = mazo[i].imagen
    retrato[i].alt = `Retrato de ${mazo[i].nombre}`

}

//generando los objetos ficha
class Ficha {
    constructor(ficha, personaje, dorso, retrato, tocada) {
        this.ficha = ficha
        this.personaje = personaje
        this.dorso = dorso
        this.retrato = retrato
        this.tocada = tocada
    }
}

const fichas = [] // Array con los objetos ficha
for (let i = 0; i < divs.length; i++) {

    fichas.push(new Ficha(divs[i], mazo[i], dorso[i], retrato[i], false))

}

// PROCESO DEL JUEGO - Acciones y eventos

let elecciones = []
let eleccionA = ""
let eleccionB = ""
let victoria = 0

for (let i = 0; i < fichas.length; i++) {

    fichas[i].ficha.addEventListener("click", () => {

        if (fichas[i].personaje.hallado === false) {

            if (elecciones.length === 1 && fichas[i].tocada === false) {

                console.log(elecciones[0].personaje.nombre)
                console.log(fichas[i].personaje.nombre)

                elecciones.push(fichas[i])

                fichas[i].retrato.style.display = "block"
                fichas[i].dorso.style.display = "none"

            }

            if (elecciones.length === 0) {

                elecciones.push(fichas[i])

                fichas[i].retrato.style.display = "block"
                fichas[i].dorso.style.display = "none"
                fichas[i].tocada = true
                console.log(fichas[i])
            }


            if (elecciones.length === 2) {

                eleccionA = elecciones[0].personaje.nombre
                eleccionB = elecciones[1].personaje.nombre

                if (eleccionA === eleccionB) {

                    for (const ficha of fichas) {

                        if (eleccionA === ficha.personaje.nombre) {

                            ficha.personaje.hallado = true
                            console.log(ficha)

                        }
                    }

                    elecciones = []
                    eleccionA = ""
                    eleccionB = ""
                    victoria = victoria + 2

                    if (victoria === fichas.length) {
                        setTimeout(() => {
                            alert("GANASTE")
                        }, 1000);
                    }

                } else {

                    setTimeout(() => {

                        for (let index = 0; index < fichas.length; index++) {

                            if (fichas[index].personaje.hallado === false) {
                                fichas[index].dorso.style.display = "block"
                                fichas[index].retrato.style.display = "none"
                                fichas[index].tocada = false
                            }

                        }

                        elecciones = []
                        eleccionA = ""
                        eleccionB = ""

                    }, 1000);
                }
            }
        }
    })
}

// REGISTRO DE JUGADOR

/*
const modal = document.getElementById("modal")
modal.showModal()

const nombre = document.getElementById("form__nombre")
const edad = document.getElementById("form__edad")
const submit = document.getElementById("form__submit")
const jugador = document.getElementById("jugador")
const jugadorEdad = document.getElementById("jugadorEdad")

submit.addEventListener("click",()=>{

    const nuevoJugador={
        nombre: nombre.value,
        edad: edad.value
    }

    localStorage.setItem("NuevoJugador",JSON.stringify(nuevoJugador))

    const jugadorActual = JSON.parse(localStorage.getItem("NuevoJugador"))
    jugador.innerText = jugadorActual.nombre
    jugadorEdad.innerText = jugadorActual.edad

})
*/

// codigo momentaneamente en desuso
/*

function comparacion(eleccionA, eleccionB) { //eliminando coincidencias

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

*/