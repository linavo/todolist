import {
  deleteListTask,
  submitTask,
  submitList,
  changeSelectedList,
  deleteOne,
  changeSelectedTask,
  submitEditTask,
  refreshSelectedTask,
  submitNote,
  deleteNote,
} from "./list";

const populateAddPopUp = () => {
  document.querySelector(".addBtn").addEventListener("click", changeAddPopUp);
};

function deleteBtn() {
  document.querySelector(".deleteBtn").addEventListener("click", () => {
    let library = JSON.parse(localStorage.getItem("listLibrary"));
    let name;
    for (let i = 0; i < library.length; i++) {
      if (library[i].selected == true) {
        name = library[i].title;
      }
    }
    deleteOne(name);
    createListItems();
  });
}

const closePopUp = () => {
  document.querySelector("#exitPopUp").addEventListener("click", () => {
    hidePopUp();
  });
};

const switchToList = () => {
  document.querySelector(".addList").addEventListener("click", (e) => {
    e.preventDefault();
    hideDetails();
    hideDateAndPriority();
    showSubmitList();
    hideSubmitNote();
    hideSubmitTask();
    submitList();
  });
};

const switchToTask = () => {
  document.querySelector(".addListTasks").addEventListener("click", (e) => {
    e.preventDefault();
    showDetails();
    showDateAndPriority();
    showSubmitTask();
    hideSubmitNote();
    hideSubmitList();
    submitTask();
  });
};

const switchToNote = () => {
  document.querySelector(".addNote").addEventListener("click", (e) => {
    e.preventDefault();
    showDetails();
    hideDateAndPriority();
    showSubmitNote();
    hideSubmitList();
    hideSubmitTask();
    submitNote();
  });
};

function populateListTasks(title) {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let allItems = document.querySelectorAll(".listItem");

  allItems.forEach((list) => {
    if (list.getAttribute("data-name") == title) {
      let index = library.findIndex((e) => e.title == title);
      document.querySelector(".body").textContent = "";
      let allTasks = library[index].tasks;

      allTasks.forEach((item) => {
        let taskContainer = document.createElement("div");

        let taskBox1 = document.createElement("div");
        let checkMe = document.createElement("input");
        let checkmark = document.createElement("span");
        let taskTitle = document.createElement("p");

        let taskBox2 = document.createElement("div");
        let detailsButton = document.createElement("button");
        let datePreview = document.createElement("p");
        // edit and trash svg was imported

        taskContainer.classList.add("task");
        taskBox1.classList.add("taskBox1");
        checkMe.setAttribute("type", "checkbox");
        checkMe.setAttribute("name", "checkMe");
        checkMe.setAttribute("id", "checkMe");
        checkmark.classList.add("checkmark");
        taskTitle.classList.add("taskTitle");

        taskBox2.classList.add("taskBox2");
        detailsButton.classList.add("detailsButton");
        detailsButton.textContent = "Details";
        datePreview.classList.add("datePreview");

        taskTitle.textContent = item.title;
        datePreview.textContent = item.dueDate;
        detailsButton.dataset.details = item.title;

        taskBox1.appendChild(checkMe);
        taskBox1.appendChild(checkmark);
        taskBox1.appendChild(taskTitle);

        taskBox2.appendChild(detailsButton);
        taskBox2.appendChild(datePreview);

        let editSVG = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        let temp = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        temp.setAttribute(
          "d",
          "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
        );

        let temp2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        temp2.setAttribute("fill-rule", "evenodd");
        temp2.setAttribute(
          "d",
          "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
        );

        editSVG.appendChild(temp);
        editSVG.appendChild(temp2);

        editSVG.setAttribute("fill", "#5c5f6d");
        editSVG.setAttribute("width", "20");
        editSVG.setAttribute("height", "20");
        editSVG.setAttribute("viewBox", "0 0 16 16");
        editSVG.setAttribute("class", "bi bi-pencil-square");
        editSVG.setAttribute("id", "taskSVG");

        // trash SVG
        let trashSVG = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        let temp3 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        temp3.setAttribute(
          "d",
          "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
        );
        trashSVG.appendChild(temp3);

        trashSVG.setAttribute("fill", "#5c5f6d");
        trashSVG.setAttribute("width", "20");
        trashSVG.setAttribute("height", "20");
        trashSVG.setAttribute("viewBox", "0 0 16 16");
        trashSVG.setAttribute("class", "bi bi-trash-fill");
        trashSVG.setAttribute("id", "taskSVG");

        editSVG.dataset.edit = item.title;
        temp.dataset.edit = item.title;
        temp2.dataset.edit = item.title;
        trashSVG.dataset.delete = item.title;
        temp3.dataset.delete = item.title;

        trashSVG.classList.add("trash");
        editSVG.classList.add("edit");

        taskBox2.appendChild(editSVG);
        taskBox2.appendChild(trashSVG);

        taskContainer.appendChild(taskBox1);
        taskContainer.appendChild(taskBox2);

        document.querySelector(".body").appendChild(taskContainer);

        validateCheckbox();
      });
      populateDetailsPopUp();
      populateEditPopUp();
      changeSelectedListDOM();
      refreshSelectedTask();
    }
  });
}

