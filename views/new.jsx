var React = require("react");
var Default = require("./default")

class New extends React.Component {
  render() {
    return (
      <Default>
        <form method="POST" action="/home/new">
          Name of Artist<br/>
          <input type="text" name="name"/><br/>
          Artist Photo<br/>
          <input type="text" name="photo"/><br/>
          Nationality<br/>
          <input type="text" name="nationality"/><br/>
          <input type="submit" value="submit"/>
        </form>
      </Default>
    );
  }
}

module.exports = New;
