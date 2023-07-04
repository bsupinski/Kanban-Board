const createButton = document.querySelector(".create-new");
const module = document.querySelector(".module");
const taskInput = document.getElementById("create");
const createdByInput = document.getElementById("creator");
const addTo = document.getElementById("appendTo");
// const storiesBoard = document.getElementById(".stories");
// const toDoBoard = document.getElementById("toDo");
// const inProgressBoard = document.getElementById("inProgress");
// const testBoard = document.getElementById("test");
// const doneBoard = document.getElementById("done");
const boards = document.querySelectorAll(".section__board");

const submitButton = document.querySelector(".submit");

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  module.classList.remove("hidden");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createNewItem();
  module.classList.add("hidden");
});

const createNewItem = () => {
  const itemWrapper = document.createElement("div");
  itemWrapper.setAttribute("draggable", true);
  itemWrapper.classList.add("item");

  const itemText = document.createElement("p");
  itemText.classList.add("item__text");
  itemText.innerText = taskInput.value;
  itemWrapper.append(itemText);

  const itemCreator = document.createElement("p");
  itemCreator.classList.add("item__creator");
  itemCreator.innerText = createdByInput.value;
  itemWrapper.append(itemCreator);

  boards.forEach((board) => {
    console.log(board);
    if (board.classList.contains(`${addTo.value}`)) board.append(itemWrapper);
  });
};
