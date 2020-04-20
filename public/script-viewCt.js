console.log("hello world - view count script");

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let getViewCount = () => {
  let count = parseInt(getCookie("viewCountBrow"));
  console.log(count);
  return count;
};

let setViewCount = () => {
  const viewCountDiv = document.getElementById("viewcount");
  viewCountDiv.innerText = "Home Page View Count: " + getViewCount();
}

setViewCount();
