var React = require('react');
// let edititem = require('./edit');
// let deleteitem = require('./delete');
// let showitem = require('./show');

class displaySongsForArtist extends React.Component {
  render() {
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>
    let Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1) };
    let songsArray = this.props.song;
    const list = songsArray.map(song => {
        return (
        <div>
        <li> Title: <span style={{ color: "#51BEEE  ", fontWeight: "lighter"}}>{Capitalize(song.title)}</span></li>
        </div>
        )
    })
    return (
     <html>
        <head>
            <title>Songs</title>
        </head>
        <body>
          <div>
            <h1>Hey there, below are the <span style={{ color: "#9C919C", fontWeight: "lighter" }}>songs</span> of your chosen <span style={{ color: "#9C919C", fontWeight: "lighter" }}>artist</span>!</h1>
            <ol>
            {list}
            </ol>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = displaySongsForArtist;