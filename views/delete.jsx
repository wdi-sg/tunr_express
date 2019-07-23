var React = require('react');

class Delete extends React.Component {
  render() {
    var url = "/artist/"+this.props.artists.id + "?_method=DELETE";
    return (
      <html>
        <body>
            <p><a href={"/artist/"+this.props.artists.id}>CLICK ON ME</a></p>
            <div>
                <h1>Delete an Artist</h1>
                <h3>Artist No. {this.props.artists.id} ; {this.props.artists.name}</h3>
                <form action={url} method="POST">
                    <input className="submit-input-btn" type="submit" value="Delete"/>
                </form>
              </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;