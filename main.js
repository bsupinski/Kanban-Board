const createButton = document.querySelector(".create-new");
const module = document.querySelector(".module");
const taskInput = document.getElementById("create");
const createdByInput = document.getElementById("creator");
const addTo = document.getElementById("appendTo");
const boards = document.querySelectorAll(".section__board");
const submitButton = document.querySelector(".submit");
const trashButton = document.querySelector(".delete");

const defaultState = {
  stories: [],
  toDo: [],
  inProgress: [],
  test: [],
  done: [],
};

const state = JSON.parse(localStorage.getItem("state")) || defaultState;

JSON.parse(localStorage.getItem("state"));

const saveLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  module.classList.remove("hidden");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  defaultState[addTo.value].push({
    task: taskInput.value,
    creator: createdByInput.value,
    board: addTo.value,
    id: `${taskInput.value}${createdByInput.value}`,
  });

  state[addTo.value].forEach((item) => {
    createNewItem(item.task, item.creator, item.board, item.id);
  });

  module.classList.add("hidden");
  taskInput.value = "";
  createdByInput.value = "";
  addTo.value = "stories";
});

const createNewItem = (task, creator, value, id) => {
  const itemWrapper = document.createElement("div");
  itemWrapper.setAttribute("draggable", "true");
  itemWrapper.setAttribute("data-id", id);
  itemWrapper.classList.add("item");

  const itemText = document.createElement("p");
  itemText.classList.add("item__text");
  itemText.innerText = task;
  itemWrapper.append(itemText);

  const itemCreator = document.createElement("p");
  itemCreator.classList.add("item__creator");
  itemCreator.innerText = creator;
  itemWrapper.append(itemCreator);

  dragStart(itemWrapper);
  dragEnd(itemWrapper);

  boards.forEach((board) => {
    if (board.classList.contains(`${value}`)) board.append(itemWrapper);
  });

  state[addTo.value].push(itemWrapper);
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

// const setBoards = () => {
//   state.stories.forEach((item) => {
//     boards[0].append(item);
//   });
// };

// setBoards();

const dragStart = (ele) => {
  ele.addEventListener("dragstart", () => {
    ele.classList.add("is-dragging");
  });
};

const dragEnd = (ele) => {
  ele.addEventListener("dragend", () => {
    ele.classList.remove("is-dragging");
  });
};
