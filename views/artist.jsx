var React = require("react");

class Artist extends React.Component {
  render() {
   console.log("show 1 artist");
    var url = "/artist/"+this.props.artistId;
     // console.log("artist name: ", artistsList[0].name);
            // <form action={url}>
                // <input type="text" value={this.props.artistName} /><br/>
                // <input type="text" value={this.props.artistNat}/><br/>
            // </form>

     return (
      <html>
      <body>
        <h1>Artist's info</h1>
          <div> <img src={this.props.artistImg} alt={this.props.artistName} height="200" width="200"/>
          </div>

            <p>{this.props.artistName}<br/></p>
            <p>{this.props.artistNat}<br/></p>
            <form action="/artist/edit">
            <button type="button">Edit artist info</button>
          </form>
      </body>
      </html>
      );
 }
}

module.exports = Artist;