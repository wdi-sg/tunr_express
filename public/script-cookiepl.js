console.log("hello world - cookie pl script");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addToCookiePl() {
  let addButArr = document.getElementsByClassName("cookiepl");
  // console.log(addButArr);

  let mapObj = {};
  let cookieplOG = getCookie("cookiepl");
  let cookieplOGArr = cookieplOG.split("-");
  // console.log(cookieplOGArr);
  for (let z = 1; z < cookieplOGArr.length; z++) {
    mapObj[cookieplOGArr[z]] = true;
  }
  // console.log(mapObj);

  for (let i = 0; i < addButArr.length; i++) {
    addButArr[i].addEventListener("click", (event) => {
      let cookiepl = getCookie("cookiepl");
      cookiepl = cookiepl + "-" + event.target.id;
      console.log(cookiepl);
      setCookie("cookiepl", cookiepl, 1);
      event.target.classList.add("text-danger");
      event.target.innerText = "ADDED TO COOKIE PLAYLIST";
    });

    const addBut = addButArr[i];
    const addButID = addBut.id;
    // console.log(addButID);

    if (mapObj[addButID]) {
      addBut.classList.add("text-danger");
      addBut.innerText = "ADDED TO COOKIE PLAYLIST";
    }
  }
}

addToCookiePl();
