var React = require("react");

 class AddToPlaylist extends React.Component {
   render() {
     const name = this.props.playlistInfo.name;
     const addSongLink = "/playlist/" + this.props.playlistInfo.id;
     const songOptionElements = this.props.songInfoArray.map(song => {
         return <option value={song.songid}>Song: {song.songtitle} </option>
     })

     return (
       <html>
         <body>

             <form method="POST" action={addSongLink}>

                     <select  name="songid">
                         {songOptionElements}
                     </select>

               <button type="submit" value="Submit" className="btn btn-primary">Add</button>
             </form>
             <p>Number of visits:</p>
            <p>{this.props.badge}</p>
         </body>
       </html>
     );
   }
 }

 module.exports = AddToPlaylist;