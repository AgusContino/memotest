// BASE DE DATOS: fichas de personajes

class Personaje {
    constructor(nombre, imagen, seleccionado) {
        this.nombre = nombre
        this.imagen = imagen
        this.seleccionado = seleccionado
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

// REGISTRO DE JUGADOR

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

// SETEO DEL JUEGO

const mazo = personajes.concat(personajes)

const barajar = ((array) => {
    array.sort(() => Math.random() - 0.5)
})(mazo)

const fichas = document.getElementsByClassName("tablero__ficha") //divs contenedores

const dorso = document.getElementsByClassName("tablero__ficha--dorso") //img del trono

for (let i = 0; i < fichas.length; i++) {

    let retrato = document.createElement("img") //img de personaje
    fichas[i].append(retrato)
    retrato.style.display = "none"
    retrato.src = mazo[i].imagen
    retrato.alt = `Retrato de ${mazo[i].nombre}`

    fichas[i].addEventListener("click", () => {

        retrato.style.display = "block"
        dorso[i].style.display = "none"

    })

}



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