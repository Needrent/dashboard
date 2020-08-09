 "use strict";

 const colorArray = ["#ff00ff","#f200f2","#e400e4","#d700d7","#c900c9","#bc00bc","#ae00ae","#a100a1","#940094","#860086","#29662b","#276029","#255b26","#225524","#204f22","#1e4a1f","#1c441d","#193e1b","#173918","#153316"];

 // this variable will hold your JSON array
 let myJSON;

// this variable will hold the length of your JSON array .length - we need that to spread the columns evevnly over the 360 degrees of a circle
 let numberOfItems;

// this variable will get the highest value of your dataset I've made a function for that at the bottom
 let highestValue;
// 
 const template = document.querySelector("template").content;
 const reciever = document.querySelector(".all_the_containers");
 
 const link = 'https://spreadsheets.google.com/feeds/list/1zsaplq8m5bPfcWvg_C_ytgkSxmslqXn9K1gxPw4DTPk/1/public/values?alt=json';

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
              console.log(data)
              myJSON = data
              highestValue = getMax()
              createVis(data)})
          .catch(reason => console.log(reason.message))

    // https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808 end
     
     // here you should fetch the json. Set the highestValue variable by calling getMax.
     //You could also determin the highest value by looking in your spread sheet and equal the variable to that.
     // then you need to set the numberOfItems variable to the .length of the JSON array. 
     // LASTLY you need to call the createVis function

 }

 function createVis() {
     console.log(myJSON.feed.entry);
    numberOfItems = myJSON.feed.entry.length;
    console.log(highestValue);
     // here is a foreach sentence iterating over the myJSON.feed.entry
     // you'll need index to determin the angle of the columns
     // console.log index to see what it does
     // You'll also need to clone and append a html template. Make the template from one of the elements in the starter file.
     // what you should do to the columns is what you did in the .bar_container:nth-child selectors in the first part of the exercise. But here you should do it with javascript.
     // you will need the highestValue to set  the ratio of the columns
      // use colorArray to set color: colorArray[index] < gold hint
     // Hint: to make an element appear in level inside an element that is rotatated, you counter rotate by the same amount (minus);
     document.querySelector("h2").textContent = myJSON.feed.title.$t;
     myJSON.feed.entry.forEach((row, index) => {
         /*console.log(index); // gives me the placement of the items 0 - 19 (20 total)
         console.log(row.Name);
         console.log(row.Value);*/
        const clone = template.cloneNode("true");
        const barHeight =  row.gsx$value.$t / highestValue * 100;
        console.log(barHeight);

        clone.querySelector("p span").textContent = row.gsx$name.$t;
        clone.querySelector(".bar").style = `height: ${barHeight}%; background-color: ${colorArray[index]}`;
        clone.querySelector(".name span").style = `background-color: ${colorArray[index]}`;
        clone.querySelector(`.bar_container`).style.rotate = 360/numberOfItems*index+"deg";
        clone.querySelector(`.name`).style.rotate = -360/numberOfItems*index+"deg";
        
        reciever.appendChild(clone);
     })
 }


function getMax() {
    //console.log(myJSON);
    // this is hard coded to work with a sheet where the column holding the values is called "value" (gsx$value.$t)
// it returns the highest value in the data set
    return myJSON.feed.entry.reduce((max, b) => Math.max(max, b.gsx$value.$t), myJSON.feed.entry[0].gsx$value.$t);
 }
