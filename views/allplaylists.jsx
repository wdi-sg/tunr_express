var React = require('react');
class AllPlaylists extends React.Component {
  render() {
      const everyone = this.props.playlists.map( anything =>{
          return <li>{anything.id}<br/>
                     {anything.name}
                     </li>
      });
    return (
      <html>
        <body>
          <div>
            <ul>
               {everyone} 
            </ul>
           
          </div>
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylists;