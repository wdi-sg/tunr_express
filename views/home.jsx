var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
  render() {
    return (
        <DefaultLayout title={this.props.message}>
            <h1>{this.props.message}</h1>
        </DefaultLayout>
    );
  }
}

module.exports = Home;
