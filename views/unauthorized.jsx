var React = require('react');
var Layout = require('./layout');

class Unauthorized extends React.Component {
    render() {
        return (
            <Layout>
                <h1>Unauthorized</h1>
                <p>Log in to access this page.</p>
                <a href="/login">Click here to login</a>
            </Layout>
            );
    }
}

module.exports = Unauthorized;