function changeSelectedListDOM() {
  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault;
      changeSelectedTask(e.target.getAttribute("data-edit"));
    });
  });
}

function deleteTask() {
  let btn = document.querySelectorAll(".trash");
  btn.forEach((one) => {
    one.addEventListener("click", (e) => {
      console.log(e.target.getAttribute("data-delete"));
      deleteListTask(e.target.getAttribute("data-delete"));
      rePopulateTasksAfterDeletion();
      createListItems();
    });
  });
}

// new problem - when i hit submit, it needs to populate the body with task item

function rePopulateTasksAfterDeletion() {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let selectedList;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      selectedList = library[i].title;
    }
  }
  populateListTasks(selectedList);
  deleteTask();
}

function exitDetailsPopUp() {
  let btn = document.querySelectorAll("#detailsX");
  btn.forEach((item) => {
    item.addEventListener("click", hideDetailsPopUp);
  });
}

function hideDetailsPopUp() {
  // i need to figure out how to delete the details popup from the container without deleting any of the other elements!

  document.querySelectorAll(".detailsPopUp").forEach((e) => e.remove());
}

function populateDetailsPopUp() {
  let btn = document.querySelectorAll(".detailsButton");
  btn.forEach((item) => {
    item.addEventListener("click", (e) => {
      createDetailsPopUp(e.target.getAttribute("data-details"));
      exitDetailsPopUp();
    });
  });
}

function createDetailsPopUp(name) {
  let allDetailButtons = document.querySelectorAll(".detailsButton");
  let allTasks;
  let selectedList;

  allDetailButtons.forEach((btn) => {
    if (btn.getAttribute("data-details") == name) {
      let library = JSON.parse(localStorage.getItem("listLibrary"));
      for (let i = 0; i < library.length; i++) {
        if (library[i].selected == true) {
          selectedList = library[i];
          allTasks = library[i].tasks;
        }
      }
      let index = allTasks.findIndex((e) => e.title == name);

      let detailsPopUp = document.createElement("div");
      let detailsXContainer = document.createElement("div");
      let detailsTitle = document.createElement("p");
      let exitSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      let temp4 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      temp4.setAttribute(
        "d",
        "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
      );
      exitSVG.appendChild(temp4);

      exitSVG.setAttribute("fill", "currentColor");
      exitSVG.setAttribute("width", "20");
      exitSVG.setAttribute("height", "20");
      exitSVG.setAttribute("viewBox", "0 0 16 16");
      exitSVG.setAttribute("class", "bi bi-x-lg");
      exitSVG.setAttribute("id", "detailsX");

      let projectP = document.createElement("p");
      let detailsProject = document.createElement("span");
      let priorityP = document.createElement("p");
      let detailsPriority = document.createElement("span");
      let timeP = document.createElement("p");
      let detailsTime = document.createElement("span");
      let detailsP = document.createElement("p");
      let detailsBody = document.createElement("span");

      detailsPopUp.classList.add("detailsPopUp");
      detailsXContainer.classList.add("detailsXContainer");
      detailsTitle.classList.add("detailsTitle");
      detailsProject.classList.add("detailsProject");
      detailsPriority.classList.add("detailsPriority");
      detailsTime.classList.add("detailsTimes");
      detailsBody.classList.add("detailsBody");

      projectP.textContent = "Project: ";
      priorityP.textContent = "Priority: ";
      timeP.textContent = "Due Date: ";
      detailsP.textContent = "Details: ";

      detailsTitle.textContent = allTasks[index].title;
      detailsProject.textContent = selectedList.title;
      detailsPriority.textContent = allTasks[index].priority;
      detailsTime.textContent = allTasks[index].dueDate;
      detailsBody.textContent = allTasks[index].description;

      // append span to the project's p's

      projectP.appendChild(detailsProject);
      priorityP.appendChild(detailsPriority);
      timeP.appendChild(detailsTime);
      detailsP.appendChild(detailsBody);

      detailsXContainer.appendChild(detailsTitle);
      detailsXContainer.appendChild(exitSVG);

      detailsPopUp.appendChild(detailsXContainer);
      detailsPopUp.appendChild(projectP);
      detailsPopUp.appendChild(priorityP);
      detailsPopUp.appendChild(timeP);
      detailsPopUp.appendChild(detailsP);

      document.querySelector(".popUpContainer").appendChild(detailsPopUp);
    }
  });
}

