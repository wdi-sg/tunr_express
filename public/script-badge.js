console.log("hello world - badge script");

function getBadge() {
  let newbieText =
    "You have earned a Newbie Badge for visiting this page 10 or more times!";
  let repeatText =
    "You have earned a Repeat Badge for visiting this page 50 or more times!";
  let veteranText =
    "You have earned a Veteran Badge for visitng this page 100 or more times!";
  let congratsMsg = document.getElementById("congrats");
  let badgeImg = document.getElementById("badge-img");
  let newImg = document.createElement("img");

  let count = getViewCount();
  if (count >= 10 && count < 50) {
    congratsMsg.innerText = newbieText;
    newImg.src =
      "https://t4.ftcdn.net/jpg/01/32/33/37/240_F_132333798_CqlQPy5WBhLU4GQ5PcAIHiUha5oH7GQA.jpg";
    newImg.style.width = "300px";
    newImg.style.height = "300px";
    badgeImg.appendChild(newImg);
  } else if (count >= 50 && count < 100) {
    congratsMsg.innerText = repeatText;
    newImg.src =
      "https://t3.ftcdn.net/jpg/01/09/40/30/240_F_109403029_961IdSXmUGSUKdCK5ghFxtZABFRlPvVP.jpg";
    newImg.style.width = "300px";
    newImg.style.height = "300px";
    badgeImg.appendChild(newImg);
  } else if (count > 100) {
    congratsMsg.innerText = veteranText;
    newImg.src =
      "https://t3.ftcdn.net/jpg/01/84/32/82/240_F_184328219_7aKgQJfCJ3T6DiAaRSdkJuZZXzaRA7d8.jpg";
    newImg.style.width = "300px";
    newImg.style.height = "300px";
    badgeImg.appendChild(newImg);
  }
}

getBadge();
