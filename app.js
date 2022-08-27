
let todoListDOM = document.querySelector("#list");
let inputTaskDOM = document.querySelector("#taskInput");
let buttonDOM = document.querySelector("#btn");
let successAlertDOM = document.querySelector("#successToast");
let dangerAlertDOM = document.querySelector("#dangerToast");


buttonDOM.addEventListener("click", addItem);
todoListDOM.addEventListener("click", check);
document.addEventListener("DOMContentLoaded", getLocalStorage);


function addItem() {
  let isEmpty = (text) => text.trim().length > 0;
  console.log(isEmpty(inputTaskDOM.value));

  if (isEmpty(inputTaskDOM.value)) {
    saveLocalStorage(inputTaskDOM.value);

    const todoLi = document.createElement("li");
    todoLi.innerHTML = inputTaskDOM.value;


    todoListDOM.append(todoLi);


    inputTaskDOM.value = "";

 
    const todoRemoveButton = document.createElement("i");
    todoRemoveButton.classList.add(
      "bi",
      "bi-trash3-fill",
      "float-right",
      "mr-4"
    );


    todoLi.append(todoRemoveButton);

    toastAlertSuccess();
  }
  else {

    toastAlertDanger();
  }
}

function check(e) {
  const item = e.target;

  if (item.classList[0] == "bi") {
    const el = item.parentElement;
    deleteLocalStorage(el.innerText);
    el.classList.add("animation");
    el.addEventListener("transitionend", function () {
      el.remove();
    });
  } else {
    item.classList.toggle("checked");
  }
}

function saveLocalStorage(item) {
  let items;
  if (localStorage.getItem("listItem") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("listItem"));
  }

  items.push(item);
  localStorage.setItem("listItem", JSON.stringify(items));
}


function deleteLocalStorage(item) {
  let items;
  if (localStorage.getItem("listItem") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("listItem"));
  }
  items.splice(items.indexOf(item), 1);
  localStorage.setItem("listItem", JSON.stringify(items));
}

function getLocalStorage() {
  let items;
  if (localStorage.getItem("listItem") == null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("listItem"));
  }

  items.forEach((item) => {
    const todoLi = document.createElement("li");
    todoLi.innerHTML = item;


    todoListDOM.append(todoLi);


    inputTaskDOM.value = "";


    const todoRemoveButton = document.createElement("i");
    todoRemoveButton.classList.add(
      "bi",
      "bi-trash3-fill",
      "float-right",
      "mr-4"
    );

    todoLi.append(todoRemoveButton);
  });
}

function toastAlertSuccess() {
  let successToast = new bootstrap.Toast(successAlertDOM, alertOptions);
  successToast.show();
}


function toastAlertDanger() {
  let dangerToast = new bootstrap.Toast(dangerAlertDOM, alertOptions);
  dangerToast.show();
}


let alertOptions = {
  animation: true,
  delay: 3000,
};