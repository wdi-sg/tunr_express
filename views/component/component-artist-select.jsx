var React = require("react");

class Artistselect extends React.Component {
  render() {

    return (
      <select>
        <option>{this.props.name}</option>
      </select>
    );
  }
}

module.exports = Artistselect;
