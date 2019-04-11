var React = require('react');
var Layout = require('./layout');

class Registerform extends React.Component {
    render() {
        return (
            <Layout>
                <h1>LOGIN</h1>
                <form method="POST" action="/login">
                    <input name="name" placeholder="name"/>
                    <input name="password" placeholder="password"/>
                    <input type="submit" value="Register"/>
                </form>
            </Layout>
            );
    }
}

module.exports = Registerform;