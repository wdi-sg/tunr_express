var React = require('react');
class Artists extends React.Component {
  render() {
      const everyone = this.props.songs.map( anything =>{
          return <li>{anything.id}<br/>
                     {anything.title}
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

module.exports = Artists;