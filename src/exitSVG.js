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

export default exitSVG;
