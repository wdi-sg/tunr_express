const React = require('react');

class Create extends React.Component {
  render(){
    const list = this.props.rows.map(playlist  => {
     return (
       <div>
        <p>Id: {playlist.id}</p>
        <p>Name: {playlist.name}</p>
       </div>
     );
    })
    return(
      <html>
        <body>
          <h1>Create</h1>
          {list}
        </body>
      </html>
    )
  }
}

module.exports = Create;