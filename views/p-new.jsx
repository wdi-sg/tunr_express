const React = require('react');

class New extends React.Component {
  render(){

    return(
      <html>
        <body>
          <h1>New Playlist</h1>
          <form action="/playlist" method="POST">
            <p>Name</p>
            <input type="text" name="name"/><br/><br/>
            <input type="submit" value="create"/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = New;