let text = document.cookie;
var numb = text.match(/\d/g);
numb = numb.join("");
numb=parseInt(numb);
if(numb>10){
    let displayImage=document.getElementById("visitBadge");
    displayImage.classList.remove("hidden");
    displayImage.setAttribute("src","new.png");
    let displayText=document.getElementById("visitText");
    displayText.classList.remove("hidden");
    displayText.innerText="newbie badge";

}
if(numb>50){
    let displayImage=document.getElementById("visitBadge");

    displayImage.setAttribute("src","medal.png");
    let displayText=document.getElementById("visitText");

    displayText.innerText="Repeat Badge";

}
if(numb>100){
    let displayImage=document.getElementById("visitBadge");

    displayImage.setAttribute("src","best.png");
    let displayText=document.getElementById("visitText");

    displayText.innerText="veteran badge";

}