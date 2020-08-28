var React = require("react");

export default class New extends React.Component {
  render() {
        return (
<form method="POST" action="/artists" >
    Name:  <input type="text" name="name" /> <br /> <br />
    Photo Url: <input type="text" name="photo_url" /> <br /> <br />
    Nationality:  <input type="text" name="nationality" /> <br /> <br />
    <input type="submit" value="Submit" />
</form>
            );
  }
}

