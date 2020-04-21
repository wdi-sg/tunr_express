    String.prototype.replaceAll = function (stringToFind, stringToReplace) {
        if (stringToFind === stringToReplace) return this;
        var temp = this;
        var index = temp.indexOf(stringToFind);
        while (index != -1) {
            temp = temp.replace(stringToFind, stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
    };


let text = document.cookie;
console.log(text);
let stringReplacement= text.replaceAll(`=`,`":"`)
stringReplacement= stringReplacement.replaceAll(`;`,`","`)
stringReplacement= `'{"`+stringReplacement+`"}'`;

// preserve newlines, etc - use valid JSON
stringReplacement = stringReplacement.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
stringReplacement = stringReplacement.replace(/[\u0000-\u0019]+/g,"");
stringReplacement = stringReplacement.replace(/\s+/g, '');
stringReplacement=stringReplacement.replace(`,`, `, `)
console.log(stringReplacement);
let stringObject=JSON.stringify(stringReplacement);
stringObject=JSON.parse(stringObject);
//stringObject=JSON.parse(stringObject);
console.log(typeof stringObject);
var obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
console.log(typeof obj)
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