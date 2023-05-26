let button = document.getElementById("submit");
let ul = document.getElementById("product-list");

button.addEventListener("click", savedata);
ul.addEventListener("click", removeproduct);
ul.addEventListener("click", editproduct);
window.addEventListener("load", showdata);

function savedata(event) {
  event.preventDefault();
  let clientname = document.getElementById("name").value;
  let clientemail = document.getElementById("email").value;
  let clientphone = document.getElementById("Phone").value;

  let details = {
    clientname,
    clientemail,
    clientphone,
  };

  axios
    .post("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data", details)
    .then(() => {
      showdata();
    })
    .catch((err) => {
      alert(err);
    });
}

function showonscreen(data) {
  let li = document.createElement("li");
  li.className = "list-group-item";

  li.appendChild(
    document.createTextNode(
      `Name is ${data.clientname}. Email address is ${data.clientemail}. Phone number is ${data.clientphone}.`
    )
  );

  let deletbtn = document.createElement("button");
  deletbtn.className = "btn btn-danger delete";
  deletbtn.style = "margin-left:5px"
  deletbtn.textContent = "X";

  let editbtn = document.createElement("button");
  editbtn.className = "btn btn-dark edit";
  editbtn.style = "margin-left:10px";
  editbtn.textContent = "Edit";

  li.appendChild(editbtn);

  li.appendChild(deletbtn);
  ul.appendChild(li);

  li.setAttribute("data-id", data._id);
}

function removeproduct(event) {
  if (event.target.classList.contains("delete")) {
    let li = event.target.parentNode;
    let id = li.getAttribute("data-id");
    ul.removeChild(li);
    axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data/${id}`);
  }
}

function editproduct(event) {
    if (event.target.classList.contains("edit")) {
      let li = event.target.parentNode;
      let id = li.getAttribute("data-id");
      let clientname = li.textContent.split(" is ")[1].split(".")[0];
      let clientemail = li.textContent.split(" is ")[2].split(". ")[0];
      let clientphone = li.textContent.split(" is ")[3].split(".")[0];
      document.getElementById("name").value = clientname;
      document.getElementById("email").value = clientemail;
      document.getElementById("Phone").value = clientphone;
      ul.removeChild(li);
      axios.delete(`https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data/${id}`);
    }
  }

function showdata() {
  ul.innerHTML = "";
  axios
    .get("https://crudcrud.com/api/ead6dddf4a1a4c68b87db07b7bd8e8f2/data")
    .then((response) => {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        showonscreen(data[i]);
      }
    })
    .catch((err) => {
      alert(err);
    });
}
