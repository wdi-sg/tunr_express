var React = require('react');
var Layout = require('./layout');

class Loginform extends React.Component {
    render() {
        return (
            <Layout>
                <h1>User Login</h1>
                <form method="POST" action="/login">
                    <input name="username" placeholder="username"/>
                    <input name="password" placeholder="password"/>
                    <input type="submit" value="Login"/>
                </form>
            </Layout>
            );
    }
}

module.exports = Loginform;