var React = require('react');

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
        </body>
      </html>
      <div>
        <form action="/artists" method="post" id="artist">
          <div>
            <label htmlFor="name">Artist name: </label>
            <input type="text" name="name"/>
          </div>
          <div>
            <label htmlFor="img">Photo url: </label>
            <input type="text" name="photo_url"/>
          </div>
          <div>
            <label htmlFor="nationality">Nationality: </label>
            <input type="text" name="nationality"/>
          </div>
        </form>
        <button type="submit" form="artist" value="submit">
            Add
        </button>
      </div>
    );
  }
}