function createListContainer() {
  let container = document.createElement("div");
  container.classList.add("listContainer");
  document.querySelector(".list").appendChild(container);
}

function createListItems() {
  document.querySelector(".listContainer").textContent = "";
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let container = document.querySelector(".listContainer");
  library.forEach((item, index) => {
    let listItem = document.createElement("button");
    let listName = document.createElement("div");
    let listNum = document.createElement("div");

    listItem.dataset.name = item.title;
    listName.dataset.name = item.title;
    listNum.dataset.name = item.title;
    listItem.classList.add("listItem");
    listItem.classList.add("listItemToBeClicked");
    listItem.classList.add("sideList");
    listName.classList.add("itemName");
    listNum.classList.add("itemNum");
    listName.textContent = `${item.title}`;
    listNum.textContent = `${item.tasks.length}`;
    listItem.appendChild(listName);
    listItem.appendChild(listNum);
    container.appendChild(listItem);
  });
  selectListItem();
}

function selectListItem() {
  let allItems = document.querySelectorAll(".sideList");
  allItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      changeSelectedList(e.target.getAttribute("data-name"));
      addSelectedItemClass(e.target.getAttribute("data-name"));
      removeSelectedItemClass(e.target.getAttribute("data-name"));
      populateListTasks(e.target.getAttribute("data-name"));
      deleteTask();
    });
  });
}

function addSelectedItemClass(title) {
  let allItems = document.querySelectorAll(".listItemToBeClicked");
  allItems.forEach((list) => {
    if (list.getAttribute("data-name") == title) {
      list.classList.add("itemOutline");
    }
  });
}

function addSelectedItemClassOnceAddIsClicked() {
  let library = JSON.parse(localStorage.getItem("listLibrary"));
  let selectedList;
  for (let i = 0; i < library.length; i++) {
    if (library[i].selected == true) {
      selectedList = library[i].title;
    }
  }
  addSelectedItemClass(selectedList);
}

function removeSelectedItemClass(title) {
  let allItems = document.querySelectorAll(".listItem");
  allItems.forEach((list) => {
    if (list.getAttribute("data-name") !== title) {
      list.classList.remove("itemOutline");
    }
  });
}

function hideSubmitList() {
  let btn = document.querySelector(".submitList");
  btn.style.display = "none";
}

function showSubmitList() {
  let btn = document.querySelector(".submitList");
  btn.style.display = "flex";
}

function hideSubmitTask() {
  let btn = document.querySelector(".submitTask");
  btn.style.display = "none";
}

function showSubmitTask() {
  let btn = document.querySelector(".submitTask");
  btn.style.display = "flex";
}

function hideSubmitNote() {
  let btn = document.querySelector(".submitNote");
  btn.style.display = "none";
}

