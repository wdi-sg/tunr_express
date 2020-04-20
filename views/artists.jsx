var React = require("react");

class Artists extends React.Component {
  render() {
    // console.log('artists.jsx')

    let cookiesVisits = parseInt(this.props.cookies.visits);
    if(isNaN(cookiesVisits)) {
        cookiesVisits = 1;
    };

    const artistsNameList = this.props.artists.rows.map((artist) => {
        return <li key={artist.id}><a href={'/artists/'+artist.id}>{artist.name}</a></li>
    })

    return (
      <html>
        <head />
        <body>
            <a href="/">Back to Main</a>
            <h1>Artists</h1>
            <a href="/artists/new">Add New Artist</a>
            <br/>
            <ol>{artistsNameList}</ol>
            <br/>
            <div>
                <p>Visits: {cookiesVisits}</p>
            </div>
        </body>
      </html>
    );
  }
}
module.exports = Artists;