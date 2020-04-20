console.log("hello world - cookie pl script");

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addToCookiePl() {

  let addButArr = document.getElementsByClassName("cookiepl");

  for (let i=0; i<addButArr.length; i++) {
    addButArr[i].addEventListener("click", (event) => {
      let cookiepl = getCookie("cookiepl");
      cookiepl = cookiepl + "-" + event.target.id;
      console.log(cookiepl);
      setCookie("cookiepl", cookiepl, 1);
    });
  }

}

addToCookiePl();
