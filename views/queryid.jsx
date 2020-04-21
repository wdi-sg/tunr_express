var React = require("react");

class Queryid extends React.Component {
  render() {
    return (
      <html>
        <head>
        <title>{this.props.name}</title>
               <meta charSet="utf-8" />
        </head>

        <body>
          <h1>Here is the artist you requested: </h1>
            <div>
                <div>
                    <h3 style={{color:"green"}}>Artist</h3>
                    <p>{this.props.name}</p>
                </div>
                <div>
                    <h3 style={{color:"green"}}>Photo</h3>
                    <div> <img src = {this.props.photo_url} width="300" height="auto"/> </div>
                </div>
                <div>
                    <h3 style={{color:"green"}}>Nationality</h3>
                    <p>{this.props.nationality}</p>
                </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Queryid;





/*const React = require("react");
class Queryid extends React.Component {
  render() {
    let artistResult;
    console.log(this.props.artists);
    const id = parseInt(this.props.id);
    const artistResult = this.props.artists;
    if (artists.length > 1) {
        artistResult = artists.map(artists => {
            const artistPath = "artists/" + artist.id;

      return (
          <head>
            <title>Here is the artist you requested!</title>
          </head>

          <body>
              <div>
              <a href={artistPath}></a>
            <ul>
              <li>
                <strong>Id</strong>: {this.props.id}
              </li>
              <li>
                <strong>Name</strong>: {this.props.name}
              </li>
              <li>
                <strong>Photo URL</strong>: {this.props.photo_url}
              </li>
              <li>
                <strong>Nationality</strong>: {this.props.nationality}
              </li>
            </ul>
              </div>
            </body>

        </html>
      );


return (
    <div>{artistResult}</div>
    );
module.exports = Queryid;*/