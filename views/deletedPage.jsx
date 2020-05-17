var React = require('react');
var Layout = require('./components/layout.jsx');

class Deleted extends React.Component {
  render() {
    return(
        <Layout>
            <br/>
            <h1> {this.props.deleted.name} has been deleted! </h1>
            <br/>
        </Layout>
    )
  }
}

module.exports = Deleted;