var React = require('react');
var Layout = require('./layout');

class Registerform extends React.Component {
    render() {
        return (
            <Layout>
                <h1>Register New User</h1>
                <form method="POST" action="/register">
                    <input name="username" placeholder="username"/>
                    <input name="password" placeholder="password"/>
                    <input type="submit" value="Register"/>
                </form>
            </Layout>
            );
    }
}

module.exports = Registerform;