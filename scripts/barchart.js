"use strict";

const colorArray = ["#ff00ff","#f200f2","#e400e4","#d700d7","#c900c9","#bc00bc","#ae00ae","#a100a1","#940094","#860086","#29662b","#276029","#255b26","#225524","#204f22","#1e4a1f","#1c441d","#193e1b","#173918","#153316"];
const keyList = document.querySelector(".keyList");

// this variable will hold your JSON array
let myJSON;

// this variable will hold the length of your JSON array .length - we need that to spread the columns evevnly over the 360 degrees of a circle
let numberOfItems;

// this variable will get the highest value of your dataset I've made a function for that at the bottom
let highestValue;

const template = document.querySelector("template").content;
const reciever = document.querySelector(".insetData");

const link = 'https://spreadsheets.google.com/feeds/list/1W-eYiOt1bNIlWJHbf5vsAo1wEpfBMTV4qJT5jPTtHz0/1/public/values?alt=json';

document.addEventListener("DOMContentLoaded", start);
async function start() {
   // https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808 start
    async function fetchAsync () {
       // await response of fetch call
       let response = await fetch(link);
       // only proceed once promise is resolved
       let data = await response.json();
       // only proceed once second promise is resolved
       return data;
     } 
     // trigger async function
     // log response or catch error of fetch promise
     fetchAsync()
         .then(data => {
             myJSON = data
             highestValue = getMax()
             createVis(data)})
         .catch(reason => console.log(reason.message))
   // https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808 end
}

function createVis() {
   numberOfItems = myJSON.feed.entry.length;

   //document.querySelector("h2").textContent = myJSON.feed.title.$t;

    myJSON.feed.entry.forEach((row, index) => {
       const clone = template.cloneNode("true");
       const barHeight =  row.gsx$value.$t;
       const placement = 100 / numberOfItems;

       clone.querySelector("p").textContent = row.gsx$name.$t;
       clone.querySelector(".bar").style = `height: ${barHeight}%; width: calc(${placement}% - 1vw); background-color: ${colorArray[index]}; left: ${placement * index}%`;

       let newLi = document.createElement("li");

       newLi.textContent = `${row.gsx$name.$t}/${row.gsx$countryname.$t}`;

       keyList.appendChild(newLi);

       reciever.appendChild(clone);
    })
}
function getMax() {
   return myJSON.feed.entry.reduce((max, b) => Math.max(max, b.gsx$value.$t), myJSON.feed.entry[0].gsx$value.$t);
}
