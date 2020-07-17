var React = require("react");
var DefaultLayout = require('./layout/default');

class New extends React.Component {
  render() {
    return (
          <DefaultLayout>
          <h3>Add new artists!</h3>
          <form method="POST" action="/artist">
          <input type="name" name="name" placeholder="Name:"/>
          <input type="name" name="photo_url"placeholder="Img URL:"/>
          <input type="name" name="nationality"placeholder="Nationality:"/>
          <input type="submit"/>
          </form>
          </DefaultLayout>

    );
  }
}

module.exports = New;