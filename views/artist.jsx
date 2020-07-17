var React = require("react");

class Artist extends React.Component {
  render() {
   console.log("show 1 artist");
    var url = "/artist/"+this.props.artistId;
    var url2 = "/artist/"+this.props.artistId + "/songs";
    var url3 = "/artist/"+this.props.artistId+"/edit?_method=put";
    var url4 = "/artist/"+this.props.artistId+"delete?_method=delete";
     // console.log("artist name: ", artistsList[0].name);
            // <form action={url}>
                // <input type="text" value={this.props.artistName} /><br/>
                // <input type="text" value={this.props.artistNat}/><br/>
            // </form>

     return (
      <html>
      <body>
        <h1>Artist's info</h1>
          <div> <img src={this.props.artistImg} alt={this.props.artistName} height="200" width="230"/>
          </div>

            <p>{this.props.artistName}<br/></p>
            <p>{this.props.artistNat}<br/></p>

        <form action={url2}>
            <input type="submit" value="Songs list"/>
          </form>
            <form action={url3}>
            <input type="submit" value="Edit artist info"/>
          </form>
           <form action={url4} method="POST">
            <input type="submit" value="Delete artist"/>
          </form>
      </body>
      </html>
      );
 }
}

module.exports = Artist;