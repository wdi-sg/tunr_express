console.log("hello world - view count script");

let getViewCount = () => {
  let countStr = document.cookie;
  let countStrArr = countStr.split("=");
  let count = parseInt(countStrArr[1]);
  return count;
};

let setViewCount = () => {
  const viewCountDiv = document.getElementById("viewcount");
  viewCountDiv.innerText = "Home Page View Count: " + getViewCount();
}

setViewCount();
