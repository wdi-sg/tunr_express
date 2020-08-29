var React = require("react");

export default class Delete extends React.Component {
  render() {
    let {id,title} = this.props;

        return (
<form method="POST" action={`/songs/${id}?_method=delete`} >
    Name:  <input type="text" name="title" defaultValue={title}/> <br /> <br />
    <input type="submit" value="Delete" />
</form>
            );
  }
}

