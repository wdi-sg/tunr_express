var React = require("react");

class New extends React.Component {
  render() {
    return (
      <div>
        <form action="/artists" method="post" id="artist">
          <div>
            <label htmlFor="name">Artist name: </label>
            <input type="text" name="name"/>
          </div>
          <div>
            <label htmlFor="photo_url">Photo url: </label>
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

module.exports = New;
