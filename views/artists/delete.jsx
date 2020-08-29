var React = require("react");

class Delete extends React.Component {
  render() {
    let {id, name, photo_url, nationality} = this.props[0];
    return (
      <html>
        <head />
        <body>
          <h2>Do you want to DELETE this artist?</h2>
          <div>
            <h2>{name}</h2>
            <img src={photo_url} alt="artist" width="250"/>
            <div>Nationality: {nationality}</div>
            <br/>
            <br/>
          </div>
          <div>
            <form method="POST" action={`/artists/${id}?_method=DELETE`}>
              <input type="submit" value="Delete"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
