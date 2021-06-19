/*
This is a solution of the ES6 course homework #9 for Pirple.com
Athor: Tereza Fatkova 
*/
const content = document.getElementById("content");

let listUL;

let isNewList = true;

let foundedList = {};

let userMenu = document.getElementById("userMenu");


// global variable for logged user
let user = {};

// =============== firstmenu page ===============

// first page is the two button menu - log in and sign up
const firstMenuTemplate = `<div id="firstMenu">
<h1>To-Do app</h1>
<p>This is the Project 1 for the JS course on Pirple.com</p>
<div class="buttons-container">
  <button id="signup">Sign up</button>
  <button id="login">Log in</button>
</div>`;

// This is what user see first 
content.innerHTML = firstMenuTemplate;

// This is the template of Signup form
const signupDivTemplate = `<div id="signupDiv" class="wrapper">
<h1 id="headline">Create a new user</h1>
<p id="errorSignup" class="errors"></p>

<form id="signupForm" method="post">

<label for="name">Name</label>
<input type="text" name="name" id="name" />

<label for="surname">Surname</label>
<input type="text" name="surname" id="surname" />

<label for="email">E-mail</label>
<input type="email" name="email" id="email" />

<label for="password">Password</label>
<input type="password" name="password" id="password" />

<label for="termsofuse">I agree with the Terms of use</label>
<input type="checkbox" name="termsofuse" id="termsofuse" />

<button>Submit</button>
</form>
</div>`;

// This function displays the signup Form
const signup = (e) => {
  //console.log("click on button signup");
  isUserLogged();
  content.innerHTML = signupDivTemplate;

};

// This is a template for login form
const loginDivTemplate = `<div id="loginDiv" class="wrapper">
<h1>Log in</h1>
<p id="errorLogin" class="errors"></p>
<form id="loginForm" method="POST">
  <label for="email-login">E-mail</label>
  <input type="email" name="email-login" id="email-login" />

  <label for="password-login">Password</label>
  <input type="password" name="password-login" id="password-login" />

  <button class="center">Submit</button>
</form>
</div>`;

// This function displays the login Form
const loginButton = (e) => {
  isUserLogged();
  content.innerHTML = loginDivTemplate;
};

const noListsMessage = document.createElement("p");
let listOfLists = document.createElement("div");
listOfLists.id = "list-of-lists";

/* This is function with template literal 
This function is called if the program needs to update the listElement variable.
That is why it cannot be the simply template literal
*/
let dashboardDivTemplate = (listsElement) => {
  return `<div id="dashboard" class="wrapper">
<h1>Dashboard</h1>
<div class="new-list">
  <button id="createNewList" class="center">Create a new list</button>
</div>
</div>
${listsElement.innerHTML}
`;
};

// Template literal for the New list Form
const newListTemplate = `<div id="new-list" class="wrapper">
<h1>Your list</h1>
<form id="listSaveForm" method="post">
  <label for="listName">Name</label>
  <input type="text" name="listName" id="listName" tabindex="1" />
  <button type="submit" class="below" tabindex="4">Save</button>
</form>

<form id="listItemForm" class="listItemForm" method="post">
  <label for="itemNew">New item</label>
  <input type="text" name="itemNew" id="itemNew" tabindex="2" />

  <button type="submit" id="insertItem" tabindex="3">Insert</button>
</form>

<ul id="toDoList" class="todo-list"></ul>
</div>`;

// template literal for User Account Form
const userAccountFormTemplate = `<div id="userAccount" class="user-account">
<h1>User Account</h1>

<form id="userAccountForm" method="post">
  <label for="nameAccount">Name</label>
  <input type="text" name="name" id="nameAccount" />

  <label for="surnameAccount">Surname</label>
  <input type="text" name="surname" id="surnameAccount" />

  <label for="emailAccount">E-mail</label>
  <input type="email" name="email" id="emailAccount" />

  <label for="passwordAccount">Password</label>
  <input type="password" name="password" id="passwordAccount" />

  <button>Submit</button>
</form>
</div>`;

/* I used the global event listeners with switch, 
because elements in template literals are not the part of the document at the begining, 
so the getElementById does not work. Because the element is not set yet. */

/* This is global Event Listener for submited forms, which check the id of the target 
and then calls the right function*/
document.addEventListener("submit", (e) => {
  switch (e.target.id) {
    case "signupForm":
      //console.log(`this is signupform`);
      signupForm(e);
      break;
    case "loginForm":
      //console.log(`this is loginform`);
      loginForm(e);
      break;
    case "listItemForm":
      //console.log(`this is list item form`);
      listItemForm(e);
      break;
    case "listSaveForm":
      //console.log(`this is list save form`);
      listSaveForm(e);
      break;
    case "userAccountForm":
      //console.log(`this is useraccountform`);
      userAccountForm(e);
      break;
  }
});

