
let searchElement;
let newButton;
let modal;
let grayBack;
let addUser;
let saveUser;
let spinner;
let usersElement;
let skip;
let userToEdit;
let userToDelete;

async function users(){

    searchElement = document.getElementById("search");
    newButton = document.getElementById("new");
    modal = document.getElementById("modal");
    grayBack = document.getElementById("grayBack");
    addUser = document.getElementById("addUser");
    saveUser = document.getElementById("saveUser");
    spinner = document.getElementById("spinner");
    usersElement = document.getElementById("users");
    skip = 0;

    await getUsers();

    searchElement.onkeyup = ()=>{
        skip = 0;
        getUsers();
    }

    newButton.onclick = ()=>{

        modal.classList.remove("hidden");
        grayBack.classList.remove("hidden");
        addUser.classList.remove("hidden");
        saveUser.classList.add("hidden");

        fillForm({firstName:"", lastName:"", email:"", role : "customer", password: ""});

    }
    
    grayBack.onclick = ()=>{
        modal.classList.add("hidden");
        grayBack.classList.add("hidden");
    }

    addUser.onclick = async()=>{

        const formData = new FormData(modal);
        const dataobj = Object.fromEntries(formData);
        dataobj.lastActive = new Date();
        const data = JSON.stringify(dataobj);

        const response = await fetch(`/adminPanel/addUser`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          });

        if (response.status >= 400 && response.status < 600) {
            alert(await response.text());
        }
        else{
            modal.classList.add("hidden");
            grayBack.classList.add("hidden");
            getUsers();
        }

    }

    saveUser.onclick = async()=>{

        const formData = new FormData(modal);
        const data = JSON.stringify(Object.fromEntries(formData))

        const response = await fetch(`/adminPanel/editUser/${userToEdit._id}`,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: data,
          });

        if (response.status >= 400 && response.status < 600) {
            alert(await response.text());
        }
        else{
            modal.classList.add("hidden");
            grayBack.classList.add("hidden");
            getUsers();
        }

    }

}


async function getUsers(){

    spinner.classList.remove("hidden");

    const response =  await fetch(`/adminPanel/getUsers/${searchElement.value}/${skip}`);
    
    if (response.status >= 400 && response.status < 600) {
        alert(await response.text());
    }

    const resJson = await response.json()
    
    const users = resJson.users;

    const userCount = resJson.count;

    spinner.classList.add("hidden");

    renderUsers(users, userCount);

    const nextElement = document.getElementById("next");
    const previousElement = document.getElementById("previous");

    nextElement.onclick = ()=>{
        skip+= 9;
        getUsers();
    }
    previousElement.onclick = ()=>{
        skip-= 9;
        getUsers();
    }

    for(const key in users){

        const editButton = document.getElementById("edit" + key);
        const deleteButton = document.getElementById("delete" + key);

        editButton.onclick = ()=>{
            fillForm(users[key]);
            modal.classList.remove("hidden");
            grayBack.classList.remove("hidden");
            userToEdit = users[key];
            addUser.classList.add("hidden");
            saveUser.classList.remove("hidden");
        }

        deleteButton.onclick = async()=>{

            userToDelete = users[key];

            const response = await fetch(`/adminPanel/deleteUser/${userToDelete._id}`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              });
    
            if (response.status >= 400 && response.status < 600) {
                alert(await response.text());
            }
            else{
                getUsers();
            }
        }

    }


}

function renderUsers(users, userCount){

    let html = "";

    for (const [index, user] of users.entries()){
      html += `
        <tr>
            <td>
                ${user.firstName}
            </td>
            <td>
                ${user.lastName}
            </td>
            <td>
                ${user.email}
            </td>
            <td>
                ${user.password}
            </td>
            <td>
                ${user.role}
            </td>
            <td>
                ${user.lastActive}
            </td>
            <td>
                <i class="fa-regular fa-pen-to-square" id="edit${index}"></i>
            </td>
            <td>
                <i class="fa-solid fa-trash-arrow-up" id="delete${index}"></i>
            </td>
        </tr>
    `;
    }

    html += `
            <tr >
                <td colspan="3">
                    <button id="previous" ${(skip-9 < 0)? "disabled":""} >Previous</button>
                    <button id="next" ${(skip+9 >= userCount)? "disabled":"false"} >Next</button>
                </td>
                <td colspan="4">
                    Showing ${skip +1} to ${(skip +9 > userCount)? userCount:skip +9 }
                     of ${userCount}
                </td>
            </tr>
    `;

  
    usersElement.innerHTML = html;

}
 
function fillForm(data){

    const keys =  ["firstName", "lastName", "email", "role", "password"];

    for(const key of keys){

        const element = document.getElementById(key);
        element.value = data[key];

    }
}
  
  
  
export default users;