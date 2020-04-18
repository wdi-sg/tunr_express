var React = require('react');

class IndexPlaylist extends React.Component {
    render() {
       const playlistList = this.props.playlists.map(playlist => {

         return <li>{playlist.name}
         </li>
       });
         return (<html>
             <head/>
             <body>
                 <h1>Playlist Name:</h1>
                 <ol>{playlistList}</ol>
             </body>
         </html>);
     }
 }

module.exports = IndexPlaylist;