var React = require('react');
var DefaultLayout = require('./layouts/default');

class Unauthorized extends React.Component {
  render() {
    return (
        <DefaultLayout title="Add New Artist">
                <h1>Unauthorized</h1>
                <a href="/login">Click here to login</a>
        </DefaultLayout>
    );
  }
}

module.exports = Unauthorized;