/* This is global Event Listener for buttons, which check the id of the target 
and then calls the right function*/
document.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "createNewList":
      //console.log(`this is new list`);
      createNewList(e);
      break;
    case "list--detail":
      //console.log(`this is list of lists`);
      listOfListsDashboard(e);
      break;

    case "login":
      //console.log(`this is login`);
      loginButton(e);
      break;

    case "signup":
     // console.log(`this is signup`);
      signup(e);
  }
});

/* This is global "click" Event Listener, which check the class of the target 
and then calls the right function*/
document.addEventListener("click", (e) => {
  //console.log(`click event listener ${e.target.classList}`);

  if(e.target.classList.contains("toDoItem")){
    listDone(e);
  }

});


// function which validates the signup form 
const signupForm = (e) => {
  e.preventDefault();

  var nameSignup = document.getElementById("name");
  var surnameSignup = document.getElementById("surname");
  var emailSignup = document.getElementById("email");
  var passwordSignup = document.getElementById("password");
  var termsOfUse = document.getElementById("termsofuse");

  var errorSignup = document.getElementById("errorSignup");
  errorSignup.innerHTML = "";

  if (!termsOfUse.checked) {
    errorSignup.innerHTML = "You have to agree with the Terms of Use. <br/>";
  }

  if (nameSignup.value == "") {
    errorSignup.innerHTML += "Name field have to be filled. <br/>";
    nameSignup.classList.add("error-signup");
  }

  if (surnameSignup.value == "") {
    errorSignup.innerHTML += "Surname field have to be filled. <br/>";
    surnameSignup.classList.add("error-signup");
  }

  if (emailSignup.value == "") {
    errorSignup.innerHTML += "Email field have to be filled. <br/>";
    emailSignup.classList.add("error-signup");
  }

  if (passwordSignup.value == "") {
    errorSignup.innerHTML += "Password field have to be filled. ";
    passwordSignup.classList.add("error-signup");
  }

  if (errorSignup.innerHTML.length == "") {
    // form validation and new user is created
    createUser(nameSignup, surnameSignup, emailSignup, passwordSignup);

    // to the dashboard
    content.innerHTML = dashboardDivTemplate(listOfLists); // delete the content
   
  }
  isUserLogged();
};

let createUser = (
  nameSignup,
  surnameSignup,
  emailSignup,
  passwordSignup
) => {
  
  user = {
    name: nameSignup.value,
    surname: surnameSignup.value,
    email: emailSignup.value,
    password: passwordSignup.value,
    lists: [],
  };

  //console.log(user);
  localStorage.setItem(user.email, JSON.stringify(user));
};

// check if the user is logged in
const isUserLogged = () => {
  if (user.name) {
    username.innerHTML = `${user.name} ${user.surname}`;
    userMenu.innerHTML = `You are logged in as `;
    userMenu.appendChild(username);
    userMenu.appendChild(buttonAccount);
    userMenu.appendChild(buttonLogout);
  } else {
    userMenu.innerHTML = `You are not logged in`;
  }
};

isUserLogged();

// Button "User account" in header
const buttonAccount = document.createElement("button");
buttonAccount.id = "buttonAccount";
buttonAccount.innerText = "User Account";
buttonAccount.classList.add("buttonAccount");

// username in header
const username = document.createElement("span");
username.classList.add("username");
username.id = "username";

// This listener opens the User account Form
buttonAccount.addEventListener("click", (e) => {
  content.innerHTML = userAccountFormTemplate;

  const nameAccount = document.getElementById("nameAccount");
  const surnameAccount = document.getElementById("surnameAccount");
  const emailAccount = document.getElementById("emailAccount");
  const passwordAccount = document.getElementById("passwordAccount");

  nameAccount.value = user.name;
  surnameAccount.value = user.surname;
  emailAccount.value = user.email;
  passwordAccount.value = user.password;
 
});

// user logout button in header
const buttonLogout = document.createElement("button");
buttonLogout.innerHTML = "Log out";
buttonLogout.classList.add("button-logout");

buttonLogout.addEventListener("click", (e) => {
  user = {}; // clear the user variable
  listOfLists.innerHTML = ""; // clear the list variable on the dashboard
  isUserLogged();
  content.innerHTML = firstMenuTemplate;
  
});

// saving Account form
const userAccountForm = (e) => {
  localStorage.removeItem(user.email);

  user.name = document.getElementById("nameAccount").value;
  user.surname = document.getElementById("surnameAccount").value;
  user.email = document.getElementById("emailAccount").value;
  user.password = document.getElementById("passwordAccount").value;

  //console.log(user);

  localStorage.setItem(user.email, JSON.stringify(user));
  isUserLogged();
  content.innerHTML = dashboardDivTemplate(listOfLists); 
  
};


// =============== Login page ===============

