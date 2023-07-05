const createButton = document.querySelector(".create-new");
const module = document.querySelector(".module");
const taskInput = document.getElementById("create");
const createdByInput = document.getElementById("creator");
const addTo = document.getElementById("appendTo");
const boards = document.querySelectorAll(".section__board");
const submitButton = document.querySelector(".submit");
const trashButton = document.querySelector(".delete");

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  module.classList.remove("hidden");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createNewItem();
  module.classList.add("hidden");
  taskInput.value = "";
  createdByInput.value = "";
  addTo.value = "stories__board";
});

const createNewItem = () => {
  const itemWrapper = document.createElement("div");
  itemWrapper.setAttribute("draggable", "true");
  itemWrapper.classList.add("item");

  const itemText = document.createElement("p");
  itemText.classList.add("item__text");
  itemText.innerText = taskInput.value;
  itemWrapper.append(itemText);

  const itemCreator = document.createElement("p");
  itemCreator.classList.add("item__creator");
  itemCreator.innerText = createdByInput.value;
  itemWrapper.append(itemCreator);

  itemWrapper.addEventListener("dragstart", () => {
    itemWrapper.classList.add("is-dragging");
  });

  itemWrapper.addEventListener("dragend", () => {
    itemWrapper.classList.remove("is-dragging");
  });

  boards.forEach((board) => {
    if (board.classList.contains(`${addTo.value}`)) board.append(itemWrapper);
  });
};

// Drag and drop code is from https://www.youtube.com/watch?v=ecKw7FfikwI&t=1057s
// By Tom and Loading
boards.forEach((board) => {
  board.addEventListener("dragover", (e) => {
    e.preventDefault();
    const bottomTask = insertAboveTask(board, e.clientY);
    const curTask = document.querySelector(".is-dragging");
    if (!bottomTask) {
      board.appendChild(curTask);
    } else {
      board.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (board, mouseY) => {
  const items = board.querySelectorAll(".item:not(is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  items.forEach((item) => {
    const { top } = item.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = item;
    }
  });

  return closestTask;
};
// End of code from Tom is Loading

trashButton.addEventListener("dragover", (e) => {
  e.preventDefault();
  const currentDrag = document.querySelector(".is-dragging");
  currentDrag.addEventListener("dragend", (e) => {
    e.preventDefault();
    currentDrag.remove();
    console.log("delete");
  });
});