function showSubmitNote() {
  let btn = document.querySelector(".submitNote");
  btn.style.display = "flex";
}

function hidePopUp() {
  let popUp = document.querySelector(".popUp");
  popUp.style.display = "none";
}

function showPopUp() {
  let popUp = document.querySelector(".popUp");
  popUp.style.display = "grid";
}

function showDetails() {
  document.querySelector(".textAreaDescription").style.display = "block";
}

function hideDetails() {
  document.querySelector(".textAreaDescription").style.display = "none";
}

function showDateAndPriority() {
  let dateAndPriority = document.querySelectorAll(".bottomBarFormat1");
  dateAndPriority.forEach((item) => {
    item.style.display = "flex";
  });
}
function hideDateAndPriority() {
  let dateAndPriority = document.querySelectorAll(".bottomBarFormat1");
  dateAndPriority.forEach((item) => {
    item.style.display = "none";
  });
}

function validateCheckbox() {
  let allCheckboxes = document.querySelectorAll("#checkMe");
  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked === true) {
        e.target.nextElementSibling.nextElementSibling.style.textDecoration =
          "line-through";
      } else {
        e.target.nextElementSibling.nextElementSibling.style.textDecoration =
          "none";
      }
    });
  });
}

function populateEditPopUp() {
  let allEditBtns = document.querySelectorAll(".edit");
  allEditBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let editForm = document.createElement("form");
      let editPopUpHeader = document.createElement("div");
      let exitSVG = createExitSVG();
      let editPopUpBody = document.createElement("div");
      let title = document.createElement("input");
      let description = document.createElement("textarea");
      let editPopUpBottomBar = document.createElement("div");
      let bottomBarFormat1 = document.createElement("div");
      let dueDateText = document.createElement("p");
      let dueDateInput = document.createElement("input");
      let bottomBarFormat2 = document.createElement("div");
      let bottomBarFormat11 = document.createElement("div");
      let priorityText = document.createElement("p");
      let lowPriority = document.createElement("button");
      let mediumPriority = document.createElement("button");
      let highPriority = document.createElement("button");
      let submit = document.createElement("button");

      editForm.classList.add("editPopUp");
      editPopUpHeader.classList.add("editPopUpHeader");
      editPopUpBody.classList.add("editPopUpBody");
      title.classList.add("inputClass");
      title.setAttribute("id", "title");
      title.setAttribute("input", "text");
      title.setAttribute("placeholder", "Title:");
      description.classList.add("inputClass");
      description.setAttribute("id", "description");
      description.setAttribute("placeholder", "Description:");

      editPopUpBottomBar.classList.add("editPopUpBottomBar");
      bottomBarFormat1.classList.add("bottomBarFormat1");
      dueDateText.textContent = "Due Date: ";
      dueDateInput.setAttribute("type", "date");
      dueDateInput.setAttribute("id", "dueDate");
      bottomBarFormat2.classList.add("bottomBarFormat2");
      bottomBarFormat11.classList.add("bottomBarFormat1");
      priorityText.textContent = "Priority: ";
      lowPriority.classList.add("low");
      lowPriority.textContent = "Low";
      mediumPriority.classList.add("medium");
      mediumPriority.textContent = "Medium";
      highPriority.classList.add("high");
      highPriority.textContent = "High";
      submit.classList.add("addItem");
      submit.setAttribute("id", "submitEdit");

      submit.textContent = "Submit";

      // add additional classes to grab inputs

      title.classList.add("forEditTitle");
      description.classList.add("forEditDescription");
      dueDateInput.classList.add("forEditDueDate");
      lowPriority.classList.add("forEditLow");
      mediumPriority.classList.add("forEditMedium");
      highPriority.classList.add("forEditHigh");

      editPopUpHeader.appendChild(exitSVG);
      editPopUpBody.appendChild(title);
      editPopUpBody.appendChild(description);
      bottomBarFormat1.appendChild(dueDateText);
      bottomBarFormat1.appendChild(dueDateInput);
      editPopUpBottomBar.appendChild(bottomBarFormat1);
      bottomBarFormat11.appendChild(priorityText);
      bottomBarFormat11.appendChild(lowPriority);
      bottomBarFormat11.appendChild(mediumPriority);
      bottomBarFormat11.appendChild(highPriority);
      bottomBarFormat2.appendChild(bottomBarFormat11);
      bottomBarFormat2.appendChild(submit);
      editPopUpBottomBar.appendChild(bottomBarFormat2);

      editForm.appendChild(editPopUpHeader);
      editForm.appendChild(editPopUpBody);
      editForm.appendChild(editPopUpBottomBar);

      document.querySelector(".popUpContainer").appendChild(editForm);
      exitEditPopUp();
      submitEditTask();
    });
  });
  addEditTitleToSubmitBtn();
}
//delete if not needed
function addEditTitleToSubmitBtn() {
  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault;
      setSubmitBtnEditDataset(e.target.getAttribute("data-edit"));
    });
  });
}

