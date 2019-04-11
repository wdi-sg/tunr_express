var React = require("react");
class Artist extends React.Component {

  render() {

    return (
      <html>
        <head />
        <body>
            <div>
                <h1>{this.props.artists.name}</h1>
                <img src={this.props.artists.photo_url}/>
                <p>{this.props.artists.nationality}</p>

                <button type="submit"><a href={"/artists/" + this.props.artists.id + "/edit"} style={{textDecoration: "none", color: "grey"}}>Edit</a></button>
                <button type="submit"><a href="/" style={{textDecoration: "Delete", color: "grey"}}>Delete</a></button>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;