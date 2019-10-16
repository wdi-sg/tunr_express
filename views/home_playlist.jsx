var React = require("react");
var DefaultLayout = require('./layouts/default');

class HomePlaylist extends React.Component {
   render() {

        let style = {
            display: "inline-block",
            margin: "2rem",
            "text-align": "center"
        }
        let style2 = {
            "text-decoration": "none"
        }
        const allPlaylists = this.props.playlistsobj.map( (playlist, index) => {
            return (
                <li style={style}><a style={style2} href={"/playlist/"+(index+1)} className="list-group-item list-group-item-action list-group-item-primary">{playlist.name}</a>
                <br/>
                    <a href={"/playlist/"+(index+1)+"/edit"} className="btn btn-sm btn-outline-info m-1">Edit</a>
                    <a href={"/playlist/"+(index+1)+"/delete"} className="btn btn-sm btn-outline-danger m-1">Delete</a>
                </li>
                )

        })
        return (

          <DefaultLayout pageTitle={this.props.pageTitle}>



                  { this.props.warning }
                        <ul>
                        {allPlaylists}
                        </ul>


          </DefaultLayout>
        )
    }
}


module.exports = HomePlaylist;
