import {
  createListItems,
  rePopulateTasksAfterDeletion,
  addSelectedItemClassOnceAddIsClicked,
  rePopulateNotes,
} from "./projectDOM";

function List(title, selected, tasks) {
  this.title = title;
  this.selected = selected;
  this.tasks = tasks;
}

function Task(title, description, dueDate, priority, selected) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.selected = selected;
}

function Note(title, description) {
  this.title = title;
  this.description = description;
}

const addNote = (note) => {
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary")) || [];
  let form = document.querySelector(".popUp");
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  if (title != "") {
    const newList = new Note(title, description);
    noteLibrary.push(newList);
    localStorage.setItem("noteLibrary", JSON.stringify(noteLibrary));
    form.reset();
    console.log(noteLibrary);
  }
};

const submitNote = () => {
  document.querySelector(".submitNote").addEventListener("click", (e) => {
    e.preventDefault();
    addNote(e);
    rePopulateNotes();
  });
};

const deleteNote = (noteName) => {
  let newt = JSON.parse(localStorage.getItem("noteLibrary"));
  let index = newt.findIndex((e) => e.title == noteName);
  newt.splice(index, 1);
  localStorage.setItem("noteLibrary", JSON.stringify(newt));
};

const submitList = () => {
  let btn = document.querySelector(".submitList");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addList(e);
    createListItems();
  });
};

const submitTask = () => {
  let btn = document.querySelector(".submitTask");

  let low = document.querySelector(".low");
  let medium = document.querySelector(".medium");
  let high = document.querySelector(".high");
  let priority;
  low.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "low";
  });
  medium.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "medium";
  });
  high.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "high";
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask(e, priority);
    createListItems();
    rePopulateTasksAfterDeletion();
    addSelectedItemClassOnceAddIsClicked();
  });
};

function addTask(task, priority) {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let form = document.querySelector(".popUp");
  let taskTitle = document.querySelector("#title").value;
  let taskDescription = document.querySelector("#description").value;
  let dueDate = document.querySelector("#dueDate").value;

  let low = document.querySelector(".low");
  let medium = document.querySelector(".medium");
  let high = document.querySelector(".high");
  // let priority;
  low.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "low";
  });
  medium.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "medium";
  });
  high.addEventListener("click", (e) => {
    // e.preventDefault();
    priority = "high";
  });

  if (taskTitle != "") {
    let newTask = new Task(
      taskTitle,
      taskDescription,
      dueDate,
      priority,
      false
    );
    let index = library.findIndex((e) => e.selected == true);
    if (index > -1) {
      library[index].tasks.push(newTask);
      localStorage.setItem("listLibrary", JSON.stringify(library));
      form.reset();
    } else {
      console.log("Please select a project to add task to!");
      return;
    }
  }
}

function addList(list) {
  const listLibrary = JSON.parse(localStorage.getItem("listLibrary")) || [];
  let form = document.querySelector(".popUp");
  let listTitle = document.querySelector("#title").value;
  if (listTitle != "") {
    const newList = new List(listTitle, false, []);
    listLibrary.push(newList);
    localStorage.setItem("listLibrary", JSON.stringify(listLibrary));
    form.reset();
  }
}

const changeSelectedList = (title) => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let index = library.findIndex((e) => e.title == title);
  library[index].selected = true;
  for (let i = 0; i < library.length; i++) {
    if (library[i].title == title) {
      continue;
    } else {
      library[i].selected = false;
    }
  }
  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const deleteOne = (listName) => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let index = library.findIndex((e) => e.title == listName);
  library.splice(index, 1);
  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const refreshSelectedList = () => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  for (let i = 0; i < library.length; i++) {
    library[i].selected = false;
  }
  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const deleteListTask = (taskName) => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let allTasks;
  let selectedList;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      selectedList = library[i];
      allTasks = library[i].tasks;
    }
  }
  let index = allTasks.findIndex((e) => e.title == taskName);
  allTasks.splice(index, 1);
  localStorage.setItem("listLibrary", JSON.stringify(library));
  console.log(allTasks);
};

const changeSelectedTask = (title) => {
  refreshSelectedTask();
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let allTasks;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      allTasks = library[i].tasks;
    }
  }
  let index = allTasks.findIndex((e) => e.title == title);
  let selectedTask = allTasks[index];
  selectedTask.selected = true;
  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const refreshSelectedTask = () => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let allTasks;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      allTasks = library[i].tasks;
    }
  }
  for (let i = 0; i < allTasks.length; i++) {
    allTasks[i].selected = false;
  }
  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const editSelectedTask = (titleName, priority) => {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let allTasks;
  let chosenTask;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      allTasks = library[i].tasks;
    }
  }
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].selected == true) {
      chosenTask = allTasks[i];
    }
  }

  let title = document.querySelector(".forEditTitle").value;
  let description = document.querySelector(".forEditDescription").value;
  let dueDate = document.querySelector(".forEditDueDate").value;

  if (title != "") {
    chosenTask.title = title;
  }
  if (description != "") {
    chosenTask.description = description;
  }
  if (dueDate != "") {
    chosenTask.dueDate = dueDate;
  }
  if (priority != "") {
    chosenTask.priority = priority;
  }

  localStorage.setItem("listLibrary", JSON.stringify(library));
};

const submitEditTask = () => {
  let btn = document.querySelector("#submitEdit");
  let form = document.querySelector(".editPopUp");

  let low = document.querySelector(".forEditLow");
  let medium = document.querySelector(".forEditMedium");
  let high = document.querySelector(".forEditHigh");
  let priority = "";

  low.addEventListener("click", (e) => {
    e.preventDefault();
    priority = "low";
  });
  medium.addEventListener("click", (e) => {
    e.preventDefault();
    priority = "medium";
  });
  high.addEventListener("click", (e) => {
    e.preventDefault();
    priority = "high";
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    editSelectedTask(e, priority);
    rePopulateTasksAfterDeletion();
    form.reset();
  });
};

export {
  deleteNote,
  submitNote,
  refreshSelectedTask,
  changeSelectedTask,
  submitEditTask,
  deleteListTask,
  submitTask,
  refreshSelectedList,
  changeSelectedList,
  deleteOne,
  submitList,
};
