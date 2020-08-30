var React = require("react");

class Update extends React.Component {
  render() {
    let {id, name, photo_url, nationality} = this.props[0];
    return (
      <html>
        <head />
        <body>
          <h2>Edit this artist</h2>
          <div>
            <h2>{name}</h2>
            <img src={photo_url} alt="artist" width="250"/>
            <div>Nationality: {nationality}</div>
            <br/>
            <br/>
          </div>
          <div>
            <form method="POST" action={`/artists/${id}?_method=PUT`}>
              Name: <input type="text" name="name" id="name"/>
              <br/>
              Photo Url: <input type="text" name="photo_url" id="photo"/>
              <br/>
              Nationality: <input type="text" name="nationality" id="nationality"/>
              <br/>
              <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Update;
