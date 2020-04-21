var React = require("react");

 class artistSongs extends React.Component {
   render() {
     const listSongs = this.props.songs.map((song)=>{
         return <li>{song.title}</li>;
     });
     return (
       <html>
         <head />
         <body>
         <h1>List Of Songs</h1>
         <ul>
         {listSongs}
         </ul>
         <p>Number of visits:</p>
                    <p>{this.props.badge}</p>
         </body>
       </html>
     );
   }
 }

 module.exports = artistSongs;