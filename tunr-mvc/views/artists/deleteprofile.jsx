var React = require("react");

export default class Delete extends React.Component {
  render() {
    let {id,name} = this.props;

        return (
<form method="POST" action={`/artists/${id}?_method=delete`} >
    Name:  <input type="text" name="name" defaultValue={name}/> <br /> <br />
    <input type="submit" value="Delete" />
</form>
            );
  }
}