function setSubmitBtnEditDataset(taskTitle) {
  document.querySelectorAll("#submitEdit").forEach((btn) => {
    btn.dataset.editTask = taskTitle;
  });
}

function exitEditPopUp() {
  document.querySelectorAll("#detailsX").forEach((btn) => {
    btn.addEventListener("click", hideEditPopUp);
  });
}

function hideEditPopUp() {
  document.querySelectorAll(".editPopUp").forEach((e) => e.remove());
}

function createExitSVG() {
  let exitSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let temp4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  temp4.setAttribute(
    "d",
    "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
  );
  exitSVG.appendChild(temp4);

  exitSVG.setAttribute("fill", "currentColor");
  exitSVG.setAttribute("width", "20");
  exitSVG.setAttribute("height", "20");
  exitSVG.setAttribute("viewBox", "0 0 16 16");
  exitSVG.setAttribute("class", "bi bi-x-lg");
  exitSVG.setAttribute("id", "detailsX");

  return exitSVG;
}

function createNotes() {
  const noteLibrary = JSON.parse(localStorage.getItem("noteLibrary"));
  document.querySelector(".body").textContent = "";
  let notesContainer = document.createElement("div");
  noteLibrary.forEach((note) => {
    let noteCard = document.createElement("div");
    let noteHeader = document.createElement("div");
    let noteTitle = document.createElement("p");
    let exitSVG = createExitSVG();
    let noteBody = document.createElement("p");

    notesContainer.classList.add("notesContainer");
    noteCard.classList.add("note");
    noteHeader.classList.add("noteHeader");
    noteTitle.classList.add("noteTitle");
    noteBody.classList.add("noteBody");

    noteTitle.textContent = note.title;
    noteBody.textContent = note.description;

    exitSVG.dataset.deleteNote = note.title;
    exitSVG.classList.add("deleteNote");

    noteHeader.appendChild(noteTitle);
    noteHeader.appendChild(exitSVG);
    noteCard.appendChild(noteHeader);
    noteCard.appendChild(noteBody);
    notesContainer.appendChild(noteCard);
    document.querySelector(".body").appendChild(notesContainer);
  });
}

function populateNotes() {
  document.querySelector(".notesBtn").addEventListener("click", () => {
    createNotes();
    deleteNoteDOM();
  });
  // new issue is if you keep clicking on the notes btn, it will keep populating the whole list

  // i need to de-select the list items when clicking on the notes button
}

function deleteNoteDOM() {
  let allBtn = document.querySelectorAll(".deleteNote");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-delete-note") != undefined) {
        deleteNote(e.target.getAttribute("data-delete-note"));
        rePopulateNotes();
      }
    });
  });
}

function rePopulateNotes() {
  createNotes();
  deleteNoteDOM();
}

// function deSelectAllItems() {}

function changeAddPopUp() {
  showPopUp();
  hideDetails();
  hideDateAndPriority();
  switchToTask();
  switchToNote();
  switchToList();
  closePopUp();
  submitList();
  addSelectedItemClassOnceAddIsClicked();
}

export {
  rePopulateNotes,
  populateNotes,
  addSelectedItemClassOnceAddIsClicked,
  rePopulateTasksAfterDeletion,
  selectListItem,
  createListContainer,
  createListItems,
  deleteBtn,
  populateAddPopUp,
};
