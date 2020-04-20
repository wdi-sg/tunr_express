console.log("hello world");
let viewCountDiv = document.getElementById("viewcount");

let countStr = document.cookie;
let countStrArr = countStr.split("=");
let count = parseInt(countStrArr[1]);
viewCountDiv.innerText = "Home Page View Count: " + count;
