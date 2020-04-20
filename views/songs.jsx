var React = require("react");

class Songs extends React.Component {
  render() {
    // console.log('Songs.jsx')
    let cookiesVisits = parseInt(this.props.cookies.visits);
    if(isNaN(cookiesVisits)) {
        cookiesVisits = 1;
    };

    const songsNameList = this.props.songs.rows.map((song) => {
        return <li key={song.id}><a href={'/songs/'+song.id}>{song.title}</a></li>
    })

    return (
      <html>
        <head />
        <body>
            <a href="/">Back to Main</a>
            <br/>
            <h1>Songs</h1>
            <a href="/songs/new">Add New Song</a>
            <br/>
            <ol>{songsNameList}</ol>
            <br/>
            <div>
                <p>Visits: {cookiesVisits}</p>
            </div>
        </body>
      </html>
    );
  }
}
module.exports = Songs;