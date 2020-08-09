"use strict";

const xlabels = [];
const yAfrica = []
const yEurope = []
const yMiddelEast = []
const yRussiaUkraine = []

chartIt();

async function chartIt(){
await getData();

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Africa',
            data: yAfrica,
            backgroundColor: [
                'rgba(255, 0, 255, 1)'
            ],
            borderColor: [
                'rgba(255, 0, 255, 1)'
            ],
            borderWidth: 2,
            fill: false,
        },{
            label: 'Europe',
            data: yEurope,
            backgroundColor: [
                'rgba(86, 8, 50, 1)'
            ],
            borderColor: [
                'rgba(86, 8, 50, 1)'
            ],
            borderWidth: 2,
            fill: false,
        },{
            label: 'Middel East',
            data: yMiddelEast,
            backgroundColor: [
                'rgba(80, 0, 86, 1)'
            ],
            borderColor: [
                'rgba(80, 0, 86, 1)'
            ],
            borderWidth: 2,
            fill: false,
        },{
            label: 'Russia and Ukraine',
            data: yRussiaUkraine,
            backgroundColor: [
                'rgba(133, 0, 143, 1)'
            ],
            borderColor: [
                'rgba(133, 0, 143, 1)'
            ],
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values){
                        return value + " %";
                    },
                    beginAtZero: false,
                    }
            }]
        }
    }
});
}

async function getData(){
const response = await fetch(`https://spreadsheets.google.com/feeds/list/1670CjJQuAbLnR0bsaqwSTT55Ha6Nbq4ePtXszc3gZp4/2/public/values?alt=json`);
const myJson = await response.json();

console.log("here :", myJson.feed.entry);

myJson.feed.entry.forEach(row => {
    xlabels.push(row.gsx$year.$t);
    yAfrica.push(row.gsx$africa.$t)
    yEurope.push(row.gsx$europe.$t)
    yMiddelEast.push(row.gsx$middeleast.$t)
    yRussiaUkraine.push(row.gsx$russiaandukraine.$t)
});
}