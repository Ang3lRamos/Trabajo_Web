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

function registrar(e) {
    //Para ejecucion
    e.preventDefault();

    //Para datos
    let inputNombre = document.getElementById("nombres").value;
    let inputApellidos = document.getElementById("apellidos").value;
    let inputTelefono = document.getElementById("telefono").value;
    let inputDireccion = document.getElementById("direccion").value;
    let inputEmail = document.getElementById("email").value;
    let inputUsername = document.getElementById("usuario").value;
    let inputPassword = document.getElementById("pass").value;

    fetch("http://89.116.25.43:3000/api/usuarios/registrar",{
        method: "POST",
        body: JSON.stringify({
            nombres: inputNombre,
            apellidos: inputApellidos,
            telefono: inputTelefono,
            email: inputEmail,
            direccion: inputDireccion,
            usuario: inputUsername,
            password: inputPassword
        }),
        headers: {
            "Content-type": "application/json"
        },
    })
    .then(response => location.href = "dashboard.html")
}

// function verDatos() {
//     fetch("http://89.116.25.43:3000/api/usuarios/listar",{
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

// verDatos()
