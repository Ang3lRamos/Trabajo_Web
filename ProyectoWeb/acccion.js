const contenedor = document.querySelector('tbody')
let resultados = ''

const modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'))
const formUsuario = document.querySelector('form')

const usuario = document.getElementById('usuario')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const direccion = document.getElementById('direccion')
const telefono = document.getElementById('telefono')
const email = document.getElementById('email')
const password = document.getElementById('password')


btnCrear.addEventListener('click', ()=>{
    usuario.value = ''
    nombre.value = ''
    apellido.value = ''
    direccion.value = ''
    telefono.value = ''
    email.value = ''
    password.value = ''
    modalUsuario.show()
    opcion = 'crear'
})

function logout(){
    sessionStorage.clear();
    location.href("login.html");
}

function auth(){
    const token = sessionStorage.getItem("token");
    if(token | token === undefined){
        location.href("login.html");
    }
}
function authLogin(){
    const token = sessionStorage.getItem("token");
    if(token){
        location.href("dashboard.html");
    }
}
function defName(){
    const dataUser = sessionStorage.getItem("user");
    const user = JSON.parse(dataUser);
    let userName = `<h5>`+user.usuario.toUpperCase()+`</h5>`;
    $("#content-username").append(userName);
}

const mostrar = (usuarios) => {
    usuarios.forEach(usuario => {
        resultados += `<tr>
                            <td>${usuario.usuario}</td>
                            <td>${usuario.nombres}</td>
                            <td>${usuario.apellidos}</td>
                            <td>${usuario.direccion}</td>
                            <td>${usuario.telefono}</td>
                            <td>${usuario.email}</td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

fetch("http://89.116.25.43:3000/api/usuarios/listar")
    .then( response => response.json() )
    .then( data => mostrar(data.usuarios) )
    .catch( error => console.log(error))


function login(e) {
    //Para ejecucion
    e.preventDefault();


    //Para datos
    let inputUser = document.getElementById("usuario").value
    let inputPassword = document.getElementById("contraseña").value

    console.log(inputUser)
    console.log(inputPassword)

    fetch("http://89.116.25.43:3000/api/login", {
            method:"POST",
            body: JSON.stringify({
                usuario: inputUser,
                password: inputPassword
            }),
            headers:{
                "Content-Type": "application/json"
            }
    })
    .then(response => response.json())
    .then(data => {
        console.log('data',data);
        sessionStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("user",JSON.stringify(data.user))

        // data.status === 200 ? location.href = "dashboard.html" : data.status === 403 ? alert("No tiene permisos para ingresar") : alert("Ha ocurrido un error inesperado")
        if(data.status === 200){
            location.href = "dashboard.html"
        }else if(data.status === 403){
            alert("No tiene permisos para ingresar")
        }else{
            alert("Ha ocurrido un error inesperado")
        }
    })
}

formUsuario.addEventListener('submit', (e)=>{
    console.log("ingresa por aca");
    e.preventDefault()
    if(opcion=='crear'){        
        console.log('OPCION CREAR')
        fetch("http://89.116.25.43:3000/api/usuarios/registrar", {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombres: usuario.value,
                apellidos: apellido.value,
                telefono: telefono.value,
                email: email.value,
                direccion: direccion.value,
                usuario: usuario.value,
                password: password.value,
            })
        })
        .then( response => verDatos())
    }
    modalUsuario.hide()
})

 function verDatos() {
     fetch("http://89.116.25.43:3000/api/usuarios/listar")
     .then( response => response.json() )
     .then( data => mostrar(data.usuarios) )
     .catch( error => console.log(error))
 }