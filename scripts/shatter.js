const api = "1YNXXgt3jCRJJ3Y8mt2GC2pFf98RWvQuvNRUI1HqigCs";

document.addEventListener("DOMContentLoaded", getList);
async function getList(){
    let result = await fetch(`https://spreadsheets.google.com/feeds/list/${api}/1/public/values?alt=json`);
    let theJson = await result.json();
    console.log(theJson);

    const topText = document.querySelector(".text_charge");
    const bottomText = document.querySelector(".text_age");

    bottomText.textContent = "Market Income";
    topText.textContent = "Disposable Income";

    theJson.feed.entry.forEach((each, i)=>{
        //console.log(theJson);
        //console.log(each);

        const disposableIncome = parseFloat(each.gsx$disposableincome.$t);
        const marketIncome = parseFloat(each.gsx$marketincome.$t);
        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.textContent = each.gsx$entity.$t;

        dot.setAttribute("r", "2");

        dot.setAttribute("cx", (marketIncome * 4) + 30);
        text.setAttribute("x", (marketIncome * 4) + 30);

        dot.setAttribute("cy", 110 - (disposableIncome * 2));
        text.setAttribute("y", 110 - (disposableIncome * 2));

        dot.classList.add("dot");
        text.classList.add("textByDot");
        document.querySelector(".svg_container svg").appendChild(dot);
        document.querySelector(".svg_container svg").appendChild(text);
    })
}