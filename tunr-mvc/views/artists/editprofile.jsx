var React = require("react");

export default class Edit extends React.Component {
  render() {
    let {id,name,photo_url,nationality} = this.props;

        return (
<form method="POST" action={`/artists/${id}?_method=put`} >
    New Name:  <input type="text" name="name" defaultValue={name}/> <br /> <br />
    New Photo Url: <input type="text" name="photo_url" defaultValue={photo_url}/> <br /> <br />
    New Nationality:  <input type="text" name="nationality" defaultValue={nationality}/> <br /> <br />
    <input type="submit" value="Update" />
</form>
            );
  }
}

