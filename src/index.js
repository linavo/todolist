import {
  createListContainer,
  createListItems,
  deleteBtn,
  populateAddPopUp,
  populateNotes,
} from "./projectDOM";
import { refreshSelectedList } from "./list";

function invokeAllFunctions() {
  createListContainer();
  populateAddPopUp();
  deleteBtn();
  createListItems();
  refreshSelectedList();
  populateNotes();
}

invokeAllFunctions();

//only for testing
let library = JSON.parse(localStorage.getItem("listLibrary"));
