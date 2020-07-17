var React = require("react");
const Template = require('./template.jsx');

class Home extends React.Component {
  render() {
    return (
      <Template>
          <h1>This is Home</h1>
      </Template>
    );
  }
}

module.exports = Home;
