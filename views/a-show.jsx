const React = require('react');

class Show extends React.Component {
  render(){
    const list = this.props.rows.map(artist  => {
     return (
       <div>
        <p>Id: {artist.id}</p>
        <p>Name: {artist.name}</p>
        <p>photo URL: {artist.photo_url}</p>
        <p>Nationality: {artist.nationality}</p>
       </div>
     );
    })
    return(
      <html>
        <body>
          <h1>Show</h1>
          {list}<br/><br/>
          <form action={`/artists/${this.props.id}?_method=delete`} method="POST">
            <p>Delete this artist by pressing the delete button</p>
            <input type="submit" defaultValue="Delete"/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = Show