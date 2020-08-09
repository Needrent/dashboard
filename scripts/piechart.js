"use strict";

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    let theJson;

    let addUp = 0;
    let circumfernce = 100 * Math.PI;

    let accumulatedValue;
    
    const api = "1osx9BfY0Tv3HgTIPCVd5V_sdg4hVrIg9zc03SRK6Diw";
    let piechartList = document.querySelector("#piechartList");

    document.addEventListener("DOMContentLoaded", getJSON);
    async function getJSON() {
        let result = await fetch(`https://spreadsheets.google.com/feeds/list/${api}/3/public/values?alt=json`);
        theJson = await result.json();

        accumulatedValue = getAccumulatedValue();
        //console.log("accumulatedValue", accumulatedValue);
        doThePie();
    }

    function doThePie(){
        theJson.feed.entry.forEach((each, i) =>{
            console.log(each.gsx$value.$t);
            let piePiece = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const pieSize = each.gsx$value.$t / accumulatedValue * circumfernce;

            piePiece.setAttribute("r", "50");
            piePiece.setAttribute("cx", "50");
            piePiece.setAttribute("cy", "50");

            piePiece.classList.add("piel");
            piePiece.style.strokeDasharray = `${pieSize} ${circumfernce}`;

            piePiece.style.strokeDashoffset = -addUp;

            piePiece.style.stroke = each.gsx$color.$t;

            const newLi = document.createElement("li");
            newLi.style.backgroundColor = each.gsx$color.$t;
            newLi.innerHTML = `${each.gsx$name.$t} || ${parseFloat(each.gsx$value.$t).toFixed(2)}%` ;

            piechartList.appendChild(newLi);

            document.querySelector(".cirkel").appendChild(piePiece);

            addUp += pieSize;
        })
    }

    function getAccumulatedValue(){
        return theJson.feed.entry.reduce((accumulator, currentValue) =>
            accumulator + parseInt(currentValue.gsx$value.$t), 0);
    }