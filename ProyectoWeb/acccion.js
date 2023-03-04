function login(e) {
    //Para ejecucion
    e.preventDefault();
    console.log("a")

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
        console.log(data);
        sessionStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("user",JSON.stringify(data.user))
    })
    .then(redirect => location.href = "dashboard.html")
}

function verDatos() {
    fetch("http://89.116.25.43:3000/api/usuarios/listar",{
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

verDatos()