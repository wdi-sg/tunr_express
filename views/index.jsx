var React = require('react');

class Index extends React.Component {
  render() {
    console.log("this.props---");
    console.log( this.props.artists )

    const artistName = this.props.artists.map(artist=>
    {
        const link = '/artists/'
        return <li>{artist.name}<br/><br/></li>
    })



    return (
      <html>
        <body>
          <div>
            <ul>{artistName}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;