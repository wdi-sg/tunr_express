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
             </body>
         </html>);
     }
 }

module.exports = IndexSong;