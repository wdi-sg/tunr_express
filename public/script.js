let likeButtonHandler = function(){
    var data = { "artist_id": artistid, "user_id": userid};

    var request = new XMLHttpRequest();   // new HttpRequest instance

    request.addEventListener("load", function(){

      console.log("DONE");
      console.log( this.responseText );
    });

    request.open("POST", '/likes');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.send(JSON.stringify(data));
}


let likeButton = document.getElementById('like');
likeButton.addEventListener('click', likeButtonHandler)