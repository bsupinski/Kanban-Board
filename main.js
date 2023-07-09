const createButton = document.querySelector(".create-new");
const module = document.querySelector(".module");
const taskInput = document.getElementById("create");
const createdByInput = document.getElementById("creator");
const addTo = document.getElementById("appendTo");
const boards = document.querySelectorAll(".section__board");
const submitButton = document.querySelector(".submit");
const trashButton = document.querySelector(".delete");

const defaultState = {
  stories: [
    {
      task: "test1story",
      creator: "test1story",
      board: "stories",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test2story",
      creator: "test2story",
      board: "stories",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test3story",
      creator: "test3story",
      board: "stories",
      id: Math.floor(Math.random() * 100000),
    },
  ],
  toDo: [
    {
      task: "test1toDo",
      creator: "test1toDo",
      board: "toDo",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test2toDo",
      creator: "test2toDo",
      board: "toDo",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test3toDo",
      creator: "test3toDo",
      board: "toDo",
      id: Math.floor(Math.random() * 100000),
    },
  ],
  inProgress: [
    {
      task: "test1inProgress",
      creator: "test1inProgress",
      board: "inProgress",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test2inProgress",
      creator: "test2inProgress",
      board: "inProgress",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test3inProgress",
      creator: "test3inProgress",
      board: "inProgress",
      id: Math.floor(Math.random() * 100000),
    },
  ],
  test: [
    {
      task: "test1test",
      creator: "test1test",
      board: "test",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test2test",
      creator: "test2test",
      board: "test",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test3test",
      creator: "test3test",
      board: "test",
      id: Math.floor(Math.random() * 100000),
    },
  ],
  done: [
    {
      task: "test1done",
      creator: "test1done",
      board: "done",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test2done",
      creator: "test2done",
      board: "done",
      id: Math.floor(Math.random() * 100000),
    },
    {
      task: "test3done",
      creator: "test3done",
      board: "done",
      id: Math.floor(Math.random() * 100000),
    },
  ],
};

let movingElement;
let movingState;

const state = JSON.parse(localStorage.getItem("state")) || defaultState;

JSON.parse(localStorage.getItem("state"));

const saveLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const createNewItem = (item, board) => {
  const itemWrapper = document.createElement("div");
  itemWrapper.setAttribute("draggable", "true");
  itemWrapper.setAttribute("data-id", item.id);
  itemWrapper.classList.add("item");

  const itemText = document.createElement("p");
  itemText.classList.add("item__text");
  itemText.innerText = item.task;
  itemWrapper.append(itemText);

  const itemCreator = document.createElement("p");
  itemCreator.classList.add("item__creator");
  itemCreator.innerText = item.creator;
  itemWrapper.append(itemCreator);

  dragStart(itemWrapper);
  dragEnd(itemWrapper);
  document.getElementById(board).appendChild(itemWrapper);
  // saveLocalStorage();
};

const clearBoard = () => {
  boards.forEach((board) => {
    board.innerHTML = "";
  });
};

const dragStart = (ele) => {
  ele.addEventListener("dragstart", () => {
    ele.classList.add("is-dragging");
    movingElement = ele;
    for (const board in state) {
      state[board].forEach((item, i) => {
        if (+item.id === +movingElement.dataset.id) {
          movingState = item;
          console.log(item.id, movingElement.dataset.id);
          state[board].splice(i, 1);
        }
      });
    }
  });
};

const dragEnd = (ele) => {
  ele.addEventListener("dragend", () => {
    ele.classList.remove("is-dragging");

    const elementIndexInParent = Array.from(
      movingElement.parentNode.childNodes
    ).indexOf(movingElement);

    state[movingElement.parentNode.id].splice(
      elementIndexInParent,
      0,
      movingState
    );
    movingElement;
    movingState;
    // saveLocalStorage();
    console.log(state);
  });
};

const iterateOverState = () => {
  for (const board in state) {
    state[board].forEach((item) => {
      createNewItem(item, board);
    });
  }
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
    id: Date.now(),
  });

  clearBoard();

  iterateOverState();
  console.log(state);

  module.classList.add("hidden");
  taskInput.value = "";
  createdByInput.value = "";
  addTo.value = "stories";
});

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

iterateOverState();
