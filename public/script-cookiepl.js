console.log("hello world - cookie pl script");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Add song id to playlist cookie
function addToCookiePl() {
  let addButtonArr = document.getElementsByClassName("cookiepl");
  //Split the song ids in cookie string and add each id to mapObj with a value true
  let mapObj = {};
  let cookieplOG = getCookie("cookiepl");
  let cookieplOGArr = cookieplOG.split("-");
  for (let z = 1; z < cookieplOGArr.length; z++) {
    mapObj[cookieplOGArr[z]] = true;
  }
  //Callback function for event listener'click'
  function onClickAdd(event) {
    let cookiepl = getCookie("cookiepl");
    //Adds song id to cookie string
    cookiepl = cookiepl + "-" + event.target.id;
    console.log(cookiepl);
    setCookie("cookiepl", cookiepl, 1);
    event.target.classList.remove("btn-info");
    event.target.classList.add("btn-danger");
    event.target.innerText = "ADDED TO COOKIE PLAYLIST";
    //Removes 'click' event listener from button after song has been added to playlist cookie
    event.target.removeEventListener("click", onClickAdd, false);
  }
  //Adds event listener to all buttons 
  for (let i = 0; i < addButtonArr.length; i++) {
    addButtonArr[i].addEventListener("click", onClickAdd);
    const addBut = addButtonArr[i];
    const addButID = addBut.id;
    //if song is already in cookie playlist, change button display 
    if (mapObj[addButID]) {
      addBut.classList.remove("btn-info");
      addBut.classList.add("btn-danger");
      addBut.innerText = "ADDED TO COOKIE PLAYLIST";
      addBut.removeEventListener("click", onClickAdd, false);
    }
  }
}

addToCookiePl();
