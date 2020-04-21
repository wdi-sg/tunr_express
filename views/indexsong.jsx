var React = require('react');

class IndexSong extends React.Component {
    render() {
       const songList = this.props.songs.map(song => {

         return <li>{song.title}
         </li>
       });
         return (<html>
             <head/>
             <body>
                 <h1>Song Title:</h1>
                 <ol>{songList}</ol>
                 <p>Number of visits:</p>
                 <p>{this.props.badge}</p>
             </body>
         </html>);
     }
 }

module.exports = IndexSong;