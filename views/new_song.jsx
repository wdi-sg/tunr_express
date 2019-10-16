var React = require('react');
var DefaultLayout = require('./layouts/default');
class NewPlaylistSong extends React.Component {

  render() {
console.log(this.props.songsobj)
        const songs = this.props.songsobj.map( (song, index) => {
            return (
                <option value={index+1}>{song.title}</option>
                )

        })
        return (

          <DefaultLayout pageTitle="Playlist Main Page">



                  { this.props.warning }

            <h1>Create a New Playlist</h1>
            <form method="POST" action={ this.props.action }>
            <br/><select>
                 {songs}
                 </select>
            <input type="submit" value="Submit"/>
            </form>


          </DefaultLayout>
        )
    }
}

 






module.exports = NewPlaylistSong;