var React = require('react');

class IndexFav extends React.Component {
    render() {
       const songList = this.props.songs.map(song => {

         return <option value={songs.id}>{songs.title}</option>
       });
         return (<html>
             <head/>
             <body>
                 <h1>Songs:</h1>
                 <ul>{songList}</ul>
                 <p>Number of visits:</p>
                 <p>{this.props.badge}</p>
             </body>
         </html>);
     }
 }

module.exports = IndexFav;