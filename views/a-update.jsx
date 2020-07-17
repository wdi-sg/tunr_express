const React = require('react');

class Show extends React.Component {
  render(){
    return(
      <html>
        <body>
          <h1>Updated: {this.props.rows.name}</h1>
          <p>Id: {this.props.id}</p>
          <p>Name: {this.props.rows.name}</p>
          <p>Photo URL: {this.props.rows.photo_url}</p>
          <p>Nationality: {this.props.rows.nationality}</p><br/><br/>
          <form action={`/artists/${this.props.id}?_method=delete`} method="POST">
            <p>delete this artist by pressing the delete button</p>
            <input type="submit" defaultValue="Delete"/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = Show