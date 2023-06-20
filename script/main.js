// REGISTRO DE JUGADOR

const jugador = document.getElementById("jugador")
const jugadorEdad = document.getElementById("jugadorEdad")

Swal.fire({

   title: 'Registrate',
   html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
            <input type="number" id="edad" class="swal2-input" placeholder="Edad">`,
   confirmButtonText: 'Registrarse',
   focusConfirm: false,

   preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#nombre').value
      const edad = Swal.getPopup().querySelector('#edad').value
      if (!nombre || !edad) {
         Swal.showValidationMessage(`Por favor, ingrese nombre y edad`)
      }
      return { nombre: nombre, edad: edad }
   }

}).then((result) => {

   const nuevoJugador = {
      nombre: result.value.nombre,
      edad: result.value.edad
   }

   localStorage.setItem("NuevoJugador", JSON.stringify(nuevoJugador))

   const jugadorActual = JSON.parse(localStorage.getItem("NuevoJugador"))
   jugador.innerText = jugadorActual.nombre
   jugadorEdad.innerText = jugadorActual.edad

})

// ----- ACCIONES PARA SETEAR EL JUEGO -------

//accion para generar el array mazo
function generarMazo(personajes) {
   return personajes.concat(personajes)
}

//accion para barajar el array mazo
function barajarMazo(mazo) {
   mazo.sort(() => Math.random() - 0.5)
}

//GENERANDO OBJETOS FICHA
//Tomando del documento elementos de las fichas
const divs = document.getElementsByClassName("tablero__ficha") //divs contenedores
const dorso = document.getElementsByClassName("tablero__ficha--dorso") //img del trono
const retrato = document.getElementsByClassName("tablero__ficha--retrato") //img del personaje

//accion para repartir retratos ocultos
function repartirRetratos(retrato, mazo) {
   for (let i = 0; i < retrato.length; i++) {

      retrato[i].style.display = "none"
      retrato[i].src = mazo[i].imagen
      retrato[i].alt = `Retrato de ${mazo[i].nombre}`

   }
}

//constructor para las fichas
class Ficha {
   constructor(ficha, personaje, dorso, retrato, tocada) {
      this.ficha = ficha
      this.personaje = personaje
      this.dorso = dorso
      this.retrato = retrato
      this.tocada = tocada
   }
}

//funcion para generar objetos ficha en un array
function generarFichas(divs, mazo, dorso, retrato) {
   const fichas = []
   for (let i = 0; i < divs.length; i++) {

      fichas.push(new Ficha(divs[i], mazo[i], dorso[i], retrato[i], false))

   }
   return fichas
}

// ----- FUCION CONTROLADORA DEL PROCESO DE JUEGO ---------
//controladores
let elecciones = []
let eleccionA = ""
let eleccionB = ""
let victoria = 0

function controladorDelJuego(fichas) {

   for (let i = 0; i < fichas.length; i++) {

      fichas[i].ficha.addEventListener("click", () => {

         //condicional mayor, evita tocar personajes hallados
         if (fichas[i].personaje.hallado === false) {

            //condicional para segunda eleccion
            if (elecciones.length === 1 && fichas[i].tocada === false) {

               elecciones.push(fichas[i])

               fichas[i].retrato.style.display = "block"
               fichas[i].dorso.style.display = "none"

            }

            //condicional para primera eleccion
            if (elecciones.length === 0) {

               elecciones.push(fichas[i])

               fichas[i].retrato.style.display = "block"
               fichas[i].dorso.style.display = "none"
               fichas[i].tocada = true

            }

            //condicional para comparar tras segunda eleccion
            if (elecciones.length === 2) {

               eleccionA = elecciones[0].personaje.nombre
               eleccionB = elecciones[1].personaje.nombre

               //si elecciones coinciden indicamos personje hallado y reiniciamos controladores
               if (eleccionA === eleccionB) {

                  for (const ficha of fichas) {

                     if (eleccionA === ficha.personaje.nombre) {

                        ficha.personaje.hallado = true

                     }
                  }

                  elecciones = []
                  eleccionA = ""
                  eleccionB = ""
                  victoria = victoria + 2

                  //si completamos juego indicamos la victoria
                  if (victoria === fichas.length) {

                     setTimeout(() => {

                        Swal.fire({

                           title: '¡Ganaste!',
                           text: "¡Encontraste todas las fichas! ¿Jugamos denuevo?",
                           icon: 'success',
                           showCancelButton: true,
                           confirmButtonColor: '#3085d6',
                           cancelButtonColor: '#d33',
                           confirmButtonText: '¡Volver a jugar!',
                           cancelButtonText: 'Cancelar'

                           //si aceptamos volver a jugar, volteamos las fichas y reiniciamos juego
                        }).then((result) => {

                           if (result.isConfirmed) {

                              for (let i = 0; i < fichas.length; i++) {

                                 fichas[i].retrato.style.display = "none"
                                 fichas[i].dorso.style.display = "block"

                              }

                              reiniciarJuego()
                           }
                        })
                     }, 500);
                  }

                  //si personajes no coinciden volteamos las fichas y reiniciamos controladores
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

}

// Funcion de inicio: obteniendo datos de personajes, ejecutando juego

const iniciarJuego = async () => {

   const response = await fetch("/script/personajes.json")
   const personajes = await response.json()

   const mazo = generarMazo(personajes)
   barajarMazo(mazo)

   repartirRetratos(retrato, mazo)

   const fichas = generarFichas(divs, mazo, dorso, retrato)

   controladorDelJuego(fichas)

}

//funcion para reiniciar juego
const reiniciarJuego = () => {

   elecciones = []
   eleccionA = ""
   eleccionB = ""
   victoria = 0

   const tablero = document.getElementById("tablero")

   const nuevoTablero = tablero.cloneNode(true)
   tablero.parentNode.replaceChild(nuevoTablero, tablero)

   iniciarJuego()

}

iniciarJuego()
