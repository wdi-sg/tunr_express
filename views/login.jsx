var React = require('react');
var Layout = require('./layout');

class Login extends React.Component {
    render() {
        return (
                <Layout title = "Login">
                    <form method = "POST" action = "/login">
                        <input type = "text" name = "name" placeholder = "name" />
                        <input type = "password" name = "password" placeholder = "password" />
                        <input type = "submit"/>
                    </form>
                </Layout>
                );
    }
}
module.exports = Login;
