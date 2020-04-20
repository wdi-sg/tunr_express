var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create new Artist</h3>
            <form action="/artists" method="POST">
                <p>
                    Name<input name="name" type ="text"/>
                </p>
                <p>
                    Photo-url<input name="photo_url" type ="text"/>
                </p>
                <p>
                    Nationality<input name="nationality" type ="text"/>
                </p>
                <button type = "submit">Submit</button>
            </form>
            <p>Number of visits:</p>
                 <p>{this.props.badge}</p>
        </body>
      </html>
    );
  }
}

module.exports = New;