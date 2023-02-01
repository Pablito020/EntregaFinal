const stockProductos = [
    {
      id: 1,
      nombre: "Minecraft",
      cantidad: 1,
      desc: "Juego plataformero, mundo abierto, creatividad",
      precio: 2400,
      img: "img/Minecraft.png",
    },
    {
      id: 2,
      nombre: "Dragon Ball Fighter Z",
      cantidad: 1,
      desc: "Luchas con los mejores graficos junto a Goku y sus amigos!",
      precio: 6800,
      img: "img/dbzf.jpg",
    },
    {
      id: 3,
      nombre: "Call Of Duty MWII",
      cantidad: 1,
      desc: "Juego plataformero, guerra mundial 2",
      precio: 4800,
      img: "img/cod.jpg",
    },
    {
      id: 4,
      nombre: "Naruto Shippuden Ultimate Ninja Storm 4",
      cantidad: 1,
      desc: "Vive la experiencia de Naruto",
      precio: 3400,
      img: "img/naruto.jpg",
    },
    {
      id: 5,
      nombre: "Fifa 23",
      cantidad: 1,
      desc: "Juego multiplataformero, deportes, agiilidad, futbol soccer",
      precio: 12000,
      img: "img/fifa.png",
    },
    {
      id: 6,
      nombre: "Demon Slayer",
      cantidad: 1,
      desc: "Vistete para cazar demonios junto a los personajes de la serie!",
      precio: 7600,
      img: "img/demonslayer.jpg",
    },
    {
      id: 7,
      nombre: "League of Legends Codes",
      cantidad: 1,
      desc: "No compres esto por tu bien, te aseguro sera un error",
      precio: 3200,
      img: "img/league.jpg",
    },
    {
      id: 8,
      nombre: "Alien Insolation",
      cantidad: 1,
      desc: "Escondete, no dejes que te vea, mantente callado...",
      precio: 3000,
      img: "img/alieninsolation.jpg",
    },
    {
      id: 9,
      nombre: "Dead Space",
      cantidad: 1,
      desc: "Juego de terror orientado en la tercera temporada de Dead Space",
      precio: 1400,
      img: "img/deadspace.jpg",
    },
    {
      id: 10,
      nombre: "Hogwards Legacy",
      cantidad: 1,
      desc: "Aun no salio, pero que buen juego",
      precio: 14000,
      img: "img/hl.jpg",
    },
    {
        id: 11,
        nombre: "Elden Ring",
        cantidad: 1,
        desc: "Estrategia, juego de mundo abierto, singleplayer",
        precio: 8000,
        img: "img/elden.jpg",
      },
      {
        id: 12,
        nombre: "Death Stranding",
        cantidad: 1,
        desc: "Mundo abierto, estrategia, supervivencia, singleplayer, modo historia",
        precio: 7200,
        img: "img/death.jpg",
      },
  ];
  let carrito = [];  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });

  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card col-12 col-lg-2 mtb centro">
      <img class="card-img-top" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const juegoId = id;
    carrito = carrito.filter((juego) => juego.id !== juegoId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || cliente == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_10rqys5';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }

   //Voy a hacer un catch y fetch por si las moscas para que me tome lo que es el api.json por si el local no me lo toma

   //document.addEventListener('DOMContentLoaded', () =>{ fetchData() })

  //const fetchData = async () => { try{ const respuesta = await fetch('api.json') const data = await respuesta.json()
  //console.log(data)} catch (error) {
  //console.log(error)  } }