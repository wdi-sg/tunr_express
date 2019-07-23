var React = require('react');
var Layout = require('./components/layout.jsx');

class Updated extends React.Component {
  render() {
    return(
        <Layout>
            <br/>
            <h1> {this.props.updated.name} has been updated! </h1>
            <br/>
        </Layout>
    )
  }
}

module.exports = Updated;