const loginForm = (e) => {
  e.preventDefault();
  const emailLogin = document.getElementById("email-login").value;
  const passwordLogin = document.getElementById("password-login").value;
  const loggedUser = JSON.parse(localStorage.getItem(emailLogin));

  if (loggedUser && passwordLogin === loggedUser["password"]) {
  
    user = loggedUser;
    //console.log(user);
    content.innerHTML = "";
    writeOutLists();
    content.innerHTML = dashboardDivTemplate(listOfLists);
  } else if (loggedUser && passwordLogin !== loggedUser["password"]) {
    const errorLogin = document.getElementById("errorLogin");
    errorLogin.innerHTML = "You set a wrong password.";
    //console.log("wrong password");
  } else {
    const errorLogin = document.getElementById("errorLogin");
    errorLogin.innerHTML = "User with this email does not exists.";
    //console.log("this user not exists");
  }
  isUserLogged();
};


// =============== DASHBOARD ===============

// dashboard - displays the form for new list

const createNewList = () => {
  content.innerHTML = newListTemplate;
  const nameList = document.getElementById("listName");
  nameList.value = "";

  listUL = document.getElementById("toDoList");
  listUL.innerHTML = "";
  document.getElementById("itemNew").value = "";
};


// add new item into the list

let listObject = {};
// inserts the new LI into the UL list

const listItemForm = (e) => {
  e.preventDefault();
  const newItem = document.getElementById("itemNew").value;
  const newLI = document.createElement("li");
  newLI.classList.add("toDoItem");
  newLI.innerHTML = newItem;
  listUL.appendChild(newLI);
  document.getElementById("itemNew").value = "";
};


// ============= SAVE THE FORM WITH LIST ============

// saves the whole list with the name and timestamp into the user.lists array
let nameList;
const listSaveForm = (e) => {
  e.preventDefault();
  if (isNewList) {
    nameList = document.getElementById("listName").value;
    if (!nameList) {
      nameList = "Untitled";
    }
    // toISOString converts the UTC date-time to ISO object
    const creationDate = new Date().toISOString();

    listObject = {
      nameList: nameList,
      creationDate: creationDate,
      listUL: listUL.innerHTML,
    };
    user.lists.push(listObject);
    localStorage.setItem(user.email, JSON.stringify(user));

    // Update the list
  } else {
    localStorage.removeItem(user.email);
    const renamedList = document.getElementById("listName").value;
    const renewedUL = document.getElementById("toDoList");

    for (const iterator of user.lists) {
      if (iterator.creationDate == foundedList.creationDate) {
        iterator.nameList = renamedList;
        iterator.listUL = renewedUL.innerHTML;
      }
    }
    localStorage.setItem(user.email, JSON.stringify(user));
    isNewList = true;
  }

 
  writeOutLists();
  content.innerHTML = dashboardDivTemplate(listOfLists);
};

/*
function for writting out the list of to-do lists on the Dashboard
*/

const writeOutLists = () => {
  if (user.lists.length !== 0) {
    //console.log("The length of the user list " + user.lists.length);
    noListsMessage.innerHTML = "";
    listOfLists.innerHTML = "";

    user.lists.forEach((element) => {
      const listButton = document.createElement("div");
      listButton.classList.add("list--detail");
      listButton.id = "list--detail";
      // add headline tag with the name of the list into the button
      const listHeadline = document.createElement("h3");
      listHeadline.innerHTML = element.nameList;
      listHeadline.setAttribute("data-timestamp", element.creationDate);
      listButton.appendChild(listHeadline);

      // add date into the "button > span" in nicer format
      const listDate = document.createElement("span");
      listDate.setAttribute("data-timestamp", element.creationDate);
      const optionsDate = { day: "numeric", month: "short", year: "numeric" }; // format of the date

      // in the element.creationDate is not stored the Date object, but only a String - so it have to be parsed via "new Date"
      listDate.innerHTML = new Intl.DateTimeFormat("en-US", optionsDate).format(
        new Date(element.creationDate)
      );
      listButton.appendChild(listDate);

      // dataset https://stackoverflow.com/questions/33760520/how-can-i-get-the-values-of-data-attributes-in-javascript-code
      listButton.setAttribute("data-timestamp", element.creationDate);

      listOfLists.appendChild(listButton);

      //console.log(listOfLists);
    });

    content.innerHTML = dashboardDivTemplate(listOfLists);
   
  } else {
    noListsMessage.innerHTML = "You have not added any list yet.";
    content.innerHTML = dashboardDivTemplate(noListsMessage);
    
  }
};

// if I pick a list to change
const listOfListsDashboard = (e) => {
  //console.log(e.target);
  isNewList = false;
  const selectedList = e.target;

  // https://usefulangle.com/post/3/javascript-search-array-of-objects
  foundedList = user.lists.find((list, timestamp) => {
    if (list.creationDate == selectedList.getAttribute("data-timestamp")) {
      return true;
    }
  });

  // insert the list from e.target into the html form

  content.innerHTML = newListTemplate;
  nameList = document.getElementById("listName");
  nameList.value = foundedList.nameList;

  listUL = document.getElementById("toDoList");
  listUL.innerHTML = foundedList.listUL;
};

// ============= CHECK AS "DONE" =============

const listDone = (e) => {
  const itemLI = e.target;
  //console.log(e.target);

  if(itemLI.classList.contains("done")) {
    itemLI.classList.remove("done");
  } else {
    itemLI.classList.add("done");
  }

};
