var React = require("react");

class editSong extends React.Component {
  render() {
        const link = "/songs/"+this.props.song[0].id+"?_method=put";

    return (
      <html>
        <head />
        <body>
          <h3>Edit Song Form Goes Here!</h3>
            <form method="POST" action={link}  style={{textAlign: "Center"}}>
                <span>Name: </span>
                    <input  id= "title" type="text" name="title" placeholder="Enter Title" required
                            oninvalid="this.setCustomValidity('Enter Valid Title Here')"
                            oninput="this.setCustomValidity('')" value={this.props.song[0].title}></input>
                    <br></br><br></br>

                <span>Album: </span>
                    <input  id= "album" type="text" name="album" placeholder="Enter album" required
                            oninvalid="this.setCustomValidity('Enter Valid album Here')"
                            oninput="this.setCustomValidity('')" value={this.props.song[0].album} ></input>
                    <br></br><br></br>

                <span>Artwork Source: </span>
                    <input type="text" name="img" placeholder="Enter link" required
    oninvalid="this.setCustomValidity('Enter Valid link Here')"
    oninput="this.setCustomValidity('')"  value={this.props.song[0].artwork}></input>
                    <br></br><br></br>

                    <span>Preview Link: </span>
                    <input type="text" name="preview_link" placeholder="Enter Preview Link here" required
    oninvalid="this.setCustomValidity('Enter preview link Here')"
    oninput="this.setCustomValidity('')"  value={this.props.song[0].preview_link}></input>

                    <br></br><br></br>



                    <input type="submit" value="Submit"></input>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = editSong;