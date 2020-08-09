"use strict";

// POINTS (temp)
let polyArryY = ["25", 
"54",
"58",
"64",
"155",
"54",
"255",
"116",
"80",
"120",
"25"];

const dataArea = document.querySelectorAll("#data");

let maxHeight = Math.max(parseInt(polyArryY));
console.log(maxHeight);

dataArea[0].childNodes[1].points[0].x = 100;
dataArea[0].childNodes[1].points[0].y = 250;

const numbOfSpaces = polyArryY.length - 1;
let distanceX = (580 - 100) / numbOfSpaces;

polyArryY.forEach((data, index) =>{
    dataArea[0].childNodes[1].points[index].y = data;
    dataArea[0].childNodes[1].points[index].x = 100 + (distanceX * index);
})

console.log(dataArea[0].childNodes[1].points);