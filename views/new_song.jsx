var React = require('react');
var DefaultLayout = require('./layouts/default');
class NewPlaylistSong extends React.Component {

  render() {
        const songs = this.props.songsobj.map( (song, index) => {
            return (
                <option value={index+1}>{song.title}</option>
                )

        })
        return (

          <DefaultLayout pageTitle={this.props.pageTitle}>



                  { this.props.warning }
            <form method="POST" action={ this.props.action }>
            <br/><select name="song_id">
                 {songs}
                 </select>
            <input type="submit" value="Submit"/>
            </form>


          </DefaultLayout>
        )
    }
}

 






module.exports = NewPlaylistSong;