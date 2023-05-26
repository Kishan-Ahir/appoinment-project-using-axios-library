let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("Phone").value;
let button = document.getElementById("submit");

button.addEventListener("click",savedata);

function savedata(event)
{
    event.preventDefault();
    let clientname = document.getElementById("name").value;
    let clientemail =document.getElementById("email").value;
    let clientphone = document.getElementById("Phone").value;

    let details = {
        clientname,clientemail,clientphone
    }

    axios.post("https://crudcrud.com/api/4be9548404624dac986fb0a639b5833a/data",details)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}