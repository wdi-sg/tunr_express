var React = require("react");
var DefaultLayout = require('./layout/default');

class Edit extends React.Component {
  render() {
    let item = this.props.artists;
    let actionURL = "/artist/"+item.id+"?_method=PUT"
    return (
          <DefaultLayout>
          <h3>Edit artists!</h3>
          <form method="POST" action={actionURL}>
          <input type="name" name="name" value={item.name} placeholder="Name:"/>
          <input type="name" name="photo_url" value={item.photo_url} placeholder="Img URL:"/>
          <input type="name" name="nationality" value={item.nationality} placeholder="Nationality:"/>
          <input type="submit"/>
          </form>
          </DefaultLayout>

    );
  }
}

module.exports = Edit;