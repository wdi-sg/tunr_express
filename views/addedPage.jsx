var React = require('react');
var Layout = require('./components/layout.jsx');

class Added extends React.Component {
  render() {
    return(
        <Layout>
            <br/>
            <h1> {this.props.added.name} has been added! </h1>
            <br/>
        </Layout>
    )
  }
}

module.exports = Added;