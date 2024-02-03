// trash SVG
let trashSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
let temp3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
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

export default trashSVG;
