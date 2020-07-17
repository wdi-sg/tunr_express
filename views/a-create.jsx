const React = require('react');

class Create extends React.Component {
  render(){
    const list = this.props.rows.map(artist  => {
     return (
       <div>
        <p>Id: {artist.id}</p>
        <p>Name: {artist.name}</p>
        <p>Photo URL: {artist.photo_url}</p>
        <p>Nationality: {artist.nationality}</p>
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