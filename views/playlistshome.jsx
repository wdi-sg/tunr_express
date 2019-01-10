var React = require("react");
var Defaultcss = require('./defaultcss');

class Artistlist extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    Playlists Title: {this.props.list.title} <br />
                    <form method="GET" action={"/playlists/playlist/" + this.props.list.title}>
                        <input type="submit" className="details" value="Show Details" />
                    </form>
                </ul>
            </div>
            );
    }
}

class Playlistshome extends React.Component {
  render() {
    const artists = this.props.list.map( artist => {
            return <Artistlist list={artist}></Artistlist>;
        });
    return (
        <Defaultcss>
            <form method="GET" action="/playlists/new">
                <input type="submit" className="new" value="Create New Playlist" />
            </form>
            {artists}
        </Defaultcss>
    );
  }
}

module.exports = Playlistshome;