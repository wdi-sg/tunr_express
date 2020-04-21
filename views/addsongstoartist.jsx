var React = require("react");
class AddSongToArtist extends React.Component {
   render() {
     const artist = this.props.artist;
     return (
       <html>
       <head />
         <body>
           <h3>Add Song to {artist.name}</h3>
           <form method='POST' action={`/artists/${artist.id}/songs`}>
             <h4>Title</h4>
             <input type='text' name='title'/>
             <h4>Album Name</h4>
             <input type='text' name='album'/>
             <h4>Preview Link</h4>
             <input type='text' name='preview_link'/>
             <h4>Artwork</h4>
             <input type='text' name='artwork'/>
             <input type='hidden' name='artist_id' value={artist.id}/>
             <br/><br/>
             <input type='submit' value='Submit'/>
           </form>
           <p>Number of visits:</p>
            <p>{this.props.badge}</p>
         </body>
       </html>
       );
   }
 }
 module.exports = AddSongToArtist;