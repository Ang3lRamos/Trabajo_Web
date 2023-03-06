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

        if(data.status === 200){
            location.href = "dashboard.html"
        }else if(data.status === 403){
            alert("No tiene permisos para ingresar")
        }else{
            alert("Ha ocurrido un error inesperado")
        }
    })
}



// function verDatos() {
//     fetch("http://89.116.25.43:3000/api/usuarios/listar",{
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

// verDatos()
