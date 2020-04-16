var React = require("react");

class Artists extends React.Component {
  render() {
      var artists = this.props.artists;
      artists = artists.map(element =>{ 
        return <li>
        <h2> {element.id}. {element.name}</h2>
        <br/>
        <img src={`${element.photo_url}`} className = "w-25"/>
        <br/>
        <h3> Nationality: {element.nationality}</h3>
        </li>
      })
    return (
      <html>
          <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>

        </head>
        <body>
          <h1>Artists</h1>
          <ul>
            {artists}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Artists;
