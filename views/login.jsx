var React = require("react");
const Layout = require('./layout.jsx');

class Login extends React.Component {
    render() {

        return (
            <Layout>
                <div>
                    <form method="POST" action="/users/logincheck">
                        <h1>Login to your account</h1>
                        <p>Name: <input name="name" /></p>
                        <p>Password: <input type="password" name="password" /></p>
                        <input type="submit" value="submit" />
                    </form>
                </div>
          </Layout>
        );
    }
}

module.exports = Login;