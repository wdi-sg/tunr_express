var React = require("react");
var DefaultLayout = require('./layouts/default');

class ArtistsSongs extends React.Component {
   render() {

        let style = {
            display: "inline-block",
            margin: "2rem",
            "text-align": "center"
        }
        let style2 = {
            "text-decoration": "none"
        }
        const allSongs = this.props.songsobj.map( (songs, index) => {
            return (
                <li style={style}><a style={style2} href={"/song/"+songs.song_id} className="list-group-item list-group-item-action list-group-item-primary">{songs.title}</a>
                <br/>
                    <a href={"/song/"+songs.song_id+"/edit"} className="btn btn-sm btn-outline-info m-1">Edit</a>
                    <a href={"/song/"+songs.song_id+"/delete"} className="btn btn-sm btn-outline-danger m-1">Delete</a>
                </li>
                )

        })
        return (

          <DefaultLayout pageTitle={this.props.pageTitle}>



                  { this.props.warning }
                        <ul>
                        {allSongs}
                        </ul>


          </DefaultLayout>
        )
    }
}


module.exports = ArtistsSongs;
