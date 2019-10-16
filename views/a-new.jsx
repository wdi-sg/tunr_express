const React = require('react');

class New extends React.Component {
  render(){

    return(
      <html>
        <body>
          <h1>New</h1>
          <form action="/artists" method="POST">
            <p>Name</p>
            <input type="text" name="name"/><br/><br/>
            <p>Photo URL</p>
            <input type="text" name="photo_url"/><br/><br/>
            <p>Nationality</p>
            <input type="text" name="nationality"/><br/><br/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = New;