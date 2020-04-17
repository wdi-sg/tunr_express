var React = require("react");

class newPlayList extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
            <form method="POST" action="/playlist"  style={{textAlign: "Center"}}>
                <span>Name Of Playlist: </span>
                    <input  id= "name" type="text" name="name" placeholder="Enter Play List Name" required
                            oninvalid="this.setCustomValidity('Enter Valid Play List Name Here')"
                            oninput="this.setCustomValidity('')" ></input>
                    <br></br><br></br>

                    <input type="submit" value="Submit"></input>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = newPlayList;