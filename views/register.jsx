var React = require('react');
const DefaultLayout = require("./default");

class Home extends React.Component {
    render(){
        return (
            <DefaultLayout title="Register">
                <h1>Register an Account with us now!</h1>
                <form method="POST" action="/register">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name = "username" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="text" name = "password" class="form-control" />
                </div>
                    <button class="btn btn-primary">Register</button>
                </form>
            </DefaultLayout>
        );
    }
}

module.exports = Home;